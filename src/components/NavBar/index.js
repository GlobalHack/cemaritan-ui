import React from "react";
import { useHistory } from "react-router-dom";
import logo from "../../assets/cem.png";
import { NavContainer, NavItem, NavLogo, LogoImg, LogoTxt } from "./styled";
import useStoreState from "../../hooks/useStoreState";

const NavLinks = () => {
  const { user } = useStoreState();

  if (user) {
    return (
      <div>
        <NavItem to="/transfers">Transfers</NavItem>
        <NavItem to="/connections">Connections</NavItem>
        <NavItem to="/data-mappings">Data Mappings</NavItem>
        <NavItem to="/downloads">Downloads</NavItem>
        {/* Disabled HISTORY */}
        {/*<NavItem to="/history">History</NavItem>*/}
      </div>
    );
  }
  return <div></div>;
};

const NavBar = () => {
  const history = useHistory();
  return (
    <NavContainer>
      <NavLogo onClick={() => history.push("/")}>
        <LogoImg src={logo} alt="Cemaritan Logo" />
        <LogoTxt>Cemaritan</LogoTxt>
      </NavLogo>
      <NavLinks />
    </NavContainer>
  );
};

export default NavBar;
