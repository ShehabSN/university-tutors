import { Rating } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import * as React from "react";

const useStyles = makeStyles({
  root: {
    minWidth: 100,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ReviewsCards({ reviews }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h6">{reviews.student.user.name}</Typography>
        <Rating value={reviews.stars} readOnly={true} />
        <Typography mt={0.5} variant="body1" color="textSecondary">
          {reviews.comment}
        </Typography>
      </CardContent>
    </Card>
  );
}
