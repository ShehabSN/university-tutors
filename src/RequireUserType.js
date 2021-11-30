import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./Auth";

export default function RequireUserType({ children }) {
  let { userType, pending } = useContext(AuthContext);

  if (pending) {
    return <p>Loading</p>;
  } else if (!userType.current) {
    return <Navigate to="/onboarding" />;
  } else {
    return children;
  }
}
