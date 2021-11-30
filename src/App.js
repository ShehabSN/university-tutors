import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import SignUp from "./views/SignUp";
import SignIn from "./views/SignIn";
import Dashboard from "./views/dashboard/Dashboard";
import { AuthProvider } from "./Auth";
import Onboarding from "./views/Onboarding";
import RequireAuth from "./RequireAuth";
import RedirectRoute from "./RedirectRoute";
import RequireUserType from "./RequireUserType";
function App() {
  return (
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
  );
}

export default App;
