import { Autocomplete, Button, Container, Grid, Paper, TextField } from "@mui/material";
import * as React from "react";
import Title from "../Title";

export default function Profile({ student, universities }) {
  // Placeholder data
  if (!student) {
    student = {
      name: 'John Smith',
      major: 'Computer Science',
      year: 4,
      university: 'University of Calgary',
    };

    universities = [
      'University of Calgary',
      'Mount Royal University',
      'University of Alberta',
    ];
  }
  
  const [university, setUniversity] = React.useState(student.university);

  const formSave = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    for (const pair of data.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
    console.log(`University: ${university}`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3} justifyContent={"center"}>
        <Grid item xs={12} md={10}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Title>Your Profile</Title>
            <Grid
              container
              spacing={2}
              justifyContent={"center"}
              alignItems='center'
              component="form"
              onSubmit={formSave}
              noValidate
            >
              <Grid item xs={10} md={10}>
                <TextField
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  defaultValue={student.name}
                />
              </Grid>
              <Grid item xs={10} md={10}>
                <Autocomplete
                  disablePortal
                  id="university"
                  options={universities}
                  value={university}
                  onChange={(_, newValue) => {
                    setUniversity(newValue);
                  }}
                  renderInput={(params) => <TextField
                    {...params}
                    id="university"
                    label="University"
                  />}
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
                <Button
                  type="submit"
                  variant="contained"
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
