import { useMutation, useQuery } from "@apollo/client";
import { Add } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField } from "@mui/material";
import * as React from "react";
import { AuthContext } from "../../../Auth";
import { CREATE_REQUEST } from "../../../graphql/mutations";
import { GET_COURSES } from "../../../graphql/queries";
import NewCourseDialog from "../NewCourseDialog";

export default function RequestCourseDialog({ open, handleClose }) {
  const { currentUser } = React.useContext(AuthContext);

  const [newCourse, setNewCourse] = React.useState(false);
  const [course, setCourse] = React.useState(null);
  const [professor, setProfessor] = React.useState(null);
  const [comment, setComment] = React.useState(null);

  const [createRequest, { loading }] = useMutation(CREATE_REQUEST);

  // Fetch all courses
  const courseResult = useQuery(GET_COURSES);

  if (courseResult.loading) return null;
  if (courseResult.error) return `${courseResult.error}`;
  const courses = courseResult.data.course.map((course) => course.course_id);

  const handleRequestCourse = (event) => {
    event.preventDefault();

    // Course if required
    if (!course) return;

    createRequest({
      variables: {
        student_id: currentUser.uid,
        course_id: course,
        professor_name: professor,
        comment: comment,
      },
      onCompleted: onClose,
    });
  };

  const onClose = () => {
    // Close dialog and set variables to null
    handleClose();
    setCourse(null);
    setProfessor(null);
    setComment(null);
  };

  return <>
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Request a Course</DialogTitle>
      <DialogContent>
        <form id="requestCourseForm" onSubmit={handleRequestCourse}>
          <Stack spacing={3} mt={1}>
            <Stack direction="row" spacing={3} alignItems="center">
              <Autocomplete
                disablePortal
                fullWidth
                options={courses}
                value={course}
                onChange={(_, value) => setCourse(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="course"
                    label="Course"
                  />
                )}
              />
              <IconButton onClick={() => setNewCourse(true)}>
                <Add />
              </IconButton>
            </Stack>
            <TextField
              name="professorName"
              label="Professor Name (optional)"
              value={professor}
              onChange={(event) => setProfessor(event.target.value)}
            />
            <TextField
              name="comment"
              label="Comment (optional)"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button disabled={loading} onClick={onClose}>Cancel</Button>
        <LoadingButton
          disabled={!course}
          loading={loading}
          type="submit"
          form="requestCourseForm"
        >
          Create
        </LoadingButton>
      </DialogActions>
    </Dialog>
    <NewCourseDialog
      open={newCourse}
      handleClose={() => setNewCourse(false)}
      onCompleted={() => {
        setNewCourse(false);
        courseResult.refetch();
      }}
    />
  </>;
}
