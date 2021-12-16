import { useState } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import {
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import {
  LocationOnOutlined,
  AccessTimeOutlined,
  Edit,
} from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import AppointmentDialog from "./AppointmentDialog";
import dayjs from "dayjs";
var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

export default function AppointmentCard({ appointment, isStudent }) {
  const [showNotes, setShowNotes] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const startTime = appointment.hours_aggregate.aggregate.min.start_time;
  const endTime = appointment.hours_aggregate.aggregate.max.start_time;

  const hourFormat = "h:mma";
  const startHour = dayjs.utc(startTime).local().format(hourFormat);
  const endHour = dayjs.utc(endTime).add(1, "hour").local().format(hourFormat);

  const userName = isStudent
    ? appointment.offering.tutor.user?.name
    : appointment.student.user?.name;

  return (
    <div>
      <Card
        sx={{
          minHeight: 200,
        }}
      >
        <CardContent>
          <Grid
            mb={1}
            container
            justifyContent="space-between"
            direction="row"
            alignItems="center"
          >
            <Typography variant="h6">{userName}</Typography>
            {isStudent && (
              <IconButton size="small" onClick={() => setShowEditDialog(true)}>
                <Edit fontSize={"10"} />
              </IconButton>
            )}
          </Grid>
          <Typography mb={1} variant="body1">
            {appointment.offering.course_id}
          </Typography>
          <Grid container>
            <Grid item mr={1}>
              <AccessTimeOutlined fontSize={"10"} />
            </Grid>
            <Grid item>
              <Typography color="textSecondary" variant="body1">
                {startHour} to {endHour}
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
          {appointment.student_comment && (
            <Button size="small" onClick={() => setShowNotes(true)}>
              See Notes
            </Button>
          )}
        </CardActions>
      </Card>
      <Dialog open={showNotes} onClose={() => setShowNotes(false)}>
        <DialogTitle>Appointment Notes</DialogTitle>
        <DialogContent>
          <Typography>{appointment.student_comment}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowNotes(false)}> Done </Button>
        </DialogActions>
      </Dialog>
      {showEditDialog && (
        <AppointmentDialog
          offering={appointment.offering}
          appointment={appointment}
          handleClose={() => setShowEditDialog(false)}
          isEdit={true}
        />
      )}
    </div>
  );
}
