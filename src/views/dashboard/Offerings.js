import { useQuery } from "@apollo/client";
import { Autocomplete, Button, Container, Grid, Stack, TextField } from "@mui/material";
import * as React from "react";
import { GET_DEPARTMENTS, GET_OFFERINGS } from "../../graphql/queries";
import OfferingTile from "./OfferingTile";

export default function Offerings() {
  const [filter, setFilter] = React.useState(null);

  const { loading, error, data } = useQuery(GET_DEPARTMENTS, {
    variables: {
      department: filter || '%',
    },
  });

  if (loading) return null;
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
          department={filter}
          onSelect={tutorSelect}
        />
      </Grid>
    </Container>
  );
}

const OfferingResults = ({ department, onSelect }) => {
  const { loading, error, data } = useQuery(GET_OFFERINGS, {
    variables: {
      department: department || '%',
    },
  });

  if (loading) return null;
  if (error) return `${error}`;

  const offerings = data.offering;

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
