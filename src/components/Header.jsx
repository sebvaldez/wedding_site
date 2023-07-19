import { NavLink } from 'react-router-dom'
import styled from 'styled-components';

const Navbar = styled.nav`
  // border: red 2px solid;
  height: 5rem;
  padding: 0 2rem 0 2rem;
  margin: 0 auto;
  margin-top: 2rem;
  margin-bottom: .5rem;
  display: flex;
  justify-content: space-between;
  align-item: center;
`

const NavBrand = styled.div`
  padding: .2rem;
  display:flex;
  margin-left: 3rem;
  align-items: center;
  justify-content: center;
`
const activeClassName = 'nav-item-active';

const StyledNavLink = styled(NavLink).attrs({ activeClassName })`
  &.${activeClassName} {
    color: #ff6347;
    font-weight: bold;
  }

  &.${activeClassName} {
    text-decoration: underline !important; // Increased specificity
  }
  font-family: 'Montserrat', sans-serif; /* Use the font here */
  color: #000000;
  text-decoration: none;
  margin: 0 1rem;
`;

const Box = styled.div`
  // border: blue 3px solid;
  display: flex;
  flex-grow: .3;
  padding: 0px 0.2rem;
  align-items: center;
  justify-content: space-evenly;
`

const H1 = styled.h1`
  font-family: 'Montserrat', sans-serif; /* Use the font here */
  font-weight: 400;
  font-size: 2rem;
`

const LargeButtonLink = styled(NavLink).attrs({ activeClassName })`
  background: transparent;
  border-style: solid;
  border-radius: 0;
  font-size: calc((1.1 - 1) * 1.2vw + 1rem);
  padding: 1.3rem 2.171rem;
  text-decoration: none;
  cursor: pointer;

  &.${activeClassName} {
    color: #ff6347;
    font-weight: bold;
    text-decoration: underline !important; // Increased specificity
  }

  color: #000000;
`;

const Header = () => {
  return (
    <Navbar>
      <NavBrand>
        <H1>Allegra &amp; Sebastian Wedding</H1>
      </NavBrand>
      <Box>
        <StyledNavLink to='/'>Wedding</StyledNavLink>
        <StyledNavLink to='/travel'>Travel</StyledNavLink>
        <StyledNavLink to='/registry'>Registry</StyledNavLink>
        <StyledNavLink to='/gallery'>Gallery</StyledNavLink>
      </Box>
      <LargeButtonLink to='/rsvp'>RSVP</LargeButtonLink>
    </Navbar>
  )
}

export default Header;
