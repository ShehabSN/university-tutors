import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import CardActions from "@mui/material/CardActions";
import { Grid, Stack } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const useStyles = makeStyles({
  root: {
    minWidth: 100,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ReviewsCards({ requests, children }) {
  const classes = useStyles();
  const date = requests.created_at;
  const options = {year: 'numeric', month: 'long', day: 'numeric' };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid mb={1} container justifyContent="space-between" alignItems="center" direction = "row">
          <Typography variant="h6">{requests.student.user.name}</Typography>
        </Grid>
        <Stack justifyContent="space-between" direction="row">
          <Typography variant="body1" align="left">
            {requests.course_id}
          </Typography>
          <Typography variant="body1" align="right">
            {requests.professor_name}
          </Typography>
        </Stack>
        <Grid container>
          <Grid item mr={1}>
            <AccessTimeIcon fontSize="1" color="primary" />
          </Grid>
          <Grid item>
            <Typography color="textSecondary" variant="body2" >
              { new Date(date).toLocaleDateString() }
            </Typography>
          </Grid>
        </Grid>
        <Typography mt={1}>Comments:</Typography>
        <Typography mr={1} variant="body2" color="secondaryColour">
          {requests.comment}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container justify="space-between">
          <Typography align="left"></Typography>
        </Grid>
        {children}
      </CardActions>
    </Card>
  );
}
