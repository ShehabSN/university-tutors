import * as React from "react";
import { Grid } from "@mui/material";
import ReviewsCards from "./ReviewsCards";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "100px",
    paddingRight: "100px",
    paddingTop: "35px",
  },
});

const userReviews = [
  {
    review_id: 1111,
    studentName: "Bob",
    comment: "Tutor spilt coffee on my laptop :(",
    stars: 2,
  },
  {
    review_id: 2222,
    studentName: "Tom",
    comment: "Best tutor ever! Aced my test!",
    stars: 5,
  },
  {
    review_id: 3333,
    studentName: "Frank",
    comment: "Teaches better than my prof!",
    stars: 4,
  },
  {
    review_id: 4444,
    studentName: "Emma",
    comment: "Tutor went overtime for free!",
    stars: 5,
  },
  {
    review_id: 5555,
    studentName: "Ruby",
    comment: "Wonderful!",
    stars: 3,
  },
  {
    review_id: 6666,
    studentName: "Mia",
    comment: "Meh",
    stars: 1,
  },
];

export default function Reviews() {
  const classes = useStyles();
  return (
    <div>
      <Grid
        container
        spacing={2}
        className={classes.gridContainer}
        justify="center"
      >
        {userReviews.map((userReviews) => (
          <Grid item xs={12} sm={6} md={4}>
            <ReviewsCards reviews={userReviews} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
