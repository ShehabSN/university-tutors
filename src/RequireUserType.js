import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./Auth";

export default function RequireUserType({ children }) {
  let { userType, pending } = useContext(AuthContext);

  if (pending) {
    console.log("pending");
    return <p>Loading</p>;
  } else if (!userType.current) {
    console.log("in else if");
    return <Navigate to="/onboarding" />;
  } else {
    return children;
  }
}
