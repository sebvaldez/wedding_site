import { Link } from 'react-router-dom'
import styled from 'styled-components';

const Navbar = styled.nav`
  // border: red 2px solid;
  height: 5rem;
  padding: 0 2rem 0 2rem;
  margin: 0 auto;
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

const Box = styled.div`
  // border: blue 3px solid;
  display: flex;
  flex-grow: .3;
  padding: 0px 0.2rem;
  align-items: center;
  justify-content: space-evenly;
`

const H1 = styled.h1`
  font-weight: 400;
  font-size: 2rem;
`

const LargeButton = styled.button`
  background: transparent;
  border-style: solid;
  border-radius: 0;
  font-size: calc((1.1 - 1) * 1.2vw + 1rem);
  padding: 1.3rem 2.171rem;
  a {
    style: none;
    cursor: pointer;
  }
`

const Header = () => {
  return (
    <Navbar>
      <NavBrand>
        <H1>Allegra & Sebastian Wedding 2024</H1>
      </NavBrand>
      <Box>
        <Link to='/'>Wedding</Link>
        <Link to='/travel'>Travel</Link>
        <Link to='/registry'>Registry</Link>
      </Box>
      <LargeButton>
        <Link to='/rsvp'>RSVP</Link>
      </LargeButton>
    </Navbar>
  )
}

export default Header;
