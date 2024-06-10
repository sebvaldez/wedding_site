import React from 'react';
import styled from 'styled-components';
import { useMachine, useSelector } from '@xstate/react';
import { usePostHog } from 'posthog-js/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';

import Page from '../components/layout/Page';
import ApiProvider from '../providers/ApiProvider';
import Loading from '../components/common/Loading';
import { BackButton } from '../components/common/formStyles';
import { AttendanceStep, ConfirmationStep, EmailLookupStep, GuestSelectionStep, ConfirmedStep } from '../components/rsvpSteps';
import { CheckParams, UserMultiAttendance, GroupMemberSelection, GroupMemberDinnerSelection } from '../components/RSVP/components';
import { rsvpMachine } from '../stateMachines/rsvpMachine';

// http://localhost:3000/rsvp?userId=81c9668e-cbff-4662-acd4-8405e1045b6b&groupId=bc274c78-90a8-4366-8e01-853764701642

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
      height: 65vh;  // Take up the full viewport height
      padding-bottom: 0;
    }
`;

const RsvpDisabled = () => (
  <Page>
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1rem', height: '75vh' }}>
      <FontAwesomeIcon icon={faScrewdriverWrench} size='5x' />
      <h3>RSVP is currently disabled</h3>
      <h3 style={{fontSize: "1.5rem"}}>Please check back soon.</h3>
    </div>
  </Page>
);

export const Rsvp = () => {
  const [state, send, actor] = useMachine(rsvpMachine);
  const { loading } = useSelector(actor, state => state.context);
  const posthog = usePostHog();

  if (loading) return <Loading fullscreen message='Submitting your RSVP selections' />

  return (
    <>
    { posthog.isFeatureEnabled('feat-rsvp')
      ? <ApiProvider>
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

          {state.matches('GroupConfirmOptOut') && (
            <>
              <BackButton crumbText={'Back to attendance options'} handleBack={() => send({ type: 'BACK'})} />
              <ConfirmationStep actor={actor} send={send} />
            </>
          )}

          {state.matches('GroupDiningPreferences') && (
            <>
              <BackButton crumbText={'Back to attendance options'} handleBack={() => send({ type: 'BACK'})} />
              <GroupMemberDinnerSelection actor={actor} send={send} />
            </>
          )}

          {state.matches('Completed') && <ConfirmedStep actor={actor} send={send} />}
        </PageContainer>
      </ApiProvider>
      : <RsvpDisabled />
    }
    </>
  );
};
