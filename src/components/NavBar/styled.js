import styled from 'styled-components'

export const NavContainer = styled.div`
  position: fixed;
  background: #eeeeee;
  height: 50px;
  text-align: center;
  width: 100%;
`
export const NavItem = styled.div`
  display: inline-block;
  font-size: 20px;
  padding: 0px 20px;
  color: black;
  height: 50px;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
  :hover {
    background: #e2e2e2;
  }
`
