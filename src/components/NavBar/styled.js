import styled from "styled-components";

export const NavContainer = styled.div`
  position: fixed;
  background: #eeeeee;
  text-align: center;
  width: 100%;
  height: 50px;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 5px -1px rgba(0, 0, 0, 0.25);
`;

export const NavItem = styled.div`
  display: inline-block;
  position: relative;
  font-size: 20px;
  padding: 0px 20px;
  color: black;
  line-height: 50px;
  cursor: pointer;
  background: #eeeeee;
  :hover {
    background: #e2e2e2;
  }
`;

export const NavLogo = styled.div`
  display: flex;
  margin-left: 20px;
  cursor: pointer;
  align-items: center;
`;

export const LogoImg = styled.img`
  display: inline-block;
  position: relative;
  height: 40px;
  margin-right: 0.3rem;
`;

export const LogoTxt = styled.h1`
  margin: 0;
  font-size: 1.8rem;
`;

export const DropDown = styled.div`
  position: absolute;
  z-index: -1;
  background: #e2e2e2;
  min-height: 20px;
  min-width: 120px;
  width: 100%;
  top: -150px;
  left: 0;
  transition: all 0.3s;
  ${NavItem}:hover & {
    top: 50px;
  }
`;

export const DropDownItem = styled.div`
  background: #e2e2e2;
  color: black;
  :hover {
    background: #eeeeee;
  }
`;

export const DropDownItemDisabled = styled.div`
  background: #e2e2e2;
  color: black;
  :hover {
    background: #eeeeee;
    cursor: not-allowed;
  }
`;
