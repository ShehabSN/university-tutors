import * as React from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Box, Rating, Typography } from '@mui/material';
import { LoadingButton } from "@mui/lab";
import { AuthContext } from "../../../Auth";
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../../../graphql/mutations";

export default function ReviewDialog({ open, close}) {
  const { currentUser } = React.useContext(AuthContext);
  const [ createReview, {loading} ] = useMutation(CREATE_REVIEW);
  const [comment, setComment] = React.useState(null);
  const [stars, setStars] = React.useState(0);
    
  // temp tutor - enter tutor via textfield
  const [tutor, setTutor] = React.useState(null);

  const handleReview = (event) => {
    event.preventDefault();

    createReview({
      variables: {
        student_id: currentUser.uid,
        tutor_id: tutor,
        comment: comment,
        stars: stars,
      },
      onCompleted: onClose,
    });
  };

  const onClose = () => {
    close();
    setComment(null);
    setStars(null);
    setTutor(null);
  };

return <>
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Review</DialogTitle>
      <DialogContent>
        <form id="reviewForm" onSubmit={handleReview}>
          <Stack spacing={3} mt={1}>
            <TextField
              name = "tutorName"
              label = "tutor_id (temporary)"
              value = {tutor}
              onChange = {(event) => setTutor(event.target.value)}
            />
            <Rating
              name="simple-controlled"
              size="large"
              value={stars}
              onChange={(event, newValue) => {
                setStars(newValue);
              }}
            />
            <TextField
              name = "commentName"
              label = "Comment (optional)"
              value = {comment}
              multiline
              rows={5}
              maxRows={10}
              onChange = {(event) => setComment(event.target.value)}
            />
          </Stack>
        </form> 
      </DialogContent>
      <DialogActions>
        <Button disabled={loading} onClick={onClose}>Cancel</Button>
        <LoadingButton
          loading={loading}
          type="submit"
          form="reviewForm"
        >
          Create
        </LoadingButton>
      </DialogActions>
  </Dialog>
  onCompleted={() => {createReview.refetch();}}
  </>;
}