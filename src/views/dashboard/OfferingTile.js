import { AccountCircle, Paid, School } from "@mui/icons-material";
import { Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import * as React from "react";
import Title from "./Title";

export default function OfferingTile({ offering, children }) {
  return <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
    <Title>
      {`${offering.course.course_id} ${offering.course.name}`}
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
              {offering.tutor.user.name}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Paid fontSize="small" />
            <Typography variant="h6">
              {`$${offering.tutor.hourly_rate}/hr`}
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
      {offering.grade_received
        ? <Stack alignItems="center" justifyContent="center" minWidth={60}>
          <School/>
          <Typography variant="h5">
            {offering.grade_received}
          </Typography>
          <Typography variant="caption" noWrap>
            {offering.year_taken}
          </Typography>
          <Typography variant="caption" noWrap>
            {offering.professor_name}
          </Typography>
        </Stack>
        : null}
    </Stack>
    {children}
  </Paper>;
}