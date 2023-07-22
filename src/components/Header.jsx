import React, { useState, useRef, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

const Navbar = styled.div`
  @media (max-width: 768px) {
    padding: 0 1rem;  // reduce padding on mobile
  }
  display: flex;
  flex-grow: .5;
  height: 4rem;
  margin: 0 auto;


  margin-bottom: .5rem;
  position: relative; // This ensures the dropdown is positioned relative to the navbar
  padding: 0 2rem 0 2rem;
  justify-content: space-between;
  align-item: center;
`

const NavBrand = styled.div`
  @media (max-width: 768px) {
    margin-left: .5rem;  // reduce margin for mobile
  }
  padding: .2rem;
  display:flex;
  margin-left: 3rem;
  align-items: center;
  justify-content: center;
`
const StyledNavLink = styled(NavLink)`
  font-family: 'Montserrat', sans-serif; /* Use the font here */
  color: #000000;
  text-decoration: none;
  margin: 0 1rem;

  ${props => props.isActive && `
    color: #ff6347;
    font-weight: bold;
    text-decoration: underline;
  `}
`;

const H1 = styled.h1`
  @media (max-width: 768px) {
    font-size: 1rem;  // reduce font size for mobile
  }
  font-family: 'Montserrat', sans-serif; /* Use the font here */
  font-weight: 400;
  font-size: 2rem;
`
const LargeButtonLink = styled(NavLink)`
  @media (max-width: 375px) {
    font-size: calc((1.1 - 1) * 1.2vw + 0.8rem);
    padding: 1rem 1.5rem;
  }
  @media (max-width: 768px) {
    font-size: calc((1.1 - 1) * 1.2vw + 0.9rem);
    padding: 1.2rem 1.8rem;
  }
  background: transparent;
  border-style: solid;
  border-radius: 0;
  font-size: calc((1.1 - 1) * 1.2vw + 1rem);
  padding: 1.3rem 2.171rem;
  text-decoration: none;
  cursor: pointer;

  ${props => props.isActive ? `
    background-color: #FFF; // White background for active state
    color: #000;  // Black text
    border: 2px solid #000;  // Black border

    &:hover {  
      background-color: #000;  // Black background on hover for active state
      color: #FFF;  // White text on hover
    }
  ` : `
    background-color: #000;  // Black background for non-active state
    color: #FFF;  // White text
    border: 2px solid #000;  // Black border

    &:hover {  
      background-color: #FFF;  // White background on hover for non-active state
      color: #000;  // Black text on hover
    }
  `}
`;


const Hamburger = styled.div`
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  display: none;
  flex-direction: column;
  cursor: pointer;

  div {
    width: 2rem; // increased width slightly
    height: 0.25rem;
    background-color: black;
    margin: 0.2rem 0; // reduced margin to make the gap shorter
    // transition: all 0.3s eas~e;
  }
`;

const DropdownMenu = styled.div`
  display: flex; // default to flex
  align-items: center;
  justify-content: space-evenly;

  @media (max-width: 768px) {
    flex-direction: column; // stack the links vertically
    position: absolute;
    top: 100%;  // right below the header
    width: 200px; // or adjust as needed
    right: 0;
    background-color: white;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    
    & a {  // targeting links directly inside the DropdownMenu
      margin: 0.5rem 0;  // adding vertical margin to space out the links
    }

    &.open {
      display: flex;
    }
  }
`;


const AnimatedDropdownMenu = animated(DropdownMenu);

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navbarRef = useRef(null);

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 250,
  });

  const slideDown = useSpring({
    transform: menuOpen ? 'translateY(0)' : 'translateY(-100%)',
    visibility: menuOpen ? 'visible' : 'hidden',
  });


  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!navbarRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleLinkClick = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const handleHamburgerClick = () => {
    setMenuOpen(prevState => !prevState);
  }

  return (
    <animated.div style={fadeIn}>
      <Navbar ref={navbarRef}>
        <NavBrand>
          <H1>Allegra &amp; Sebastian Wedding</H1>
        </NavBrand>

        <Hamburger onClick={handleHamburgerClick}>
          <div style={{ transform: menuOpen ? 'rotate(45deg)' : 'none' }}></div>
          <div style={{ opacity: menuOpen ? '0' : '1' }}></div>
          <div style={{ transform: menuOpen ? 'rotate(-45deg)' : 'none' }}></div>
        </Hamburger>

        <AnimatedDropdownMenu style={slideDown}>
          <StyledNavLink
            to='/'
            onClick={handleLinkClick}
            isActive={window.location.pathname === '/'}
          >
            Wedding
          </StyledNavLink>
          <StyledNavLink
            to='/travel'
            onClick={handleLinkClick}
            isActive={window.location.pathname === '/travel'}
          >
            Travel
          </StyledNavLink>
          <StyledNavLink
            to='/registry'
            onClick={handleLinkClick}
            isActive={window.location.pathname === '/registry'}
          >
            Registry
          </StyledNavLink>
          <StyledNavLink
            to='/gallery'
            onClick={handleLinkClick}
            isActive={window.location.pathname === '/gallery'}
          >
            Gallery
          </StyledNavLink>
          <LargeButtonLink
            to='/rsvp'
            onClick={handleLinkClick}
            isActive={window.location.pathname === '/rsvp'}
          >
            RSVP
          </LargeButtonLink>
        </AnimatedDropdownMenu>

      </Navbar>
    </animated.div>
  );
}

export default Header;

