import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import Router from './components/Router'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <div className="page-wrapper">
            <Router />
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
