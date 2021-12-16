import { AccountCircle, Paid, School, Bookmark } from "@mui/icons-material";
import {
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItemButton,
  ListItemText,
  Box,
  CircularProgress,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDayjs";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { useState, useContext } from "react";
import Title from "./Title";
import { useMutation, useQuery } from "@apollo/client";
import { GET_TUTOR_DAY_HOURS } from "../../graphql/queries";
import { CREATE_APPOINTMENT, UPDATE_HOURS } from "../../graphql/mutations";
import { AuthContext } from "../../Auth";
import dayjs from "dayjs";
var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

export default function OfferingTile({ offering }) {
  const { currentUser } = useContext(AuthContext);
  const [showDialog, setShowDialog] = useState(false);
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");
  const [selectedHours, setSelectedHours] = useState(new Set());
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const dayStartUtc = selectedDate.startOf("day").utc();

  const { data, loading, error } = useQuery(GET_TUTOR_DAY_HOURS, {
    fetchPolicy: "network-only",
    variables: {
      tutor_id: offering.tutor.tutor_id,
      day_start: dayStartUtc.format(),
      day_end: dayStartUtc.add(1, "day").format(),
    },
    skip: !showDialog,
  });

  const [updateHours, hoursMutation] = useMutation(UPDATE_HOURS, {
    onCompleted: () => onClose(),
  });

  const [insertAppointment, appointmentMutation] = useMutation(
    CREATE_APPOINTMENT,
    {
      variables: {
        location: location,
        student_id: currentUser.uid,
        offering_id: offering.offering_id,
        student_comment: note,
      },
      onCompleted: (result) => {
        let hours = [];
        selectedHours.forEach((value) => {
          hours.push({ start_time: { _eq: value } });
        });
        updateHours({
          variables: {
            appointment_id: result.insert_appointment_one.appointment_id,
            where: {
              _and: [
                { _or: hours },
                { tutor_id: { _eq: offering.tutor.tutor_id } },
              ],
            },
          },
        });
      },
    }
  );

  const toggleHour = (hour, selected) => {
    let updatedHours = new Set(selectedHours);
    if (selected) {
      updatedHours.delete(hour);
    } else {
      const date = dayjs.utc(hour);
      console.log("set rn ", selectedHours);
      const prevHour = date.subtract(1, "hour").format("YYYY-MM-DDTHH:mm:ss");
      console.log(prevHour);
      const nextHour = date.add(1, "hour").format("YYYY-MM-DDTHH:mm:ss");
      console.log(nextHour);
      // only allow multiple selection if it is contiguous
      if (
        selectedHours.size === 0 ||
        selectedHours.has(prevHour) ||
        selectedHours.has(nextHour)
      ) {
        updatedHours.add(hour);
      }
    }
    setSelectedHours(updatedHours);
  };

  const onClose = () => {
    setShowDialog(false);
    setSelectedDate(dayjs());
    setSelectedHours(new Set());
    setLocation("");
    setNote("");
  };

  return (
    <>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Title>{`${offering.course.course_id} ${offering.course.name}`}</Title>
        <Stack
          direction="row"
          spacing={2}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <AccountCircle fontSize="small" />
                <Typography variant="h6">{offering.tutor.user.name}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Paid fontSize="small" />
                <Typography variant="h6">
                  {`$${offering.tutor.hourly_rate}/hr`}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="body1">{offering.tutor.bio}</Typography>
              </Stack>
            </Grid>
          </Grid>
          {offering.grade_received ? (
            <Stack alignItems="center" justifyContent="center" minWidth={60}>
              <School />
              <Typography variant="h5">{offering.grade_received}</Typography>
              <Typography variant="caption" noWrap>
                {offering.year_taken}
              </Typography>
              <Typography variant="caption" noWrap>
                {offering.professor_name}
              </Typography>
            </Stack>
          ) : null}
        </Stack>
        <Stack mt={2} direction="row">
          <Button
            variant="contained"
            startIcon={<Bookmark />}
            onClick={() => setShowDialog(true)}
          >
            Book This Tutor
          </Button>
        </Stack>
      </Paper>
      <Dialog open={showDialog} onClose={onClose} scroll={"body"}>
        <DialogTitle>
          Book an appointment with {offering.tutor.user.name} for{" "}
          {offering.course.course_id}
        </DialogTitle>
        <DialogContent>
          <Typography mb={1}>Select a day to view availability</Typography>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <DatePicker
              clearable
              value={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
              }}
              renderInput={(params) => (
                <TextField {...params} fullWidth helperText={null} />
              )}
            />
          </LocalizationProvider>
          {loading && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100%"
              mt={2}
            >
              <CircularProgress />
            </Box>
          )}
          {data?.hours?.length === 0 && (
            <Typography mt={2}>
              {offering.tutor.user.name} has no availability on this day
            </Typography>
          )}
          {data?.hours?.length > 0 && (
            <>
              <Typography mt={2}>Select one or more adjacent slots</Typography>
              <List>
                {data.hours.map((hour, i) => {
                  console.log(selectedHours);
                  const selected = selectedHours.has(hour.start_time);
                  console.log(selected);
                  return (
                    <ListItemButton
                      selected={selected}
                      key={i}
                      onClick={() => toggleHour(hour.start_time, selected)}
                    >
                      <ListItemText
                        primary={dayjs
                          .utc(hour.start_time)
                          .local()
                          .format("h:mma")}
                      />
                    </ListItemButton>
                  );
                })}
              </List>
            </>
          )}
          {data?.hours?.length > 0 && (
            <>
              <Typography mb={2}>Where would you like to meet?</Typography>
              <TextField
                fullWidth
                name="location"
                label="Location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
              />
              <Typography mb={2} mt={2}>
                Anything you'd like {offering.tutor.user.name} to know?
              </Typography>
              <TextField
                fullWidth
                name="note"
                label="Note"
                value={note}
                onChange={(event) => setNote(event.target.value)}
              />
            </>
          )}
        </DialogContent>
        {selectedHours.size > 0 && location && (
          <DialogActions>
            <LoadingButton
              loading={appointmentMutation.loading || hoursMutation.loading}
              onClick={() => insertAppointment()}
            >
              {" "}
              Confirm{" "}
            </LoadingButton>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
}
