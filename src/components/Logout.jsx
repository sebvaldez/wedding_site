import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';


const StyledLogoutButton = styled.button`
  font-family: 'Montserrat', sans-serif;
  color: #000000;
  text-decoration: none;
  padding: .5rem;
  margin: 0rem;
  font-size: 1.3rem;
  font-weight: bold;

  text-decoration: none;
  /* margin: 0 .5rem; */
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
      <FontAwesomeIcon icon={faArrowRight} size='lg' style={{ marginLeft: '0.5rem' }} />
    </StyledLogoutButton>
  );
};

export default LogoutButton;
