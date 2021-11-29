import React, { useState, useEffect, useCallback } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "@firebase/auth";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import axios from "axios";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  let [currentUser, setCurrentUser] = useState(null);
  let [pending, setPending] = useState(false);

  const getToken = useCallback(async (user) => {
    if (user) {
      let result = await user.getIdTokenResult();

      if (result.claims["https://hasura.io/jwt/claims"]) {
        return result.token;
      } else {
        let newTokenRes = await axios.get(
          `${process.env.REACT_APP_REFRESH_FUNCTION_URL}?uid=${auth.currentUser.uid}`
        );
        if (newTokenRes?.status === 200) {
          let newToken = await auth.currentUser.getIdToken(true);
          return newToken;
        } else {
          return null;
        }
      }
    }
  }, []);

  const observerCallback = (firebaseUser) => {
    if (firebaseUser?.uid) {
      setPending(true);
      setCurrentUser(firebaseUser);
    } else {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, observerCallback);
  }, []);

  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_HASURA_ENDPOINT,
  });

  const authLink = setContext(async (_, { headers }) => {
    let token = await getToken(currentUser);
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const createApolloClient = () => {
    return new ApolloClient({
      connectToDevTools: true,
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  };

  const client = createApolloClient();
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        pending,
      }}
    >
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </AuthContext.Provider>
  );
};
