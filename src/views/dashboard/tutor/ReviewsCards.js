import { Rating, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import * as React from "react";
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



export default function ReviewsCards({ reviews }) {
  const classes = useStyles();
  const date = reviews.created_at;
  
  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid mb={1} container justifyContent="space-between" alignItems="center" direction = "row">
        <Typography variant="h6">{reviews.student.user.name}</Typography>
        </Grid>
          <Rating value={reviews.stars} readOnly={true} size="small"  />
          <Grid container>
            <Grid item mr={1}>
              <AccessTimeIcon fontSize="1" color="primary" />
            </Grid>
            <Grid item>
              <Typography color="textSecondary" variant="body2">
                { new Date(date).toLocaleDateString() }
              </Typography>
            </Grid>
          </Grid>
        <Grid mt={1} container justifyContent="space-between" alignItems="center" direction = "row">
          <Typography variant="body1" color="textSecondary">
            {reviews.comment}
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  );
}
