import * as React from "react";
import { Grid, Button, Stack } from "@mui/material";
import RequestsCards from "./RequestsCards";
import { makeStyles } from "@mui/styles";
import { useQuery, useMutation } from "@apollo/client";
import { READ_REQUEST } from "../../../graphql/queries";
import { DELETE_REQUEST, CREATE_OFFERING } from "../../../graphql/mutations";
import { AuthContext } from "../../../Auth";
import LoadingPage from "../../LoadingPage";
import EditOfferingDialog from "./RequestOfferingDialog";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "35px",
    paddingRight: "35px",
    paddingTop: "35px",
  },
});

export default function Requests() {
  const classes = useStyles();
  const { currentUser } = React.useContext(AuthContext);
  const { loading, error, data , refetch} = useQuery(READ_REQUEST, {});
  const [deleteRequest] = useMutation(DELETE_REQUEST);
  const [createOffering, createOfferingResult] = useMutation(CREATE_OFFERING);
  const [editingOffering, setEditingOffering] = React.useState(null);

  if (loading) return <LoadingPage />;
  if (error) return `${error}`;

  const requests = data.request.map((request) =>{
    return {...request};
  });

  // Includes handling new offering
  const handleEditOffering = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // A course is required to create an offering
    if (!data.get('course') && !editingOffering) {
      // TODO: show error
      return;
    }

    // Extract data, defaulting to null
    const variables = {
      // When the TextField is disabled, the info inside can't be retrieved
      course_id: editingOffering.request?.course_id || null,
      grade_received: data.get('gradeReceived') || null,
      professor_name: data.get('professorName') || null,
      year_taken: data.get('yearTaken') || null,
    };

    const onCompleted = () => {
      // Hide dialog and refetch courses when finished
      setEditingOffering(null);
      refetch();
    };

    // Create new offering
    createOffering({
      variables: {
        tutor_id: currentUser.uid,
        ...variables,
      },
      onCompleted: onCompleted,
    });
    
    // delete request after creating new offering
    deleteRequest({
      variables: {
        request_id: editingOffering.request.request_id,
      },
      onCompleted: onCompleted,
    });
  };

  return (
    <div>
      <Grid
        container
        spacing={2}
        className={classes.gridContainer}
        justify="center"
      >
        {requests.map((request, i) => (
          <Grid key={i} item xs={12} sm={6} md={4}>
            <RequestsCards requests={request} 
            children={<Stack>
              <Button variant="contained" size="medium" color="primary" onClick={() => setEditingOffering({request})}
              >Accept</Button>
            </Stack>}
            />
          </Grid>
        ))}
      </Grid>
      <EditOfferingDialog
      offering={editingOffering}
      handleClose={() => setEditingOffering(null)}
      onSave={handleEditOffering}
      loading={createOfferingResult.loading}
    />
    </div>
  );
}
