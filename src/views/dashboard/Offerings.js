import { useQuery } from "@apollo/client";
import { Button, Container, Grid, Stack, TextField } from "@mui/material";
import * as React from "react";
import { GET_OFFERINGS } from "../../graphql/queries";
import OfferingTile from "./OfferingTile";

export default function Offerings() {
  const [searchTerm, setSearchTerm] = React.useState('');

  const tutorSelect = (offering) => {
    console.log(JSON.stringify(offering, null, 2));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  };

  const OfferingResults = ({ searchTerm }) => {
    const { loading, error, data } = useQuery(GET_OFFERINGS, {
      variables: {
        search_term: `%${searchTerm}%`,
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
                onClick={() => tutorSelect(offering)}
              >
                Book This Tutor
              </Button>
            </Stack>
          }
        />
      </Grid>
    ));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Search"
            value={searchTerm}
            onChange={handleSearch}
          />
        </Grid>
        <OfferingResults searchTerm={searchTerm} />
      </Grid>
    </Container>
  );
}
