import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onAuthStateChanged } from "@firebase/auth";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { auth } from "./firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState();
  const userType = useRef();

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

  const observerCallback = useCallback(
    async (firebaseUser) => {
      if (firebaseUser?.uid) {
        localStorage.setItem("li", "true");
        setPending(true);

        let token = await getToken(firebaseUser);
        let authorization = `Bearer ${token}`;
        const queryResult = await axios({
          url: process.env.REACT_APP_HASURA_ENDPOINT,
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorization,
          },
          data: {
            query: `
              query GetUserType($user_id: String!) {
                user_by_pk(user_id: $user_id) {
                  tutor {
                    tutor_id
                  }
                  student {
                    student_id
                  }
                }
              }
            `,
            variables: {
              user_id: firebaseUser.uid,
            },
          },
        });
        if (queryResult.data.errors) {
          console.log("handle error, ", queryResult.data.errors);
        } else {
          let type;
          if (queryResult.data.data.user_by_pk?.tutor?.tutor_id) {
            type = "tutor";
          } else if (queryResult.data.data.user_by_pk?.student?.student_id) {
            type = "student";
          }
          userType.current = type;
        }

        setPending(false);
        setCurrentUser(firebaseUser);
      } else {
        setCurrentUser(null);
        userType.current = null;
      }
    },
    [getToken]
  );

  useEffect(() => {
    onAuthStateChanged(auth, observerCallback);
  }, [observerCallback]);

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
        userType,
        pending,
      }}
    >
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </AuthContext.Provider>
  );
};
