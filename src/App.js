import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import Router from './components/Router'

class App extends Component {
  constructor () {
    super()

    this.state = {
      isAuthenticated: true, // TODO default this to false
      user: null
    }
  }

  handleAuthentication = user => {
    console.log('handleAuthentication')
    return new Promise((resolve, reject) => {
      this.setState({ isAuthenticated: true, user }, () => resolve())
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
