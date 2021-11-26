import { Button, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import * as React from "react";
import OfferingTile from "../OfferingTile";
import Title from "../Title";

export default function Profile({ tutor, offerings }) {
  // Placeholder data
  if (!tutor) {
    tutor = {
      name: 'Alice',
      hourlyRate: 20,
      bio: 'I am a real human tutor, and not a lizard.',
    };

    offerings = [
      {
        tutor: tutor,
        course: {
          courseId: 'CPSC 471',
          name: 'Data Base Management Systems',
          department: 'Computer Science',
        },
        professorName: 'Dr. Reda Elhajj',
        yearTaken: 'Fall 2021',
        gradeReceived: 'A+',
      },
      {
        tutor: tutor,
        course: {
          courseId: 'ASPH 503',
          name: 'The Interstellar Medium',
          department: 'Astrophysics',
        },
        professorName: 'Dr. Bill Nye',
        yearTaken: 'Winter 2020',
        gradeReceived: 'F-',
      },
      {
        tutor: tutor,
        course: {
          courseId: 'CPSC 313',
          name: 'Introduction to Computability',
          department: 'Computer Science',
        },
        professorName: null,
        yearTaken: null,
        gradeReceived: null,
      },
    ];
  }

  const editProfile = () => { };
  const newOffering = () => { };
  const editOffering = (offering) => { };
  const deleteOffering = (offering) => { };

  return <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Title>Your Profile</Title>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={6} justifyContent="center">
              <Typography variant="h6">Name</Typography>
              <Typography variant="body1">{tutor.name}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Hourly Rate</Typography>
              <Typography variant="body1">{`$${tutor.hourlyRate}/hr`}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Bio</Typography>
              <Typography variant="body1">{tutor.bio}</Typography>
            </Grid>
            <Grid item mt={1} xs={12}>
              <Stack direction="row" spacing={2}>
                <Button onClick={editProfile}>
                  Edit Profile
                </Button>
                <Button onClick={newOffering}>
                  Create New Offering
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      {offerings.map((offering) =>
        <Grid item xs={12} md={6}>
          <OfferingTile
            offering={offering}
            children={<Stack mt={2} direction="row" spacing={2}>
              <Button
                onClick={() => editOffering(offering)}
              >
                Edit Offering
              </Button>
              <Button
                color="error"
                onClick={() => deleteOffering(offering)}
              >
                Delete Offering
              </Button>
            </Stack>}
          />
        </Grid>
      )}
    </Grid>
  </Container>;
}
