import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./Auth";
import LoadingPage from "./views/LoadingPage";

export default function RequireAuth({ children }) {
  let { currentUser, userType } = useContext(AuthContext);
  let location = useLocation();

  if (localStorage.getItem("li") && !currentUser) {
    return <LoadingPage />;
  } else if (!currentUser) {
    return <Navigate to="/signin" state={{ from: location }} />;
  } else if (userType.current && location.pathname === "/onboarding") {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}
