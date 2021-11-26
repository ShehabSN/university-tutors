import "./App.css";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./views/SignUp";
import SignIn from "./views/SignIn";
import Dashboard from "./views/dashboard/Dashboard";

function App() {
  return (
    <HashRouter>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route
          path="/tutor/"
          element={<Navigate to="/tutor/appointments" />}
        />
        <Route
          path="/tutor/profile"
          element={<Dashboard role={"tutor"} page={"Profile"} />}
        />
        <Route
          path="/tutor/appointments"
          element={<Dashboard role={"tutor"} page={"Appointments"} />}
        />
        <Route
          path="/tutor/requests"
          element={<Dashboard role={"tutor"} page={"Requests"} />}
        />
        <Route
          path="/tutor/reviews"
          element={<Dashboard role={"tutor"} page={"Reviews"} />}
        />
        <Route
          path="/tutor/availability"
          element={<Dashboard role={"tutor"} page={"Availability"} />}
        />
        <Route
          path="/student/"
          element={<Navigate to="/student/appointments" />}
        />
        <Route
          path="/student/profile"
          element={<Dashboard role={"student"} page={"Profile"} />}
        />
        <Route
          path="/student/appointments"
          element={<Dashboard role={"student"} page={"Appointments"} />}
        />
        <Route
          path="/student/offerings"
          element={<Dashboard role={"student"} page={"Offerings"} />}
        />
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        {/* Redirects */}
        <Route path="/tutor/*" element={<Navigate to="/tutor" />} />
        <Route path="/student/*" element={<Navigate to="/student" />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
