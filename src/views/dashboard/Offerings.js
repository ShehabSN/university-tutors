import { useQuery } from "@apollo/client";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Autocomplete, Box, Button, Container, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import * as React from "react";
import { AuthContext } from "../../Auth";
import { GET_COURSES, GET_OFFERINGS, GET_STUDENT_PROFILE } from "../../graphql/queries";
import LoadingPage from "../LoadingPage";
import OfferingTile from "./OfferingTile";

export default function Offerings() {
  const [course, setCourse] = React.useState(null);
  const [startTime, setStartTime] = React.useState(null);
  const [endTime, setEndTime] = React.useState(null);

  const { loading, error, data } = useQuery(GET_COURSES);

  if (loading) return <LoadingPage />
  if (error) return `${error}`;

  const courses = data.course.map((course) => course.course_id);

  const tutorSelect = (offering) => {
    console.log(JSON.stringify(offering, null, 2));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }} display="flex" justifyContent="center">
            <Grid container spacing={3}>
              <Grid item xs={12} md={3} display="flex" justifyContent="flex-start" alignItems="center">
                <Typography variant="h6">
                  Filter results
                </Typography>
              </Grid>
              <Grid item xs={12} md={3} display="flex" justifyContent="flex-end">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    clearable
                    label="After"
                    value={startTime}
                    onChange={setStartTime}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth helperText={null} />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={3} display="flex" justifyContent="flex-end">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    clearable
                    label="Before"
                    value={endTime}
                    onChange={setEndTime}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth helperText={null} />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={3} display="flex" justifyContent="flex-end">
                <Autocomplete
                  disablePortal
                  options={courses}
                  value={course}
                  onChange={(_, value) => setCourse(value)}
                  sx={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth label="Course" />
                  )}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <OfferingResults
          onSelect={tutorSelect}
          course={course}
          startTime={startTime}
          endTime={endTime}
        />
      </Grid>
    </Container>
  );
}

const OfferingResults = ({ course, startTime, endTime, onSelect }) => {
  const { currentUser } = React.useContext(AuthContext);

  const pResult = useQuery(GET_STUDENT_PROFILE, {
    variables: {
      id: currentUser.uid,
    },
  });

  const universityId = pResult.data?.student_by_pk.user.university.university_id;

  const oResult = useQuery(GET_OFFERINGS, {
    skip: !universityId,
    variables: {
      course_exp: {
        ...(course && { course_id: { _eq: course } }),
      },
      tutor_exp: {
        user: {
          university_id: {
            _eq: universityId,
          },
        },
        // Add hours check if provided
        ...((startTime || endTime) && {
          hours: {
            start_time: {
              ...(startTime && { _gte: startTime.toISOString() }),
              ...(endTime && { _lte: endTime.toISOString() }),
            },
          },
        }),
      },
    },
  });

  if (pResult.error || oResult.error) return `${pResult.error}${oResult.error}`;
  if (oResult.data === undefined) return <LoadingPage />;

  const offerings = oResult.data.offering;

  if (offerings.length === 0) {
    return <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100vh"
    >
      No results.
    </Box>;
  }

  return offerings.map((offering, i) => (
    <Grid item xs={12} md={6} key={i}>
      <OfferingTile
        offering={offering}
        children={
          <Stack mt={2} direction="row">
            <Button
              variant="contained"
              onClick={() => onSelect(offering)}
            >
              Book This Tutor
            </Button>
          </Stack>
        }
      />
    </Grid>
  ));
};
