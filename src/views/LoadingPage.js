import { Box, CircularProgress } from "@mui/material";
import * as React from "react";

export default function LoadingPage() {
  return <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    width="100%"
    height="100vh"
  >
    <CircularProgress />
  </Box>;
}