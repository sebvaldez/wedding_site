import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
    background-color: #000;
    padding: 3rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const NavContainer = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100vw;
    padding: 0 2rem; // Add horizontal padding
    margin-bottom: 2.2rem;
`;

const NavLink = styled(Link)`
    text-decoration: none;
    color: #fff;
    font-size: 1rem;
`;

const FooterText = styled.p`
    color: #fff;
    font-size: 1rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <NavContainer>
        <NavLink to='/'>Our Relationship</NavLink>
        <NavLink to='/admin'>Admin</NavLink>
        <NavLink to='/rsvp'>RSVP</NavLink>
      </NavContainer>
      <FooterText>Made with ❤️ by Sebastian</FooterText>
    </FooterContainer>
  );
}

export default Footer;
