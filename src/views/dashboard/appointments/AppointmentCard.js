import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { CardContent } from "@mui/material";
import { LocationOnOutlined, AccessTimeOutlined } from "@mui/icons-material";
import Grid from "@mui/material/Grid";

function AppointmentCard({ appointment }) {
  return (
    <div>
      <Card
        sx={{
          minHeight: 200,
        }}
      >
        <CardContent>
          <Typography mb={1} variant="h6">
            {appointment.studentName}
          </Typography>
          <Typography mb={1} variant="body1">
            {appointment.course}
          </Typography>
          <Grid container>
            <Grid item mr={1}>
              <AccessTimeOutlined fontSize={"10"} />
            </Grid>
            <Grid item>
              <Typography color="textSecondary" variant="body1">
                {appointment.time}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item mr={1}>
              <LocationOnOutlined fontSize={"10"} color="textSecondary" />
            </Grid>
            <Grid item>
              <Typography color="textSecondary" variant="body1">
                {appointment.location}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions disableSpacing={true}>
          {appointment.hasNote && <Button size="small">See Notes</Button>}
        </CardActions>
      </Card>
    </div>
  );
}

export default AppointmentCard;
