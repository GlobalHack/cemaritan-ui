import React from 'react'
import { withRouter } from 'react-router-dom'
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app'
import 'firebase/auth'

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

class Login extends React.Component {
  launchAuthentication = () => {
    const provider = new firebase.auth.GoogleAuthProvider()

    firebase.auth().signInWithPopup(provider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken
        // The signed-in user info.
        const user = result.user
        console.log('SUCCESS!', this.props)
        return this.props.handleAuthentication(user)
      .then((res) => {
        console.log('res', res)
        this.props.history.push('/')
      })
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

  render () {
    console.log('PROPS', this.props)
    return (
      <button onClick={this.launchAuthentication}>gotta authenticate, yo!</button>
    )
  }
}

export default withRouter(Login)
