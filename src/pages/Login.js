import React from 'react'
import { withRouter } from 'react-router-dom'
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app'
import 'firebase/auth'

// TODO: figure out solution for api keys
const firebaseConfig = {
  apiKey: "bad",
  authDomain: "bad",
  databaseURL: "bad",
  projectId: "bad",
  storageBucket: "bad",
  messagingSenderId: "bad"
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
