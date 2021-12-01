import { useQuery } from "@apollo/client";
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import * as React from "react";
import { GET_COURSES } from "../../../graphql/queries";

export default function EditOfferingDialog({ offering, handleClose, onSave }) {
  // Fetch all courses
  const { loading, error, data } = useQuery(GET_COURSES);

  if (loading) return null;
  if (error) return `${error}`;
  const courses = data.course.map((course) => course.course_id);

  // Don't display if offering is null
  if (offering === null) return null;

  return <Dialog open onClose={handleClose}>
    <DialogTitle>
      {offering.offering_id ? 'Edit Offering' : 'New Offering'}
    </DialogTitle>
    <DialogContent>
      <form id="editOfferingForm" onSubmit={onSave}>
        <Stack spacing={3} mt={1}>
          <Autocomplete
            disablePortal
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
  </Dialog>;
}