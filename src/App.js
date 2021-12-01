import { blue } from '@mui/material/colors';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./Auth";
import RedirectRoute from "./RedirectRoute";
import RequireAuth from "./RequireAuth";
import RequireUserType from "./RequireUserType";
import Dashboard from "./views/dashboard/Dashboard";
import Onboarding from "./views/Onboarding";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
  },
});

export default function App() {
  return <ThemeProvider theme={theme}>
    <AuthProvider>
      <HashRouter>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <RequireUserType>
                  <Dashboard page={"Appointments"} />
                </RequireUserType>
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <RequireUserType>
                  <Dashboard page={"Profile"} />
                </RequireUserType>
              </RequireAuth>
            }
          />
          <Route
            path="/appointments"
            element={
              <RequireAuth>
                <RequireUserType>
                  <Dashboard page={"Appointments"} />
                </RequireUserType>
              </RequireAuth>
            }
          />
          <Route
            path="/requests"
            element={
              <RequireAuth>
                <RequireUserType>
                  <Dashboard page={"Requests"} />
                </RequireUserType>
              </RequireAuth>
            }
          />
          <Route
            path="/reviews"
            element={
              <RequireAuth>
                <RequireUserType>
                  <Dashboard page={"Reviews"} />
                </RequireUserType>
              </RequireAuth>
            }
          />
          <Route
            path="/availability"
            element={
              <RequireAuth>
                <RequireUserType>
                  <Dashboard page={"Availability"} />
                </RequireUserType>
              </RequireAuth>
            }
          />
          <Route
            path="/offerings"
            element={
              <RequireAuth>
                <RequireUserType>
                  <Dashboard page={"Offerings"} />
                </RequireUserType>
              </RequireAuth>
            }
          />
          <Route
            path="signup"
            element={
              <RedirectRoute>
                <SignUp />
              </RedirectRoute>
            }
          />
          <Route
            path="signin"
            element={
              <RedirectRoute>
                <SignIn />
              </RedirectRoute>
            }
          />
          <Route
            path="/onboarding"
            element={
              <RequireAuth>
                <Onboarding />
              </RequireAuth>
            }
          />
          {/* Redirects */}
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  </ThemeProvider>;
}
