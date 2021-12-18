import { useMutation, useQuery } from "@apollo/client";
import { LoadingButton } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDayjs";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Auth";
import {
  CREATE_APPOINTMENT,
  UPDATE_HOURS,
  UPDATE_APPOINTMENT,
} from "../../../graphql/mutations";
import { GET_TUTOR_HOURS } from "../../../graphql/queries";
var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

export default function AppointmentDialog({
  offering,
  appointment,
  handleClose,
  isEdit = false,
}) {
  const { currentUser } = useContext(AuthContext);
  const [location, setLocation] = useState(appointment?.location);
  const [note, setNote] = useState(appointment?.student_comment);
  const [selectedHours, setSelectedHours] = useState(new Set());
  const initDate = appointment?.hours_aggregate.aggregate.min.start_time;
  const [selectedDate, setSelectedDate] = useState(
    dayjs.utc(initDate).local() ?? dayjs()
  );
  const dayStartUtc = selectedDate.startOf("day").utc();

  let orClause = [{ appointment_id: { _is_null: true } }];
  if (appointment?.appointment_id)
    orClause.push({
      appointment_id: { _eq: appointment.appointment_id },
    });
  const { data, loading } = useQuery(GET_TUTOR_HOURS, {
    fetchPolicy: "network-only",
    variables: {
      where: {
        _or: orClause,
        tutor_id: { _eq: offering.tutor.tutor_id },
        start_time: {
          _gte: dayStartUtc.format(),
          _lt: dayStartUtc.add(1, "day").format(),
        },
      },
    },
    onCompleted: (result) => {
      if (appointment?.appointment_id) {
        let initHours = new Set();
        result.hours.forEach((hour) => {
          if (hour.appointment_id === appointment.appointment_id) {
            initHours.add(hour.start_time);
          }
        });
        setSelectedHours(initHours);
      }
    },
  });

  const [updateHours, hoursMutation] = useMutation(UPDATE_HOURS, {
    onCompleted: () => onClose(),
    refetchQueries: ["GetStudentAppointments"],
  });

  const updateApptTime = (appointmentId) => {
    let hours = [];
    selectedHours.forEach((value) => {
      hours.push({ start_time: { _eq: value } });
    });
    updateHours({
      variables: {
        appointment_id: appointmentId,
        where: {
          _and: [
            { _or: hours },
            { tutor_id: { _eq: offering.tutor.tutor_id } },
          ],
        },
      },
    });
  };

  const [insertAppointment, insertData] = useMutation(CREATE_APPOINTMENT, {
    variables: {
      location: location,
      student_id: currentUser.uid,
      offering_id: offering.offering_id,
      student_comment: note,
    },
  });

  const [updateAppointment, updateData] = useMutation(UPDATE_APPOINTMENT, {
    variables: {
      location: location,
      appointment_id: appointment?.appointment_id,
      student_comment: note,
    },
  });

  const toggleHour = (hour, selected) => {
    let updatedHours = new Set(selectedHours);
    if (selected) {
      updatedHours.delete(hour);
    } else {
      const date = dayjs.utc(hour);
      const prevHour = date.subtract(1, "hour").format("YYYY-MM-DDTHH:mm:ss");
      const nextHour = date.add(1, "hour").format("YYYY-MM-DDTHH:mm:ss");

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
    handleClose();
    setSelectedHours(new Set());
    if (!isEdit) {
      setSelectedDate(dayjs());
      setLocation("");
      setNote("");
    }
  };

  const handleSubmit = () => {
    if (isEdit) {
      updateAppointment({
        onCompleted: (result) => {
          updateApptTime(result.update_appointment_by_pk.appointment_id);
        },
      });
    } else {
      insertAppointment({
        onCompleted: (result) =>
          updateApptTime(result.insert_appointment_one.appointment_id),
      });
    }
  };

  return (
    <Dialog open onClose={onClose} scroll={"body"}>
      <DialogTitle>
        {isEdit ? "Edit your " : "Book an "} appointment with{" "}
        {offering.tutor.user.name} for{" "}
        {offering.course_id ?? offering.course.course_id}
      </DialogTitle>
      <DialogContent sx={{ marginBottom: 5 }}>
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
          <Typography mt={2} mb={isEdit && 2}>
            {offering.tutor.user.name} has no {isEdit && "other"} availability
            on this day
          </Typography>
        )}
        {data?.hours?.length > 0 && (
          <>
            <Typography mt={2}>Select one or more adjacent slots</Typography>
            <List>
              {data.hours.map((hour, i) => {
                const selected = selectedHours.has(hour.start_time);
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
        {(data?.hours?.length > 0 || isEdit) && (
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
            loading={
              insertData.loading || hoursMutation.loading || updateData.loading
            }
            onClick={handleSubmit}
          >
            {" "}
            Confirm{" "}
          </LoadingButton>
        </DialogActions>
      )}
    </Dialog>
  );
}
