import React, { useContext, useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app'
import 'firebase/auth'
// import { resolve } from 'dns';

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { AuthContext } from '../context/AuthContext'
import { UserContext } from '../context/UserContext'
import fetch from '../utils/fetcher'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const Login = (props) => {
  const { auth, setAuth } = useContext(AuthContext);
  const { setUser } = useContext(UserContext);
  const [logInStatus, setLogInStatus] = useState();

  // only call useEffect if auth changes...
  useEffect(
    () => {
      if (auth) {
        fetch('user', null, null, auth).then(res => {
          if (res) {
            // set user in global context
            setUser(res)
            setLogInStatus('success')
            return;
          }
        }).then(() => {
          props.history.push('/')
        });
      }
    },
    [auth]
  )

  const launchAuthentication = () => {
    const provider = new firebase.auth.GoogleAuthProvider()

    setLogInStatus('pending');

    firebase.auth().signInWithPopup(provider)
      .then(result => {
        // The signed-in user info.
        const user = result.user

        // The value to send with all api requests
        user.getIdToken().then(userToken => {
          // set global auth context
          setAuth(userToken)
        }).catch(err => console.log(err))
        
      }).catch(error => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.email
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential
        // ...
      })
  }

  const stillLoading = Boolean(logInStatus === 'pending' || auth)

  return (
    <div className="text-center">
      <h2>Welcome to Cemaritan!</h2>
      <p>Please login to get started.</p>
      <Button
        variant="primary"
        disabled={stillLoading}
        onClick={launchAuthentication}
      >
        { stillLoading ? (
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
      
    </div>
  )
}

export default withRouter(Login)
