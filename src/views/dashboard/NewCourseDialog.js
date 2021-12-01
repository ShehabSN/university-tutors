import { useMutation, useQuery } from "@apollo/client";
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import * as React from "react";
import { CREATE_COURSE } from "../../graphql/mutations";
import { GET_UNIVERSITIES } from "../../graphql/queries";

export default function NewCourseDialog({ open, handleClose, onCompleted }) {
  // Fetch universities
  const { loading, error, data } = useQuery(GET_UNIVERSITIES);
  const [createCourse] = useMutation(CREATE_COURSE);

  if (loading) return null;
  if (error) return `${error}`;
  const universities = data.university;
  const names = universities.map((uni) => uni.name);

  const handleCreateCourse = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // Search for university_id based on name
    const uniName = data.get('university');
    const university = universities.find((u) => u.name === uniName);
    if (!university) return;

    // Create course, then call provided onCompleted
    createCourse({
      variables: {
        course_id: data.get('course') || null,
        name: data.get('name') || null,
        department: data.get('department') || null,
        university_id: university.university_id,
      },
      onCompleted: onCompleted,
    });
  };

  return <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Add Course</DialogTitle>
    <DialogContent>
      <form id="newCourseForm" onSubmit={handleCreateCourse}>
        <Stack spacing={3} mt={1}>
          <TextField
            required
            name="course"
            label="Course ID"
          />
          <TextField
            required
            name="name"
            label="Course Name"
          />
          <TextField
            required
            name="department"
            label="Department"
          />
          <Autocomplete
            disablePortal
            options={names}
            renderInput={(params) => (
              <TextField
                required
                name="university"
                label="University"
                {...params}
              />
            )}
          />
        </Stack>
      </form>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button type="submit" form="newCourseForm">
        Create
      </Button>
    </DialogActions>
  </Dialog>;
}