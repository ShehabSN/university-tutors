import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./Auth";
import LoadingPage from "./views/LoadingPage";

export default function RedirectRoute({ children }) {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();

  if (localStorage.getItem("li") && !currentUser) {
    return <LoadingPage />;
  } else if (currentUser && currentUser.uid) {
    return <Navigate to={location.state?.from ?? "/"} />;
  } else {
    return children;
  }
}
