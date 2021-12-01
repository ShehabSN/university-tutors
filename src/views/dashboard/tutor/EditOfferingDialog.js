import { useQuery } from "@apollo/client";
import { Add } from "@mui/icons-material";
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField } from "@mui/material";
import * as React from "react";
import { GET_COURSES } from "../../../graphql/queries";
import NewCourseDialog from "../NewCourseDialog";

export default function EditOfferingDialog({ offering, handleClose, onSave }) {
  const [newCourse, setNewCourse] = React.useState(false);

  // Fetch all courses
  const { loading, error, data, refetch } = useQuery(GET_COURSES);

  if (loading) return null;
  if (error) return `${error}`;
  const courses = data.course.map((course) => course.course_id);

  // Don't display if offering is null
  if (offering === null) return null;

  return <>
    <Dialog open onClose={handleClose}>
      <DialogTitle>
        {offering.offering_id ? 'Edit Offering' : 'New Offering'}
      </DialogTitle>
      <DialogContent>
        <form id="editOfferingForm" onSubmit={onSave}>
          <Stack spacing={3} mt={1}>
            <Stack direction="row" spacing={3} alignItems="center">
              <Autocomplete
                disablePortal
                fullWidth
                options={courses}
                defaultValue={offering.course?.course_id}
                renderInput={(params) => (
                  <TextField
                    name="course"
                    label="Course"
                    {...params}
                  />
                )}
              />
              <IconButton
                onClick={() => setNewCourse(true)}
              >
                <Add />
              </IconButton>
            </Stack>
            <TextField
              name="gradeReceived"
              label="Grade Received (optional)"
              defaultValue={offering.grade_received || ''}
            />
            <TextField
              name="professorName"
              label="Professor Name (optional)"
              defaultValue={offering.professor_name || ''}
            />
            <TextField
              name="yearTaken"
              label="Year Taken (optional)"
              defaultValue={offering.year_taken || ''}
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" form="editOfferingForm">
          {offering.offering_id ? 'Save' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
    <NewCourseDialog
      open={newCourse}
      handleClose={() => setNewCourse(false)}
      onCompleted={() => {
        setNewCourse(false);
        refetch();
      }}
    />
  </>;
}