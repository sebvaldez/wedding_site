import React, { useState, useEffect } from 'react';
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

  h2 {
    font-weight: 400;
    font-size: 1.5rem;
  }
`;

export const ConfirmedStep = () => {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(3);

  useEffect(() => {
    if (counter > 0) {
      const timeoutId = setTimeout(() => {
        setCounter(counter - 1);
      }, 1000);
      return () => clearTimeout(timeoutId);
    } else {
      navigate('/travel');
    }
  }, [counter, navigate]);

  return (
    <ConfirmedContainer>
      <Confetti />
      <h2>Thank you for RSVP'ing</h2>
      <FontAwesomeIcon style={{ color: 'green'}} icon={faCheckCircle} size='5x' />
      <div>Redirecting in {counter} seconds...</div>
    </ConfirmedContainer>
  );
};
