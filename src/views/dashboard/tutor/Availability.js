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
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useState } from "react";

export default function Availability() {
  const [value, setValue] = useState(new Date());

  const weekdaySlots = [
    { time: "7am", availabile: false },
    { time: "8am", availabile: false },
    { time: "9am", availabile: false },
    { time: "10am", availabile: false },
    { time: "11am", availabile: false },
    { time: "12pm", availabile: true },
    { time: "1pm", availabile: true },
    { time: "2pm", availabile: true },
    { time: "3pm", availabile: true },
    { time: "4pm", availabile: true },
    { time: "5pm", availabile: true },
    { time: "6pm", availabile: false },
    { time: "7pm", availabile: false },
    { time: "8pm", availabile: false },
    { time: "9pm", availabile: false },
    { time: "10pm", availabile: false },
  ];
  const weekendSlots = [
    { time: "7am", availabile: false },
    { time: "8am", availabile: false },
    { time: "9am", availabile: true },
    { time: "10am", availabile: true },
    { time: "11am", availabile: true },
    { time: "12pm", availabile: true },
    { time: "1pm", availabile: false },
    { time: "2pm", availabile: false },
    { time: "3pm", availabile: false },
    { time: "4pm", availabile: false },
    { time: "5pm", availabile: true },
    { time: "6pm", availabile: true },
    { time: "7pm", availabile: true },
    { time: "8pm", availabile: true },
    { time: "9pm", availabile: false },
    { time: "10pm", availabile: false },
  ];

  const days = [
    { name: "MON", number: 22, slots: weekdaySlots },
    { name: "TUES", number: 23, slots: weekdaySlots },
    { name: "WED", number: 24, slots: weekdaySlots },
    { name: "THU", number: 25, slots: weekdaySlots },
    { name: "FRI", number: 26, slots: weekdaySlots },
    { name: "SAT", number: 27, slots: weekendSlots },
    { name: "SUN", number: 28, slots: weekendSlots },
  ];

  return (
    <Grid container mt={6} columns={10}>
      <Grid item xs={1.5} />
      <Grid
        container
        item
        xs={7}
        justifyContent={"center"}
        alignItems={"center"}
        rowSpacing={3}
      >
        <Grid item xs={12} ml={15}>
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
              renderInput={(params) => (
                <TextField {...params} helperText={null} />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent={"center"}>
            <Grid item container justifyContent="center" xs={1} mt={3}>
              <ArrowBackIosNewOutlinedIcon size={"small"} />
            </Grid>
            {days.map((day, i) => {
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
                      color={day.name === "THU" && "primary"}
                      variant={"h6"}
                    >
                      {day.name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      color={day.name === "THU" && "primary"}
                      variant={"h6"}
                    >
                      {day.number}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <List>
                      {day.slots.map((slot, j) => {
                        return (
                          <ListItem
                            key={j}
                            sx={{
                              marginBottom: "10px",
                            }}
                            selected={slot.availabile}
                            button
                            onClick={() => {}}
                          >
                            <ListItemText primary={slot.time} />
                          </ListItem>
                        );
                      })}
                    </List>
                  </Grid>
                </Grid>
              );
            })}
            <Grid item container justifyContent="center" xs={1} mt={3}>
              <ArrowForwardIosOutlinedIcon size={"small"} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1.5} />
    </Grid>
  );
}
