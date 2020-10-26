import React from "react";
import { useHistory, Link } from "react-router-dom";
import logo from "../../assets/cem.png";
import { Navbar, Nav } from "react-bootstrap";
import { NavLogo, LogoImg, LogoTxt } from "./styled";
import useStoreState from "../../hooks/useStoreState";

const NavBar = () => {
  const history = useHistory();
  const { user } = useStoreState();
  return (
    <Navbar bg="light">
      <Navbar.Brand
        style={{ display: "inline" }}
        onClick={() => history.push("/")}
      >
        <NavLogo>
          <LogoImg src={logo} alt="Cemaritan Logo" />
          <LogoTxt>Cemaritan</LogoTxt>
        </NavLogo>
      </Navbar.Brand>
      {user && (
        <Nav>
          <Nav.Link as={Link} to="/transfers">
            Transfers
          </Nav.Link>
          <Nav.Link as={Link} to="/connections">
            Connections
          </Nav.Link>
          <Nav.Link as={Link} to="/data-mappings">
            Data Mappings
          </Nav.Link>
          <Nav.Link as={Link} to="/downloads">
            Downloads
          </Nav.Link>
          {/* Disabled HISTORY */}
          {/*<Nav.Link as={Link} to="/history">History</Nav.Link>*/}
        </Nav>
      )}
    </Navbar>
  );
};

export default NavBar;
