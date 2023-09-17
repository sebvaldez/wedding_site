import React, { useState, useRef, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from '../Logout';

const Navbar = styled.div`
  display: flex;
  height: 4rem;
  margin: 0 auto;
  padding: 0 2rem;
  justify-content: space-between;  // Change from space-around to space-between
  align-items: center;
  z-index: 2000;
  position: relative;
  gap: .3rem;
  max-width: 100%; // This will be your container's maximum width; adjust as needed

  // Tablet styles (for screens larger than 768px)
  @media (min-width: 769px) {
    padding: 0 2rem;  // adjust padding for tablet
    height: 4.5rem;
  }

  // Desktop styles (for screens larger than 1024px)
  @media (min-width: 1025px) {
    flex-grow: .5;
    // padding: 0 9.5rem;
    height: 5rem;
    max-width: 85%;  // Decreasing the maximum width on desktops for tighter grouping; adjust as needed
  }
`;


const NavBrand = styled.div`
@media (max-width: 768px) {
    margin-left: .5rem;
    padding-left: 0;
  }

  padding: .2rem;
  display:flex;
  align-items: center;
  gap: .3rem;
  justify-content: flex-left;
  z-indez: 1000;

  img {
    padding: .4rem;
    width: 18%;
  }
`

const StyledNavLink = styled(NavLink)`
  font-family: 'Montserrat', sans-serif;
  color: #000000;
  text-decoration: none;
  margin: 0 1rem;

  &.active{
    color: #ff6347;
    font-weight: bold;
    text-decoration: underline;
  }
`;

const H1 = styled.h1`
  @media (max-width: 768px) {
    font-size: 1rem;  // reduce font size for mobile
  }
  font-family: 'Tenor Sans', serif;
  font-weight: 400;
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
  border-radius: .2rem;
  font-size: calc((1.1 - 1) * 1.2vw + 1rem);
  padding: 1.3rem 2.171rem;
  text-decoration: none;
  cursor: pointer;
  background-color: #000;  // Black background for non-active state
  color: #FFF;  // White text
  border: 2px solid #000;  // Black border
  &:hover {
    background-color: #FFF;  // White background on hover for non-active state
    color: #000;  // Black text on hover
  }

  &.active {
    background-color: #ff6347; // White background for active state
    color: #fff;  // Black text
    border: 2px solid #fff;  // Black border

    &:hover {
      background-color: #000;  // Black background on hover for active state
      color: #FFF;  // White text on hover
    }
  }
`;

const Hamburger = styled.div`
  @media (min-width: 769px) {
    display: none;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  flex-direction: row;

  div {
    width: 2rem; // increased width slightly
    height: 0.25rem;
    background-color: black;
    margin: 0.2rem 0; // reduced margin to make the gap shorter
    // transition: all 0.3s eas~e;
  }
`;

const DropdownMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  transform: translateY(0);
  visibility: visible;
  @media (min-width: 769px) {
    position: static;
    background-color: transparent;
    box-shadow: none;
    flex-direction: row;

    & a {
      margin: 0.5rem 1rem; // Adjust this to your preference
    }
  }


  @media (max-width: 768px) {
    flex-direction: column;
    position: absolute; // make it absolute so it positions relative to the Navbar
    top: 100%;  // place it right below the Navbar
    right: 0; // align it to the right edge of the Navbar
    width: 200px;
    background-color: white;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);

    & a {
      margin: 0.5rem 0;
    }
  }
`;

const AnimatedDropdownMenu = animated(DropdownMenu);

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { isAuthenticated } = useAuth0();


  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      // Cleanup the event listener
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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

  const navbarRef = useRef(null);

  const isMobile = windowWidth <= 768; // Check if the viewport width is less than or equal to 768px

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 250,
  });

  const slideDown = useSpring({
    transform: isMobile ? (menuOpen ? 'translateY(0)' : 'translateY(-100%)') : 'translateY(0)',
    visibility: isMobile ? (menuOpen ? 'visible' : 'hidden') : 'visible',
  });

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
          <img
            alt='Allegra and Sebastian Wedding Icon'
            src='https://static-image-bucket-service-dev.s3.us-west-2.amazonaws.com/header/navbrand_logo.png'
          />
          <NavLink to='/'>
            <H1>
              <em>
                Welcome to our Wedding
              </em>
            </H1>
          </NavLink>
        </NavBrand>

        <Hamburger onClick={handleHamburgerClick}>
          <div style={{ transform: menuOpen ? 'rotate(45deg)' : 'none' }}></div>
          <div style={{ opacity: menuOpen ? '0' : '1' }}></div>
          <div style={{ transform: menuOpen ? 'rotate(-45deg)' : 'none' }}></div>
        </Hamburger>

        <AnimatedDropdownMenu style={slideDown}>
          {
            isAuthenticated && (
              <>
                <StyledNavLink
                  to='/dashboard'
                  onClick={handleLinkClick}
                  activeClassName="active"
                >
                  Dashboard
                </StyledNavLink>
                <LogoutButton />
              </>
            )
          }

          <StyledNavLink
            to='/'
            onClick={handleLinkClick}
            className="nav-link"
          >
            Wedding
          </StyledNavLink>
          <StyledNavLink
            to='/travel'
            onClick={handleLinkClick}
            className="nav-link"
          >
            Travel
          </StyledNavLink>
          <StyledNavLink
            to='/registry'
            onClick={handleLinkClick}
            className="nav-link"
          >
            Registry
          </StyledNavLink>
          <StyledNavLink
            to='/gallery'
            onClick={handleLinkClick}
            className="nav-link"
          >
            Gallery
          </StyledNavLink>
          <LargeButtonLink
            to='/rsvp'
            onClick={handleLinkClick}
            className="nav-link"
          >
            RSVP
          </LargeButtonLink>
        </AnimatedDropdownMenu>

      </Navbar>
    </animated.div>
  );
}

export default Header;

