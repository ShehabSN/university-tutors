import * as React from "react";
import { Grid, Typography } from "@mui/material";
import ReviewsCards from "./ReviewsCards";
import { makeStyles } from "@mui/styles";
import { useQuery, useMutation } from "@apollo/client";
import { READ_REVEIWS, GET_REVIEW_ID, GET_TUTOR_PROFILE} from "../../../graphql/queries";
import { AuthContext } from "../../../Auth";
import LoadingPage from "../../LoadingPage";
const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "100px",
    paddingRight: "100px",
    paddingTop: "35px",
  },
});
export default function Reviews() {
const classes = useStyles();
const { currentUser } = React.useContext(AuthContext);

const { loading, error, data } = useQuery(READ_REVEIWS, {
  variables: {id: currentUser.uid},
});

if (loading) return <LoadingPage />;
if (error) return `${error}`;

const tutor = data.tutor_by_pk;
const reviewIds = tutor.reviews.map((review) =>{
  return {...review};
});

return (
    <div>
      <Grid
        container
        spacing={2}
        className={classes.gridContainer}
        justify="center"
      >
        {reviewIds.map((userReviews) => (
          <Grid item xs={12} sm={6} md={4}>
            <ReviewsCards reviews={userReviews} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
