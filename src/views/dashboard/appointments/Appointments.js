import { useState, useContext, useEffect } from "react";
import { Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Fragment } from "react";
import AppointmentCard from "./AppointmentCard";
import { useQuery } from "@apollo/client";
import {
  GET_STUDENT_APPOINTMENTS,
  GET_TUTOR_APPOINTMENTS,
} from "../../../graphql/queries";
import { AuthContext } from "../../../Auth";
import LoadingPage from "../../../views/LoadingPage";
import dayjs from "dayjs";
var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

export default function Appointments() {
  const [isAscending, setIsAscending] = useState(true);
  const [datedAppointments, setDatedAppointments] = useState(new Map());
  const { userType, currentUser } = useContext(AuthContext);
  const isStudent = userType.current === "student";

  const studentAppts = useQuery(GET_STUDENT_APPOINTMENTS, {
    fetchPolicy: "network-only",
    variables: {
      student_id: currentUser.uid,
      order_by: isAscending ? "asc" : "desc",
    },
    skip: !isStudent,
  });

  const tutorAppts = useQuery(GET_TUTOR_APPOINTMENTS, {
    fetchPolicy: "network-only",
    variables: {
      tutor_id: currentUser.uid,
      order_by: isAscending ? "asc" : "desc",
    },
    skip: isStudent,
  });

  const appointmentsData = isStudent ? studentAppts.data : tutorAppts.data;

  useEffect(() => {
    if (appointmentsData?.appointment) {
      let appointments = new Map();
      let currentDate = dayjs();
      appointmentsData.appointment.forEach((appointment) => {
        const dateObj = dayjs
          .utc(appointment.hours_aggregate.aggregate.min.start_time)
          .local();

        let date;
        const isCurrentMonth = dateObj.month() === currentDate.month();
        const isCurrentYear = dateObj.year() === currentDate.year();

        if (
          isCurrentMonth &&
          isCurrentYear &&
          dateObj.date() === currentDate.date()
        ) {
          date = "Today";
        } else if (
          isCurrentMonth &&
          isCurrentYear &&
          dateObj.date() === currentDate.add(1, "day").date()
        ) {
          date = "Tomorrow";
        } else if (
          isCurrentMonth &&
          isCurrentYear &&
          dateObj.date() === currentDate.subtract(1, "day").date()
        ) {
          date = "Yesterday";
        } else {
          date = dateObj.format("MMMM D, YYYY");
        }

        let dayAppointments = appointments.get(date) ?? [];
        dayAppointments.push(appointment);

        appointments.set(date, dayAppointments);
      });
      setDatedAppointments(appointments);
    }
  }, [appointmentsData?.appointment]);

  if (studentAppts.loading || tutorAppts.loading) return <LoadingPage />;
  if (studentAppts.error || tutorAppts.error)
    return `${studentAppts.error ?? tutorAppts.error}`;

  return (
    <Grid container mt={6} px={6} pb={6}>
      <Grid
        container
        item
        xs={12}
        justifyContent={"center"}
        alignItems={"center"}
        rowSpacing={5}
      >
        <Grid item xs={12}>
          {appointmentsData?.appointment?.length === 0 ? (
            <Typography>You have no appointments yet</Typography>
          ) : (
            <Button
              onClick={() => {
                setIsAscending(!isAscending);
              }}
            >
              {isAscending ? "View Latest" : "View Earliest"}
            </Button>
          )}
        </Grid>
        {[...datedAppointments].map(([date, appointments], i) => {
          return (
            <Fragment key={i}>
              <Grid item xs={12}>
                <Typography variant="h5">{date}</Typography>
              </Grid>
              <Grid item container columnSpacing={2} rowSpacing={2}>
                {appointments.map((appointment, j) => {
                  return (
                    <Grid item md={4} sm={6} xs={12} key={j}>
                      <AppointmentCard
                        appointment={appointment}
                        isStudent={isStudent}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Fragment>
          );
        })}
      </Grid>
    </Grid>
  );
}
