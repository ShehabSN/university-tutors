import * as React from "react";
import { Grid, Typography } from "@mui/material";
import ReviewsCards from "./ReviewsCards";
import { makeStyles } from "@mui/styles";
import { useQuery } from "@apollo/client";
import { READ_REVEIWS } from "../../../graphql/queries";
import { AuthContext } from "../../../Auth";
import LoadingPage from "../../LoadingPage";
const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "60px",
    paddingRight: "60px",
    paddingTop: "35px",
  },
});
export default function Reviews() {
  const classes = useStyles();
  const { currentUser } = React.useContext(AuthContext);

  const { loading, error, data } = useQuery(READ_REVEIWS, {
    variables: { id: currentUser.uid },
  });

  if (loading) return <LoadingPage />;
  if (error) return `${error}`;

  const tutor = data.tutor_by_pk;
  const reviewIds = tutor.reviews.map((review) => {
    return { ...review };
  });

  return (
    // <Grid container mt={6} px={6} pb={6}>
    <Grid
      container
      spacing={2}
      className={classes.gridContainer}
      justify="center"
    >
      {reviewIds.length === 0 ? (
        <Typography>You have not received any reviews yet</Typography>
      ) : (
        reviewIds.map((userReviews, i) => (
          <Grid key={i} item xs={12} sm={6} md={4}>
            <ReviewsCards reviews={userReviews} />
          </Grid>
        ))
      )}
    </Grid>
    // </Grid>
  );
}
