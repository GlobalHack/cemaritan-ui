import React from 'react'
import { withRouter } from 'react-router-dom'
import { DropDown, DropDownItem, DropDownItemDisabled, NavContainer, NavItem } from './styled'

class NavBar extends React.Component {
  redirect = route => {
    this.props.history.push(route)
  }

  render () {
    return (
      <NavContainer>
        <NavItem onClick={this.redirect.bind(this, '/')}>Home</NavItem>
        <NavItem>
          Transfers
          <DropDown>
            <DropDownItem onClick={this.redirect.bind(this, '/transfers/create')}>Create</DropDownItem>
            <DropDownItem onClick={this.redirect.bind(this, '/transfers/view')}>View</DropDownItem>
            <DropDownItem onClick={this.redirect.bind(this, '/transfers/upload')}>Upload</DropDownItem>
          </DropDown>
        </NavItem>
        <NavItem>
          Connections
          <DropDown>
            <DropDownItemDisabled>Create</DropDownItemDisabled>
            <DropDownItem onClick={this.redirect.bind(this, '/connections/view')}>View</DropDownItem>
            <DropDownItem onClick={this.redirect.bind(this, '/connections/data-mappings')}>Data Mappings</DropDownItem>
          </DropDown>
        </NavItem>
        <NavItem onClick={this.redirect.bind(this, '/history')}>History</NavItem>
        <NavItem onClick={this.redirect.bind(this, '/downloads')}>Downloads</NavItem>
      </NavContainer>
    )
  }
}

export default withRouter(NavBar)
