import * as React from "react";
import { Grid, Typography } from "@mui/material";
import RequestsCards from "./RequestsCards";
import { makeStyles } from "@mui/styles";
import { useQuery, useMutation } from "@apollo/client";
import { READ_REQUEST } from "../../../graphql/queries";
import { UPDATE_REQUEST, DELETE_REQUEST } from "../../../graphql/mutations";
import { AuthContext } from "../../../Auth";
import LoadingPage from "../../LoadingPage";



const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "35px",
    paddingRight: "35px",
    paddingTop: "35px",
  },
});

export default function Requests() {
  const classes = useStyles();
  // const { currentUser } = React.useContext(AuthContext);
  const { loading, error, data } = useQuery(READ_REQUEST, {});

  if (loading) return <LoadingPage />;
  if (error) return `${error}`;

  const requests = data.request.map((request) =>{
    return {...request};
  });

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
            <RequestsCards requests={request} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
