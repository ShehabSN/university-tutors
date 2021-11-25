import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./views/SignUp";
import SignIn from "./views/SignIn";
import Dashboard from "./views/dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <Routes>
        <Route
          path="/tutor/"
          element={<Dashboard role={"tutor"} page={"Appointments"} />}
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
          path="/tutor/schedule"
          element={<Dashboard role={"tutor"} page={"Schedule"} />}
        />
        <Route
          path="/student/"
          element={<Dashboard role={"student"} page={"Appointments"} />}
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
