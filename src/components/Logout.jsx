import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import styled from 'styled-components';

const StyledLogoutButton = styled.button`
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
  color: #000000;
  text-decoration: none;
  margin: 0 1rem;
  border: none;
  background: transparent;
  cursor: pointer;

  &:hover {
    color: #ff6347;
    font-weight: bold;
    text-decoration: underline;
  }

  &:active {
    color: #ff6347;
    font-weight: bold;
    text-decoration: underline;
  }
`;

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <StyledLogoutButton onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </StyledLogoutButton>
  );
};

export default LogoutButton;
