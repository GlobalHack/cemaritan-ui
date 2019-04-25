import styled from 'styled-components'

export const NavContainer = styled.div`
  position: fixed;
  background: #eeeeee;
  height: 50px;
  text-align: center;
  width: 100%;
  z-index: 99;
`
export const NavItem = styled.div`
  display: inline-block;
  position: relative;
  font-size: 20px;
  padding: 0px 20px;
  color: black;
  height: 50px;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
  background: #eeeeee;
  :hover {
    background: #e2e2e2;
  }
`

export const DropDown = styled.div`
  position: absolute;
  z-index: -1;
  background: #e2e2e2;
  min-height: 20px;
  min-width: 120px;
  width: 100%;
  top: -150px;
  left: 0;
  transition: all .3s;
  ${NavItem}:hover & {
    top: 50px;
  }
`

export const DropDownItem = styled.div`
  background: #e2e2e2;
  color: black;
  :hover {
    background: #eeeeee;
  }
`
