import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import * as React from "react";
import Title from "./Title";

export default function OfferingTile({ offering, onSelect }) {
  return <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
    <Title>
      {`${offering.course.courseId} ${offering.course.name}`}
    </Title>
    <Stack
      direction="row"
      spacing={2}
      divider={<Divider orientation="vertical" flexItem />}
    >
      <Box mt={1} flexGrow={1} >
        <Typography variant="h6">
          {`${offering.tutor.name} - $${offering.tutor.hourlyRate}/hr`}
        </Typography>
        <Typography variant="body1">
          {offering.tutor.bio}
        </Typography>
      </Box>
      {offering.gradeReceived
        ? <Stack alignItems="center">
          <Typography variant="h5">
            {offering.gradeReceived}
          </Typography>
          <Typography variant="caption">
            {offering.yearTaken}
          </Typography>
          <Typography variant="caption">
            {offering.professorName}
          </Typography>
        </Stack>
        : null}
    </Stack>
    <Box mt={2} display="flex" justifyContent="flex-start">
      <Button
        variant="contained"
        onClick={() => onSelect(offering)}
      >
        Book This Tutor
      </Button>
    </Box>
  </Paper>;
}