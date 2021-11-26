import { Button, Container, Grid, Stack } from "@mui/material";
import * as React from "react";
import OfferingTile from "./OfferingTile";

export default function Offerings({ offerings }) {
  // Placeholder data
  if (!offerings) {
    offerings = [
      {
        tutor: {
          name: 'Alice',
          hourlyRate: 20,
          bio: 'I am a real human tutor, and am not a lizard.',
        },
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
        tutor: {
          name: 'Bob',
          hourlyRate: 14.99,
          bio: 'I tutor good',
        },
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
        tutor: {
          name: 'Carol',
          hourlyRate: 30,
          bio: '',
        },
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

  const tutorSelect = (offering) => {
    console.log(JSON.stringify(offering, null, 2));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {offerings.map((offering) =>
          <Grid item xs={12} md={6}>
            <OfferingTile
              offering={offering}
              children={<Stack mt={2} direction="row">
                <Button
                  variant="contained"
                  onClick={() => tutorSelect(offering)}
                >
                  Book This Tutor
                </Button>
              </Stack>}
            />
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
