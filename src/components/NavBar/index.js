import React from "react";
import { withRouter } from "react-router-dom";
import logo from "../../assets/cem.png";
import {
  DropDown,
  DropDownItem,
  DropDownItemDisabled,
  NavContainer,
  NavItem,
  NavLogo,
  LogoImg,
  LogoTxt,
} from "./styled";
import useStoreState from "../../hooks/useStoreState";

const NavLinks = (props) => {
  const { user } = useStoreState();

  if (user) {
    return (
      <div>
        <NavItem onClick={props.redirect("/")}>Home</NavItem>
        <NavItem>
          Transfers
          <DropDown>
            <DropDownItem onClick={props.redirect("/transfers/create")}>
              Create
            </DropDownItem>
            <DropDownItem onClick={props.redirect("/transfers")}>
              View
            </DropDownItem>
            <DropDownItem onClick={props.redirect("/transfers/upload")}>
              Upload
            </DropDownItem>
          </DropDown>
        </NavItem>
        <NavItem>
          Connections
          <DropDown>
            <DropDownItemDisabled>Create</DropDownItemDisabled>
            <DropDownItem onClick={props.redirect("/connections")}>
              View
            </DropDownItem>
            <DropDownItem
              onClick={props.redirect("/connections/data-mappings")}
            >
              Data Mappings
            </DropDownItem>
          </DropDown>
        </NavItem>
        <NavItem onClick={props.redirect("/history")}>History</NavItem>
        <NavItem onClick={props.redirect("/downloads")}>Downloads</NavItem>
      </div>
    );
  }
  return <div></div>;
};

class NavBar extends React.Component {
  constructor() {
    super();

    this.redirect = this.redirect.bind(this);
  }

  redirect = (route) => () => {
    this.props.history.push(route);
  };

  render() {
    return (
      <NavContainer>
        <NavLogo onClick={this.redirect("/")}>
          <LogoImg src={logo} alt="Cemaritan Logo" />
          <LogoTxt>Cemaritan</LogoTxt>
        </NavLogo>
        <NavLinks redirect={this.redirect} />
      </NavContainer>
    );
  }
}

export default withRouter(NavBar);
