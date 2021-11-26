import * as React from "react";
import {Grid} from '@mui/material';
import RequestsCards from "./RequestsCards";
import { makeStyles } from '@mui/styles';

const request = [
  {
    studentName: "Bob",
    course: "CPSC 233",
    professorName: "Prof. Johnson",
    comment: "I don't understand how file I/O works in Java",
    time: "November 1, 2021 - 02:00PM to 04:00PM",
  },
  {
    studentName: "Jack",
    course: "Math 211",
    professorName: "Prof. Ruth",
    comment: "Need help with projections.",
    time: "November 3, 2021 - 01:00PM 02:00PM",
  },
  {
    studentName: "Amelia",
    course: "Anth 311",
    professorName: "Prof. Waj",
    comment: "Upcoming exam, need help with review",
    time: "November 10, 2021 - 08:00AM to 10:00AM",
  },
  {
    studentName: "Sophia",
    course: "CPSC 441",
    professorName: "Prof. S",
    comment: "Help with TCP",
    time: "November 8, 2021 - 02:00PM to 06:00PM",
  },
  {
    studentName: "Frank",
    course: "JPNS 205",
    professorName: "Prof. Tako",
    comment: "Please help! Need help with basic conjunctions.",
    time: "November 2, 2021 - 09:00AM to 02:00PM",
  },
]

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "100px",
    paddingRight: "100px",
    paddingTop: "35px"
  }
});

export default function Requests() {
  const classes = useStyles();
  return (
    <div>
      <Grid
      container
      spacing={2}
      className={classes.gridContainer}
      justify="center"
    >
      {request.map((requests) => (
      <Grid item xs={12} sm={6} md={4}>
        <RequestsCards 
          requests = {requests}
        />
      </Grid>
        ))}
      
    </Grid>
    </div>
  );
}
