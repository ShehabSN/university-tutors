import { AccountCircle, Paid, School } from "@mui/icons-material";
import { Box, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import * as React from "react";
import Title from "./Title";

export default function OfferingTile({ offering, children }) {
  return <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
    <Title>
      {`${offering.course.courseId} ${offering.course.name}`}
    </Title>
    <Stack
      direction="row"
      spacing={2}
      divider={<Divider orientation="vertical" flexItem />}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <AccountCircle fontSize="small" />
            <Typography variant="h6">
              {offering.tutor.name}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Paid fontSize="small" />
            <Typography variant="h6">
              {`$${offering.tutor.hourlyRate}/hr`}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body1">
              {offering.tutor.bio}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      {offering.gradeReceived
        ? <Stack alignItems="center">
          <School/>
          <Typography variant="h5">
            {offering.gradeReceived}
          </Typography>
          <Typography variant="caption" noWrap>
            {offering.yearTaken}
          </Typography>
          <Typography variant="caption" noWrap>
            {offering.professorName}
          </Typography>
        </Stack>
        : null}
    </Stack>
    {children}
  </Paper>;
}