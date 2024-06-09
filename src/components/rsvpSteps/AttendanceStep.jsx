import { useEffect } from 'react'
import styled from 'styled-components';
import { useSelector } from '@xstate/react';
import { useGetMember } from '../../hooks/members';
import Loading from '../common/Loading';
import Greeting from '../Greeting';
import { COLOR_PALETTE } from '../../styles/Colors';

const NotAttendingButton = styled.button`
    font-size: 1.2rem;
    padding: 1rem 2rem;
    background-color: ${COLOR_PALETTE['rust']};
    color: white;
    border: none;
    border-radius: 4px;
    max-width: 450px; // Set your desired maximum width
    width: 100%; // This will ensure the button takes the full width up to max-width
    align-self: center;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
        background-color: ${COLOR_PALETTE['burgundy']} // rust on hover
    }
`;

const AttendingButton = styled.button`
    font-size: 1.2rem;
    padding: 1rem 2rem;
    background-color: ${COLOR_PALETTE['sageGreen']};
    color: white;
    border: none;
    border-radius: 4px;
    max-width: 450px; // Set your desired maximum width
    width: 100%; // This will ensure the button takes the full width up to max-width
    align-self: center;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
        background-color: ${COLOR_PALETTE['darkGreen']}; // dark green on hover
    }
`;

const AttendanceOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 4rem;
`;

export const AttendanceStep = ({ actor, send }) => {
  let { userId, firstName, lastName } = useSelector(actor, s => s.context);

  // ? NOTE: we have a extra fetch when coming from email look up, going to live with it for now
  const { data: memberData, isLoading } = useGetMember(userId);

  useEffect(() =>{
    if (memberData) {
      // needed to handle when parms ID exists, we have to await auth token retry
      send({ type: 'USER_FOUND', memberData });
    }
  }, [memberData, send])

  if (isLoading) return <Loading fullscreen />

  const handleAttending = () => {
    send({ type: 'USER_WILL_BE_ATTENDING', memberData, attending: true })
  }

  const handleNotAttending = () => {
    send({ type: 'USER_NOT_ATTENDING', memberData, attending: false })
  }

  return (
    <>
      <Greeting
        firstName={ firstName }
        lastName={ lastName }
      />
      <AttendanceOptions>
        <NotAttendingButton type='submit' onClick={handleNotAttending}>
          I will not be attending
        </NotAttendingButton>
        <AttendingButton type='submit' onClick={handleAttending}>
          I will be attending
        </AttendingButton>
      </AttendanceOptions>
    </>
  );
};
