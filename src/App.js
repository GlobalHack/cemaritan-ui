import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import Router from './components/Router'

import fetcher from './utils/fetcher'

class App extends Component {
  constructor () {
    super()

    this.state = {
      isAuthenticated: false, // TODO default this to false
      userIdToken: null,
      user: null
    }

    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  handleAuthentication = userIdToken => {
    console.log('handleAuthentication')
    this.getUser(userIdToken);
    return new Promise((resolve, reject) => {
      this.setState({ isAuthenticated: true}, () => resolve())
    })
  }

  getUser = (userIdToken) => {
    this.setState({userIdToken});

    // fetch user from db here...
    fetcher('user', null, null, userIdToken).then(data => {
      console.log('successful user request');
      console.log(data);
    })
  }

  render () {
    const { isAuthenticated } = this.state

    return (
      <BrowserRouter>
        <div>
          {isAuthenticated ? <NavBar /> : null}
          <div className="page-wrapper">
            <Router
              isAuthenticated={isAuthenticated}
              handleAuthentication={this.handleAuthentication} />
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
