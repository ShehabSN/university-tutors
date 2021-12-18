import * as React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Rating,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { AuthContext } from "../../../Auth";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_REVIEW } from "../../../graphql/mutations";
import { GET_REVIEW } from "../../../graphql/queries";
import LoadingPage from "../../LoadingPage";

export default function ReviewDialog({ open, close, tutor }) {
  const { currentUser } = React.useContext(AuthContext);
  const [createReview, { loading }] = useMutation(CREATE_REVIEW, {
    refetchQueries: [GET_REVIEW],
  });

  const reviewData = useQuery(GET_REVIEW, {
    variables: {
      tutor_id: tutor.tutor_id,
      student_id: currentUser.uid,
    },
    skip: !open,
  });

  const [comment, setComment] = React.useState("");
  const [stars, setStars] = React.useState(0);

  const handleReview = (event) => {
    event.preventDefault();

    createReview({
      variables: {
        student_id: currentUser.uid,
        tutor_id: tutor.tutor_id,
        comment: comment,
        stars: stars,
      },
      onCompleted: onClose,
    });
  };

  const onClose = () => {
    close();
    setComment("");
    setStars(0);
  };

  React.useEffect(() => {
    if (reviewData?.data?.review[0]) {
      setComment(reviewData.data.review[0].comment);
      setStars(reviewData.data.review[0].stars);
    }
  }, [reviewData?.data?.review]);

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Review</DialogTitle>
        <DialogContent>
          <form id="reviewForm" onSubmit={handleReview}>
            <Stack spacing={3} mt={1}>
              <Typography>
                How would you rate your experience with {tutor.user.name}?
              </Typography>
              {reviewData.loading ? (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                  mt={2}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  <Rating
                    name="simple-controlled"
                    size="large"
                    value={stars}
                    onChange={(event, newValue) => {
                      if(newValue){
                        setStars(newValue);
                      } else {
                        setStars(0);
                      }
                    }}
                  />
                  <TextField
                    name="commentName"
                    label="Comment (optional)"
                    value={comment}
                    multiline
                    rows={5}
                    maxRows={10}
                    onChange={(event) => setComment(event.target.value)}
                  />
                </>
              )}
            </Stack>
          </form>
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={onClose}>
            Cancel
          </Button>
          <LoadingButton loading={loading} type="submit" form="reviewForm">
            Create
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
