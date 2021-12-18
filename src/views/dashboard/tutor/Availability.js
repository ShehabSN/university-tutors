import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useState, useContext, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_TUTOR_HOURS } from "../../../graphql/queries";
import { CREATE_HOUR, DELETE_HOUR } from "../../../graphql/mutations";
import { AuthContext } from "../../../Auth";
import LoadingPage from "../../LoadingPage";
import dayjs from "dayjs";
var utc = require("dayjs/plugin/utc");
var dayOfYear = require("dayjs/plugin/dayOfYear");
dayjs.extend(utc);
dayjs.extend(dayOfYear);

export default function Availability() {
  const { currentUser } = useContext(AuthContext);
  const [selectedDay, setSelectedDay] = useState(dayjs());
  const [weekHours, setWeekHours] = useState({});
  const sunday = selectedDay.startOf("week");
  const saturday = selectedDay.endOf("week");
  let currentWeek = [sunday];

  for (let i = 1; i < 7; i++) {
    const prevDay = currentWeek[i - 1];
    currentWeek.push(prevDay.add(1, "day"));
  }
  console.log(currentWeek);

  const days = ["SUN", "MON", "TUES", "WED", "THU", "FRI", "SAT"];

  const slots = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

  const { loading, data, error } = useQuery(GET_TUTOR_HOURS, {
    variables: {
      where: {
        tutor_id: { _eq: currentUser.uid },
        start_time: { _gte: sunday, _lte: saturday },
      },
    },
  });

  const [deleteHour, deleteResult] = useMutation(DELETE_HOUR, {
    refetchQueries: [GET_TUTOR_HOURS],
  });

  const [createHour, createResult] = useMutation(CREATE_HOUR, {
    refetchQueries: [GET_TUTOR_HOURS],
  });

  useEffect(() => {
    if (data?.hours) {
      let hours = {};
      data.hours.forEach((hour) => {
        const localHour = dayjs.utc(hour.start_time).local().format();
        hours[localHour] = {
          id: hour.hours_id,
          appointmentId: hour.appointment_id,
        };
      });
      setWeekHours(hours);
    }
  }, [data?.hours]);

  const handleSlotSelect = (availability, dateTime) => {
    const isAvailable = availability && true;
    const isBooked = availability?.appointmentId;
    console.log(availability);
    console.log(isBooked);
    if (isAvailable && !isBooked) {
      deleteHour({
        variables: {
          hours_id: availability.id,
        },
      });
    } else if (!isAvailable) {
      createHour({
        variables: {
          tutor_id: currentUser.uid,
          start_time: dateTime,
        },
      });
    }
  };

  return (
    <Grid container mt={3} spacing={3} justifyContent="center">
      {/* <Grid item xs={12} display="flex" justifyContent="center">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            views={["year", "month"]}
            label="Year and Month"
            minDate={new Date("2021-01-25")}
            maxDate={new Date("2032-06-01")}
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(par:am}) => (
              <TextField {...par:am}} helperText={null} />
            )}
          />
        </LocalizationProvider>
      </Grid> */}
      <Grid item xs={12} md={8}>
        {loading ? (
          <LoadingPage />
        ) : (
          <Grid container justifyContent={"center"} columns={9}>
            <Grid
              item
              container
              direction="column"
              justifyContent="flex-start"
              xs={1}
              mt={3}
            >
              <IconButton
                onClick={() => {
                  setSelectedDay(selectedDay.subtract(7, "day"));
                }}
              >
                <ArrowBackIosNewOutlinedIcon size={"small"} />
              </IconButton>
            </Grid>
            {currentWeek.map((day, i) => {
              return (
                <Grid
                  key={i}
                  container
                  item
                  xs={1}
                  direction="column"
                  justifyContent={"center"}
                  alignItems={"center"}
                  rowSpacing={1}
                >
                  <Grid item>
                    <Typography
                      color={
                        day.dayOfYear() === dayjs().dayOfYear() && "primary"
                      }
                      variant={"h6"}
                    >
                      {days[day.day()]}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      color={
                        day.dayOfYear() === dayjs().dayOfYear() && "primary"
                      }
                      variant={"h6"}
                    >
                      {day.date()}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <List>
                      {slots.map((slot, j) => {
                        const dateTime = day.add(slot, "hour");
                        const availability = weekHours[dateTime.format()];
                        return (
                          <ListItem
                            key={j}
                            sx={{
                              marginBottom: "10px",
                            }}
                            selected={availability && true}
                            button
                            onClick={() =>
                              handleSlotSelect(availability, dateTime)
                            }
                          >
                            <ListItemText primary={dateTime.format("ha")} />
                          </ListItem>
                        );
                      })}
                    </List>
                  </Grid>
                </Grid>
              );
            })}
            <Grid
              item
              container
              direction="column"
              justifyContent="flex-start"
              xs={1}
              mt={3}
            >
              <IconButton
                onClick={() => {
                  setSelectedDay(selectedDay.add(7, "day"));
                }}
              >
                <ArrowForwardIosOutlinedIcon size={"small"} />
              </IconButton>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
