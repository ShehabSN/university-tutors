import { useMutation, useQuery } from "@apollo/client";
import { LoadingButton } from "@mui/lab";
import { Button, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import * as React from "react";
import { AuthContext } from "../../../Auth";
import { CREATE_OFFERING, DELETE_OFFERING, UPDATE_OFFERING, UPDATE_TUTOR } from "../../../graphql/mutations";
import { GET_TUTOR_PROFILE } from "../../../graphql/queries";
import LoadingPage from "../../LoadingPage";
import OfferingTile from "../OfferingTile";
import Title from "../Title";
import EditOfferingDialog from "./EditOfferingDialog";
import EditProfileDialog from "./EditProfileDialog";

export default function Profile() {
  const { currentUser } = React.useContext(AuthContext);
  const [updateTutor, updateTutorResult] = useMutation(UPDATE_TUTOR, {
    variables: {
      id: currentUser.uid,
    },
  });
  const [createOffering, createOfferingResult] = useMutation(CREATE_OFFERING);
  const [updateOffering, updateOfferingResult] = useMutation(UPDATE_OFFERING);
  const [deleteOffering] = useMutation(DELETE_OFFERING);

  const [editProfile, setEditProfile] = React.useState(false);
  const [editingOffering, setEditingOffering] = React.useState(null);
  const [deletingOfferingId, setDeletingOfferingId] = React.useState(null);

  // Fetch tutor profile
  const { loading, error, data, refetch } = useQuery(GET_TUTOR_PROFILE, {
    variables: {
      id: currentUser.uid,
    },
  });

  if (loading) return <LoadingPage />;
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

  const universities = data.university.map((uni) => {
    return {
      label: uni.name,
      id: uni.university_id,
    };
  });

  const handleEditProfile = (event, university) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // Default values to null
    updateTutor({
      variables: {
        name: data.get('name') || null,
        university_id: university?.id ?? null,
        hourly_rate: data.get('hourlyRate') || null,
        bio: data.get('bio') || null,
      },
      onCompleted: () => {
        // Hide dialog when finished
        // Don't need to refetch, as the cache updates immediately
        setEditProfile(false);
      },
    });
  };

  // Includes handling new offering
  const handleEditOffering = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // A course is required to update or create an offering
    if (!data.get('course') && !editingOffering) {
      // TODO: show error
      return;
    }

    // Extract data, defaulting to null
    const variables = {
      // When the TextField is disabled, the info inside can't be retrieved
      course_id: data.get('course') || editingOffering.course?.course_id || null,
      grade_received: data.get('gradeReceived') || null,
      professor_name: data.get('professorName') || null,
      year_taken: data.get('yearTaken') || null,
    };

    const onCompleted = () => {
      // Hide dialog and refetch courses when finished
      setEditingOffering(null);
      refetch();
    };

    if (editingOffering.offering_id) {
      // Update existing offering
      updateOffering({
        variables: {
          offering_id: editingOffering.offering_id,
          ...variables,
        },
        onCompleted: onCompleted,
      });
    }
    else {
      // Create new offering
      createOffering({
        variables: {
          tutor_id: currentUser.uid,
          ...variables,
        },
        onCompleted: onCompleted,
      });
    }
  };

  const handleDeleteOffering = (offering) => {
    setDeletingOfferingId(offering.offering_id);
    deleteOffering({
      variables: {
        offering_id: offering.offering_id,
      },
      onCompleted: () => {
        refetch();
        setDeletingOfferingId(null);
      },
    });
  };

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
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Bio</Typography>
              <Typography variant="body1">{tutor.bio}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">University</Typography>
              <Typography variant="body1">{tutor.user.university?.name ?? 'None'}</Typography>
            </Grid>
            <Grid item mt={1} xs={12}>
              <Stack direction="row" spacing={2}>
                <Button onClick={() => setEditProfile(true)}>
                  Edit Profile
                </Button>
                <Button onClick={() => setEditingOffering({})}>
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
                disabled={offering.offering_id === deletingOfferingId}
                onClick={() => setEditingOffering(offering)}
              >
                Edit Offering
              </Button>
              <LoadingButton
                loading={offering.offering_id === deletingOfferingId}
                color="error"
                onClick={() => handleDeleteOffering(offering)}
              >
                Delete Offering
              </LoadingButton>
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
      universities={universities}
      loading={updateTutorResult.loading}
    />
    <EditOfferingDialog
      offering={editingOffering}
      handleClose={() => setEditingOffering(null)}
      onSave={handleEditOffering}
      loading={createOfferingResult.loading || updateOfferingResult.loading}
    />
  </Container>;
}
