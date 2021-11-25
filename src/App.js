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
        <Route path="/" element={<Dashboard />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
