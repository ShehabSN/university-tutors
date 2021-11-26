import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Fragment } from "react";
import AppointmentCard from "./AppointmentCard";

export default function Appointments() {
  const days = [
    {
      date: "Today",
      appointments: [
        {
          studentName: "Adrian Chen",
          course: "CPSC 471",
          time: "2:00pm to 4:00pm",
          location: "Mathematical Sciences 235",
          hasNote: true,
        },
        {
          studentName: "Jaydin Lee",
          course: "CPSC 351",
          time: "12:00am to 1:00pm",
          location: "Scurfield Hall",
          hasNote: true,
        },
        {
          studentName: "Shahab Salem",
          course: "MATH 271",
          time: "10:00am to 11:00am",
          location: "Mathematical Sciences 162",
        },
        {
          studentName: "Jacob Samuels",
          course: "HTST 301",
          time: "5:00pm to 6:00pm",
          location: "Science Theatres 205",
          hasNote: true,
        },
        {
          studentName: "Rebecca Lemont",
          course: "ENGL 406 ",
          time: "8:00am to 10:00am",
          location: "ENG A 185",
        },
      ],
    },
    {
      date: "Tomorrow",
      appointments: [
        {
          studentName: "Adrian Chen",
          course: "CPSC 471",
          time: "2:00pm to 4:00pm",
          location: "Mathematical Sciences 235",
          hasNote: true,
        },
        {
          studentName: "Jaydin Lee",
          course: "CPSC 351",
          time: "12:00pm to 1:00pm",
          location: "Scurfield Hall",
          hasNote: true,
        },
        {
          studentName: "Shahab Salem",
          course: "MATH 271",
          time: "10:00am to 11:00am",
          location: "Mathematical Sciences 162",
        },
        {
          studentName: "Jacob Samuels",
          course: "HTST 301",
          time: "5:00pm to 6:00pm",
          location: "Science Theatres 205",
          hasNote: true,
        },
        {
          studentName: "Rebecca Lemont",
          course: "ENGL 406 ",
          time: "8:00am to 10:00am",
          location: "ENG A 185",
        },
      ],
    },
  ];
  return (
    <Grid container mt={6} columns={10}>
      <Grid item xs={2.25} />
      <Grid
        container
        item
        xs={5.5}
        justifyContent={"center"}
        alignItems={"center"}
        rowSpacing={5}
      >
        {days.map((day, i) => {
          return (
            <Fragment key={i}>
              <Grid item xs={12}>
                <Typography variant="h5">{day.date}</Typography>
              </Grid>
              <Grid
                item
                container
                columns={15}
                columnSpacing={2}
                rowSpacing={2}
              >
                {day.appointments.map((appointment, j) => {
                  return (
                    <Grid item xs={5} key={j}>
                      <AppointmentCard appointment={appointment} />
                    </Grid>
                  );
                })}
              </Grid>
            </Fragment>
          );
        })}
      </Grid>
      <Grid item xs={2.25} />
    </Grid>
  );
}
