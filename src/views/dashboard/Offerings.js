import { useQuery } from "@apollo/client";
import { Autocomplete, Box, Button, Container, Grid, Stack, TextField } from "@mui/material";
import * as React from "react";
import { AuthContext } from "../../Auth";
import { GET_DEPARTMENTS, GET_OFFERINGS, GET_STUDENT_PROFILE } from "../../graphql/queries";
import LoadingPage from "../LoadingPage";
import OfferingTile from "./OfferingTile";

export default function Offerings() {
  const [filter, setFilter] = React.useState(null);

  const { loading, error, data } = useQuery(GET_DEPARTMENTS, {
    variables: {
      department: filter || '%',
    },
  });

  if (loading) return <LoadingPage />
  if (error) return `${error}`;

  const departments = data.course.map((course) => course.department);

  const tutorSelect = (offering) => {
    console.log(JSON.stringify(offering, null, 2));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} display="flex" justifyContent="flex-end">
          <Autocomplete
            disablePortal
            options={departments}
            value={filter}
            onChange={(_, value) => setFilter(value)}
            sx={{ width: 200 }}
            renderInput={(params) => (
              <TextField
                label="Filter by department"
                {...params}
              />
            )}
          />
        </Grid>
        <OfferingResults
          onSelect={tutorSelect}
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
        ...(course && { _eq: course }),
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
