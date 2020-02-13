import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
import "firebase/auth";
// import { resolve } from 'dns';

import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import fetcher from "../utils/fetcher";
import useStoreState from "../hooks/useStoreState";
import useStoreDispatch from "../hooks/useStoreDispatch";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const Login = props => {
  const state = useStoreState();
  const dispatch = useStoreDispatch();

  const [logInStatus, setLogInStatus] = useState();
  const [error, setError] = useState(null);

  // first need auth to fetch user
  useEffect(() => {
    if (state.auth) {
      fetcher("/user", state.auth)
        .then(user => {
          setLogInStatus("success");

          // set user in global context
          dispatch({
            type: "SET_USER",
            user
          });
          return;
        })
        // do I need this?
        .then(() => {
          props.history.push("/");
        })
        .catch(err => {
          setError(
            "We could not find your user information. Please try again or notify your admin."
          );
          setLogInStatus("error");
        });
    }
  }, [state.auth]);

  const launchAuthentication = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    setLogInStatus("pending");

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        // The signed-in user info.
        const user = result.user;

        // The value to send with all api requests
        user
          .getIdToken()
          .then(userToken => {
            // set global auth context
            if (!userToken) {
              throw Error("failed to get user token");
            }
            dispatch({
              type: "SET_AUTH",
              authToken: userToken
            });
          })
          .catch(err => console.log(err));
      })
      .catch(error => {
        const errorMessage = error.message;
        // const errorCode = error.code;
        // const email = error.email; // The email of the user's account used.
        // const credential = error.credential; // The firebase.auth.AuthCredential type that was used.
        setError(`Firebase auth fail: ${errorMessage}`);
        setLogInStatus("error");
      });
  };

  const stillLoading = Boolean(
    logInStatus === "pending" || (state.auth && !error)
  );

  return (
    <div className="text-center">
      <h2>Welcome to Cemaritan!</h2>
      <p>Please login to get started.</p>
      <Button
        variant="primary"
        disabled={stillLoading}
        onClick={launchAuthentication}
      >
        {stillLoading ? (
          <span>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Logging In
          </span>
        ) : (
          <span>Login with Gmail</span>
        )}
      </Button>
      {error && <div variant="error">{error}</div>}
    </div>
  );
};

export default withRouter(Login);
