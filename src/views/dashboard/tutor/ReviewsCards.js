import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Rating } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    minWidth: 200,
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
        <Typography variant="h6">{reviews.studentName}</Typography>
        <Typography>
          <Box sx={{ "& > legend": { mt: 2 } }}>
            <Rating value={reviews.stars} readOnly={true} />
          </Box>
        </Typography>
        <Typography mt={0.5} variant="body1" color="textSecondary">
          {reviews.comment}
        </Typography>
      </CardContent>
    </Card>
  );
}
