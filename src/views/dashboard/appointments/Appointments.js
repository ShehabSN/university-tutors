import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import * as React from "react";
import AppointmentCard from "./AppointmentCard";

export default function Appointments() {
  const days = [
    {
      date: "Today",
      appointments: [
        {
          studentName: "Adrian Chen",
          course: "CPSC 471",
          time: "02:00PM to 04:00PM",
          location: "Mathematical Sciences 235",
          hasNote: true,
        },
        {
          studentName: "Jaydin Lee",
          course: "CPSC 351",
          time: "12:00PM to 01:00PM",
          location: "Scurfield Hall",
          hasNote: true,
        },
        {
          studentName: "Shahab Salem",
          course: "MATH 271",
          time: "10:00AM to 11:00AM",
          location: "Mathematical Sciences 162",
        },
        {
          studentName: "Jacob Samuels",
          course: "HTST 301",
          time: "05:00PM to 06:00PM",
          location: "Science Theatres 205",
          hasNote: true,
        },
        {
          studentName: "Rebecca Lemont",
          course: "ENGL 406 ",
          time: "08:00AM to 10:00AM",
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
          time: "02:00PM to 04:00PM",
          location: "Mathematical Sciences 235",
          hasNote: true,
        },
        {
          studentName: "Jaydin Lee",
          course: "CPSC 351",
          time: "12:00PM to 01:00PM",
          location: "Scurfield Hall",
          hasNote: true,
        },
        {
          studentName: "Shahab Salem",
          course: "MATH 271",
          time: "10:00AM to 11:00AM",
          location: "Mathematical Sciences 162",
        },
        {
          studentName: "Jacob Samuels",
          course: "HTST 301",
          time: "05:00PM to 06:00PM",
          location: "Science Theatres 205",
          hasNote: true,
        },
        {
          studentName: "Rebecca Lemont",
          course: "ENGL 406 ",
          time: "08:00AM to 10:00AM",
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
        {days.map((day) => {
          return (
            <>
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
                {day.appointments.map((appointment) => {
                  return (
                    <Grid item xs={5}>
                      <AppointmentCard appointment={appointment} />
                    </Grid>
                  );
                })}
              </Grid>
            </>
          );
        })}
      </Grid>
      <Grid item xs={2.25} />
    </Grid>
  );
}
