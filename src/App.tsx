import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import NavBar from './components/NavBar'
import Router from './components/Router'

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Router />
      </div>
    )
  }
}

export default App
