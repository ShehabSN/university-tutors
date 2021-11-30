import { useMutation, useQuery } from "@apollo/client";
import { Button, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import * as React from "react";
import { AuthContext } from "../../../Auth";
import { UPDATE_TUTOR } from "../../../graphql/mutations";
import { GET_TUTOR_PROFILE } from "../../../graphql/queries";
import OfferingTile from "../OfferingTile";
import Title from "../Title";
import EditProfileDialog from "./EditProfileDialog";

export default function Profile() {
  const { currentUser } = React.useContext(AuthContext);
  const [updateTutor] = useMutation(UPDATE_TUTOR, {
    variables: {
      id: currentUser.uid,
    },
  });

  const [editProfile, setEditProfile] = React.useState(false);

  // Fetch tutor profile
  const { loading, error, data, refetch } = useQuery(GET_TUTOR_PROFILE, {
    variables: {
      id: currentUser.uid,
    },
  });

  if (loading) return null;
  if (error) return `${error}`;

  // Extract relevant data
  const tutor = {
    ...data.tutor_by_pk,
  };
  const baseOfferings = tutor.offerings;
  delete tutor.offerings;
  const offerings = baseOfferings.map((offering) => {
    return {
      tutor: tutor,
      ...offering,
    };
  });

  const handleEditProfile = (data) => {
    // Default values to null
    updateTutor({
      variables: {
        name: data.user.name || null,
        hourly_rate: data.hourly_rate || null,
        bio: data.bio || null,
      },
      onCompleted: () => {
        // Update cache when finished
        refetch();
        setEditProfile(false);
      },
    });
  };

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
              <Typography variant="body1">{tutor.user.name}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Hourly Rate</Typography>
              <Typography variant="body1">{`$${tutor.hourly_rate}/hr`}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Bio</Typography>
              <Typography variant="body1">{tutor.bio}</Typography>
            </Grid>
            <Grid item mt={1} xs={12}>
              <Stack direction="row" spacing={2}>
                <Button onClick={() => setEditProfile(true)}>
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
      {offerings.map((offering, i) =>
        <Grid key={i} item xs={12} md={6}>
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
    <EditProfileDialog
      tutor={tutor}
      open={editProfile}
      handleClose={() => setEditProfile(false)}
      onSave={handleEditProfile}
    />
  </Container>;
}
