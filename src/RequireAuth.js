import React, { useContext, useState } from "react";
import { AuthContext } from "./Auth";
import { useLocation, Navigate } from "react-router-dom";
import { GET_USER_TYPE } from "./graphql/queries";
import { useLazyQuery } from "@apollo/client";

export default function RequireAuth({ children }) {
  let { currentUser } = useContext(AuthContext);
  let location = useLocation();

  //   const [getUserType, { data, loading }] = useLazyQuery(GET_USER_TYPE, {
  //     variables: {
  //       user_id: currentUser?.uid,
  //     },
  //   });

  if (localStorage.getItem("li") && !!!currentUser?.uid) {
    console.log("pending");
    return <p>Loading</p>;
  } else if (!!!currentUser?.uid) {
    console.log("no current user");
    return <Navigate to="/signin" state={{ from: location }} />;
  } else {
    return children;
  }
}
