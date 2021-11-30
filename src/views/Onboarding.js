import * as React from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import { INSERT_TUTOR, INSERT_STUDENT } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import { AuthContext } from "../Auth";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
  const navigate = useNavigate();
  const { currentUser, userType } = React.useContext(AuthContext);
  const [insertTutor] = useMutation(INSERT_TUTOR, {
    variables: {
      tutor_id: currentUser.uid,
    },
    onCompleted: () => {
      userType.current = "tutor";
      navigate(`/profile`);
    },
  });
  const [insertStudent] = useMutation(INSERT_STUDENT, {
    variables: {
      student_id: currentUser.uid,
    },
    onCompleted: () => {
      userType.current = "student";
      navigate(`/offerings`);
    },
  });

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <Stack spacing={4}>
        <Typography>What do you plan on doing on this platform?</Typography>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Card onClick={insertTutor}>
              <CardActionArea>
                <CardContent>
                  <Typography>Teaching</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item>
            <Card onClick={insertStudent}>
              <CardActionArea>
                <CardContent>
                  <Typography>Learning</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
