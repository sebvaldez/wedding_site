import React, { useState} from 'react';
import styled from 'styled-components';
import { useMachine } from '@xstate/react';
import { BackButton } from '../components/common/formStyles';
import { AttendanceStep, ConfirmationStep, EmailLookupStep, GuestSelectionStep, ConfirmedStep } from '../components/rsvpSteps';

import { CheckParams, UserMultiAttendance, GroupMemberSelection, GroupMemberDinnerSelection } from '../components/RSVP/components';


import { rsvpMachine } from '../stateMachines/rsvpMachine';

// http://localhost:3000/rsvp?userId=66cb0483-7ef8-4fed-b5fa-11acef6a23ac&groupId=bc274c78-90a8-4366-8e01-853764701642

const PageContainer = styled.div`
    margin-top: 0rem;
    padding-bottom: 60px;  // Room for the button at the bottom
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    height: 90vh;  // Take up the full viewport height

    @media (min-width: 768px) {  // Example breakpoint for larger devices
      margin-top: 3rem;
      /* justify-content: flex-start; */
      height: auto;
      padding-bottom: 0;
    }
`;

const JsonDebugger = ({ data }) => {
  const [ toggle, setToggle ] = useState(false)

  const handleToggle = () => setToggle(s => !s);

  const s = {
    backgroundColor: '#edf2f7',
    padding: '10px',
    display: 'flex',
    flexDirecton: 'column',
    gap: '.2rem',
    justifyContent: 'center',
    alignContent: 'center'
  }

  return (
    <div style={s}>
      <button style={{ height: "18px", textAlign: 'center'}} onClick={handleToggle}>x</button>
      { toggle && <pre>{ JSON.stringify(data, null, 2) }</pre>}
    </div>
  )
}

export const Rsvp = () => {
  const [state, send, actor] = useMachine(rsvpMachine);

  return (
    <PageContainer>

        {/* Check URL query params on /rsvp page load */}
        {state.matches('CheckParams') && <CheckParams send={send} />}

        {state.matches('UserLookupEmail') && <EmailLookupStep actor={actor} send={send} />}

        {state.matches('UserAttendance') && (
          <>
          {/* TODO there may be a idiomatic way to use like xstate history or something.. */}
          {state.context.previousState === 'UserLookupEmail' && <BackButton handleBack={() => send({ type: 'BACK'})} /> }
          {state.context.previousState === 'UserMultiAttendance' && <BackButton crumbText={'Check-in options'} handleBack={() => send({ type: 'BACK_FROM_USER_MULTI_ATTENDANCE'})} /> }
          <AttendanceStep actor={actor} send={send} />
          </>
        )}

        {state.matches('UserConfirmOptOut') && (
          <>
            <BackButton crumbText={'Back to attendance options'}  handleBack={() => send({ type: 'BACK'})} />
            <ConfirmationStep actor={actor} send={send} />
          </>
        )}

        {state.matches('UserDiningPreferences') && (
          <>
            <BackButton crumbText={'Back to attendance options'}  handleBack={() => send({ type: 'BACK'})} />
            <GuestSelectionStep actor={actor} send={send} />
          </>
        )}

        {state.matches('UserMultiAttendance') && (
          <>
            <UserMultiAttendance actor={actor} send={send} />
          </>
        )}

        {state.matches('GroupMemberSelection') && (
          <>
            <BackButton crumbText={'Check-in options'} handleBack={() => send({ type: 'BACK'})} />
            <GroupMemberSelection actor={actor} send={send} />
          </>
        )}

        {state.matches('GroupDiningPreferences') && (
          <>
            <BackButton crumbText={'Back to attendance options'} handleBack={() => send({ type: 'BACK'})} />
            <GroupMemberDinnerSelection actor={actor} send={send} />
          </>
        )}

        {state.matches('Completed') && <ConfirmedStep actor={actor} send={send} />}
      <JsonDebugger data={state} />
    </PageContainer>
  );
};
