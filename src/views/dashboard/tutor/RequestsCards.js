import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import { Grid } from "@mui/material";
import { Stack } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const useStyles = makeStyles({
  root: {
    minWidth: 200,
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

export default function ReviewsCards({ requests }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h6">{requests.studentName}</Typography>
        <Stack justifyContent="space-between" direction="row">
          <Typography inline variant="body1" align="left">
            {requests.course}
          </Typography>
          <Typography inline variant="body1" align="right">
            {requests.professorName}
          </Typography>
        </Stack>
        <Grid container>
          <Grid item mr={1} mt={1}>
            <AccessTimeIcon fontSize="1" color="secondaryColour" />
          </Grid>
          <Grid item>
            <Typography mt={1} color="textSecondary" variant="body1">
              {requests.time}
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
        <Button variant="outlined" size="small" color="primary">
          Accept
        </Button>
      </CardActions>
    </Card>
  );
}
