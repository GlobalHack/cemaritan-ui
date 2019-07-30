import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'

import NavBar from './components/NavBar'
import Router from './components/Router'
import { AuthProvider } from './context/AuthContext'
import { UserProvider } from './context/UserContext'

const App = () => {

  return (
    <AuthProvider>
      <UserProvider>
        <BrowserRouter>
          <div>
            <NavBar />
            <div className="page-wrapper">
              <Router />
            </div>
          </div>
        </BrowserRouter>
      </UserProvider>
    </AuthProvider>
  )
}

export default App
