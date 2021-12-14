import { useQuery } from "@apollo/client";
import { Add } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField } from "@mui/material";
import * as React from "react";
import { GET_COURSES } from "../../../graphql/queries";
import NewCourseDialog from "../NewCourseDialog";

export default function EditOfferingDialog({ offering, handleClose, onSave, loading }) {
  const [newCourse, setNewCourse] = React.useState(false);

  // Fetch all courses
  const courseResult = useQuery(GET_COURSES);

  if (courseResult.loading) return null;
  if (courseResult.error) return `${courseResult.error}`;
  const courses = courseResult.data.course.map((course) => course.course_id);

  // Don't display if offering is null
  if (offering === null) return null;

  const isEditing = Boolean(offering.offering_id);

  return <>
    <Dialog open onClose={handleClose}>
      <DialogTitle>
        {isEditing ? 'Edit Offering' : 'New Offering'}
      </DialogTitle>
      <DialogContent>
        <form id="editOfferingForm" onSubmit={onSave}>
          <Stack spacing={3} mt={1}>
            <Stack direction="row" spacing={3} alignItems="center">
              <Autocomplete
                disablePortal
                fullWidth
                disabled={isEditing}
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
              {isEditing ? null :
                <IconButton onClick={() => setNewCourse(true)}>
                  <Add />
                </IconButton>
              }
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
        <Button disabled={loading} onClick={handleClose}>Cancel</Button>
        <LoadingButton loading={loading} type="submit" form="editOfferingForm">
          {isEditing ? 'Save' : 'Create'}
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