import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from '../Logout';
import { COLOR_PALETTE } from '../../styles/Colors';

// Global styles to manage media queries
const GlobalStyle = createGlobalStyle`
  @media (max-width: 768px) {
    .desktop-only {
      display: none;
    }
  }

  @media (min-width: 769px) {
    .mobile-only {
      display: none;
    }
  }
`;

const Navbar = styled.div`
  display: flex;
  height: 5rem;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  z-index: 2000;
  gap: .3em;

  // Tablet styles (for screens larger than 768px)
  @media (min-width: 769px) {
    padding: 0 .5rem;  // adjust padding for tablet
    height: 4.5rem;
  }

  // Desktop styles (for screens larger than 1024px)
  @media (min-width: 1025px) {
    height: 4.5rem;
    font-size: 1rem;  // Increase font size for desktops
    max-width: 80%;  // Decreasing the maximum width on desktops for tighter grouping; adjust as needed
  }
`;

const NavBrand = styled.div`
  padding: .2rem 0 .2rem 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly; // Use flex-start instead of flex-left
  z-index: 1000;

  #nav-text-logo {
    font-family: 'Tenor Sans', serif;
    font-weight: 800;
    padding-left: 0.5rem;
    font-size: 1.5rem;
    margin: 0;
  }

  // Apply consistent padding for mobile devices
  @media (max-width: 768px) {
    #nav-text-logo {
      display: none;
    }
    padding-left: 0;
  }
`;

const StyledNavLink = styled(NavLink)`
  font-family: 'Montserrat', sans-serif;
  color: #000000;
  text-decoration: none;
  padding: .5rem;
  margin: 0rem;
  font-size: 1.3rem;
  font-weight: 800;

  &.active {
    color: ${COLOR_PALETTE['rust']};
    font-weight: bold;
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: .3rem;
    font-weight: bold;
  }
`;

const Header = () => {
  const { isAuthenticated } = useAuth0();
  const navbarRef = useRef(null);

  return (
    <ThemeProvider theme={{}}>
      <GlobalStyle />
      <Navbar ref={navbarRef}>
        <NavBrand>
          <NavLink to='/' className="desktop-only">
            <h1 id='nav-text-logo'>A | S</h1>
          </NavLink>
        </NavBrand>

        {isAuthenticated && (
          <>
            <StyledNavLink
              to='/dashboard'
              activeClassName="active"
            >
              Dashboard
            </StyledNavLink>
            <LogoutButton />
          </>
        )}

        <StyledNavLink to='/faq' className="nav-link">
          <em>F.A.Q</em>
        </StyledNavLink>
        <StyledNavLink to='/details' className="nav-link">
          <em>Details</em>
        </StyledNavLink>
        <StyledNavLink to='/hotel-blocks' className="nav-link">
          <em>Hotels</em>
        </StyledNavLink>
        <StyledNavLink to='/registry' className="nav-link">
          <em>Registry</em>
        </StyledNavLink>
        <StyledNavLink to='/things-to-do' className="nav-link">
          <em>Activities</em>
        </StyledNavLink>
{/*
        <StyledNavLink to='/rsvp' className="nav-link">
          <em>RSVP</em>
        </StyledNavLink>
 */}
        <br />
      </Navbar>
    </ThemeProvider>
  );
};

export default Header;
