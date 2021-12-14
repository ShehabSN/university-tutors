import { AccountCircle, Event, School } from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LogoutIcon from "@mui/icons-material/Logout";
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
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import Appointments from "../appointments/Appointments";
import Offerings from "./Offerings";
import Profile from "./Profile";

export default function StudentDashboard({ page }) {
  const navigate = useNavigate();
  const drawerWidth = 240;

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

  const theme = useTheme();
  const fullDrawer = useMediaQuery(theme.breakpoints.up('sm'));

  const [open, setOpen] = React.useState(true);
  const [anchor, setAnchor] = React.useState(null);

  const toggleDrawer = (event) => {
    if (fullDrawer) {
      setOpen(!open);
    }
    else {
      setAnchor(anchor === null ? event.currentTarget : null);
    }
  };

  const drawerItems = [
    ['Appointments', <Event />],
    ['Offerings', <School />],
    ['Profile', <AccountCircle />],
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="absolute" open={fullDrawer && open}>
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
              ...(fullDrawer && open && { display: "none" }),
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
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          ...(!fullDrawer && { display: "none" }),
        }}
      >
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
          {drawerItems.map(([name, icon], i) => {
            return <ListItem
              key={i}
              selected={page === name}
              button
              onClick={() => {
                navigate(`/${name.toLowerCase()}`, { replace: true });
              }}
            >
              <ListItemIcon>
                {icon}
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>;
          })}
          <Divider />
          <ListItem
            button
            onClick={() => {
              auth.signOut();
              localStorage.removeItem("li");
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItem>
        </List>
      </Drawer>
      <Menu
        anchorEl={anchor}
        open={!fullDrawer && anchor !== null}
        onClose={() => setAnchor(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {drawerItems.map(([name, icon], i) => {
          return <MenuItem
            key={i}
            selected={page === name}
            onClick={() => {
              navigate(`/${name.toLowerCase()}`, { replace: true });
              setAnchor(null);
            }}
          >
            <ListItemIcon>
              {icon}
            </ListItemIcon>
            {name}
          </MenuItem>;
        })}
        <Divider />
        <MenuItem
          onClick={() => {
            auth.signOut();
            localStorage.removeItem("li");
          }}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          Log Out
        </MenuItem>
      </Menu>
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
        ) : page === "Offerings" ? (
          <Offerings />
        ) : (
          <Profile />
        )}
      </Box>
    </Box>
  );
}
