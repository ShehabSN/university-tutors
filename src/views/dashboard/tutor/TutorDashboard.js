import { AccountCircle, Event, HourglassFull, School, Star } from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import Appointments from "../Appointments";
import Availability from "./Availability";
import Profile from "./Profile";
import Requests from "./Requests";
import Reviews from "./Reviews";

export default function TutorDashboard({ page }) {
  const drawerWidth = 240;
  const navigate = useNavigate();
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
      ...(!open && {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(9),
        },
      }),
    },
  }));

  const mdTheme = createTheme();
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {page}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>
            <ListItem
              selected={page === "Appointments"}
              button
              onClick={() => {
                navigate("/tutor/appointments", { replace: true });
              }}
            >
              <ListItemIcon>
                <Event />
              </ListItemIcon>
              <ListItemText primary="Appointments" />
            </ListItem>
            <ListItem
              selected={page === "Profile"}
              button
              onClick={() => {
                navigate("/tutor/profile", { replace: true });
              }}
            >
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem
              selected={page === "Availability"}
              button
              onClick={() => {
                navigate("/tutor/availability", { replace: true });
              }}
            >
              <ListItemIcon>
                <HourglassFull />
              </ListItemIcon>
              <ListItemText primary="Availability" />
            </ListItem>
            <ListItem
              selected={page === "Reviews"}
              button
              onClick={() => {
                navigate("/tutor/reviews", { replace: true });
              }}
            >
              <ListItemIcon>
                <Star />
              </ListItemIcon>
              <ListItemText primary="Reviews" />
            </ListItem>
            <ListItem
              selected={page === "Requests"}
              button
              onClick={() => {
                navigate("/tutor/requests", { replace: true });
              }}
            >
              <ListItemIcon>
                <School />
              </ListItemIcon>
              <ListItemText primary="Requests" />
            </ListItem>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          {page === "Appointments" ? (
            <Appointments />
          ) : page === "Profile" ? (
            <Profile />
          ) : page === "Availability" ? (
            <Availability />
          ) : page === "Reviews" ? (
            <Reviews />
          ) : (
            <Requests />
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}