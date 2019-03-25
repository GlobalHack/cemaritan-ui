import React from 'react'
import { withRouter } from 'react-router-dom'
import { NavContainer, NavItem } from './styled'

class NavBar extends React.Component {
  redirect = route => {
    this.props.history.push(route)
  }

  render () {
    return (
      <NavContainer>
        <NavItem onClick={this.redirect.bind(this, '/')}>Home</NavItem>
        <NavItem onClick={this.redirect.bind(this, '/transfers')}>Transfers</NavItem>
        <NavItem onClick={this.redirect.bind(this, '/connections')}>Connections</NavItem>
        <NavItem onClick={this.redirect.bind(this, '/history')}>History</NavItem>
        <NavItem onClick={this.redirect.bind(this, '/downloads')}>Downloads</NavItem>
      </NavContainer>
    )
  }
}

export default withRouter(NavBar)
