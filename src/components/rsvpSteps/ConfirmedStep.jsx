import React, { useState, useEffect } from 'react';
import { useSelector } from '@xstate/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';

const ConfirmedContainer = styled.div`
  height: 500px;
  padding: .5rem .2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  text-align: center;

  h2 {
    font-weight: 500;
    font-size: 1.5rem;
  }
  p {
    font-weight: 500;
    font-size: 1.2rem;
    padding: .4rem;
  }
`;

export const ConfirmedStep = ({ actor, send }) => {
  const attending = useSelector(actor, state => state.context.attending);

  const navigate = useNavigate();
  const [counter, setCounter] = useState(4);

  useEffect(() => {
    if (counter > 0) {
      const timeoutId = setTimeout(() => {
        setCounter(counter - 1);
      }, 1000);
      return () => clearTimeout(timeoutId);
    } else {
      if (attending) {
        navigate('/hotel-blocks');  // Assuming the intended destination is here if attending
      } else {
        navigate('/registry');  // Redirect to registry if not attending
      }
    }
  }, [counter, navigate, attending]);

  return (
    <ConfirmedContainer>
      {attending ? (
        <>
          <Confetti />
          <h2>Thank you for RSVP'ing!</h2>
          <FontAwesomeIcon style={{ color: 'green' }} icon={faCheckCircle} size="5x" />
          <p>Redirecting in to our Travel details page in {counter} seconds...</p>
        </>
      ) : (
        <>
          <h2>We're sorry to see you won't be attending.</h2>
          <p>You will be redirected to our registry page in {counter} seconds...</p>
        </>
      )}
    </ConfirmedContainer>
  );
};
