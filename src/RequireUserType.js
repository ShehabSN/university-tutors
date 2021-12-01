import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./Auth";
import LoadingPage from "./views/LoadingPage";

export default function RequireUserType({ children }) {
  let { userType, pending } = useContext(AuthContext);

  if (pending) {
    return <LoadingPage />;
  } else if (!userType.current) {
    return <Navigate to="/onboarding" />;
  } else {
    return children;
  }
}
