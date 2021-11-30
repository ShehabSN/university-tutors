import { useMutation, useQuery } from "@apollo/client";
import {
  Autocomplete,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import * as React from "react";
import { AuthContext } from "../../../Auth";
import { UPDATE_STUDENT } from "../../../graphql/mutations";
import { GET_STUDENT_PROFILE } from "../../../graphql/queries";
import Title from "../Title";

export default function Profile() {
  const { currentUser } = React.useContext(AuthContext);
  const [updateStudent] = useMutation(UPDATE_STUDENT, {
    variables: {
      id: currentUser.uid,
    },
  });

  // Fetch current user profile
  const { loading, error, data, refetch } = useQuery(GET_STUDENT_PROFILE, {
    variables: {
      id: currentUser.uid,
    },
  });

  if (loading) return null;
  if (error) return `${error}`;

  // Extract relevant data
  const student = data.student_by_pk;
  const universities = data.university.map((uni) => {
    return {
      label: uni.name,
      id: uni.university_id,
    };
  });

  // Callback for form
  const formSave = (event, university) => {
    // Prevents automatic reload
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    // Default values to null
    updateStudent({
      variables: {
        name: data.get('name') || null,
        university_id: university?.id ?? null,
        major: data.get('major') || null,
        year: data.get('year') || null,
      },
      onCompleted: () => {
        // Update cache when finished
        refetch();
      },
    });
  };

  // Separate component required due to the 'university' state
  return <ProfileForm
    student={student}
    universities={universities}
    onSave={formSave}
  />;
}

const ProfileForm = ({ student, universities, onSave }) => {
  // Student's current university, or null if not set
  const [university, setUniversity] = React.useState(
    student.user.university
      ? {
        label: student.user.university.name,
        id: student.user.university.university_id,
      }
      : null
  );

  return <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <Grid container spacing={3} justifyContent={"center"}>
      <Grid item xs={12} md={10}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Title>Your Profile</Title>
          <Grid
            container
            spacing={2}
            justifyContent={"center"}
            alignItems="center"
            component="form"
            onSubmit={(event) => onSave(event, university)}
            noValidate
            sx={{ mt: 2 }}
          >
            <Grid item xs={10} md={10}>
              <TextField
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                defaultValue={student.user.name}
              />
            </Grid>
            <Grid item xs={10} md={10}>
              <Autocomplete
                disablePortal
                id="university"
                options={universities}
                value={university}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(_, newValue) => setUniversity(newValue)}
                renderInput={(params) => (
                  <TextField
                    id="university"
                    label="University"
                    {...params}
                  />
                )}
              />
            </Grid>
            <Grid item xs={10} md={5}>
              <TextField
                fullWidth
                id="major"
                label="Major"
                name="major"
                defaultValue={student.major}
              />
            </Grid>
            <Grid item xs={10} md={5}>
              <TextField
                fullWidth
                id="year"
                label="Year"
                name="year"
                type="number"
                defaultValue={student.year}
              />
            </Grid>
            <Grid item xs={10} sx={{ mt: 2, mb: 2 }}>
              <Button type="submit" variant="contained">
                Save
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  </Container>;
};
