import styled from 'styled-components';
import { useSelector } from '@xstate/react';
import { SubmitButton } from '../common/formStyles';

const ConfirmationText = styled.h2`
  font-size: 1.3rem;
  font-weight: 600;
  text-align: center;
  padding: .5rem 0;
  // more padding for mobile
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const ConfirmationStep = ({ actor, send }) => {
  const { userId, attending, groupMembersNotAttending } = useSelector(actor, state => state.context);

  const confirmNotAttending = () => {
    send({ type: 'USER_CONFIRM_OPT_OUT' });
  }

  const groupNotAttending = !attending && groupMembersNotAttending.length === 0;
  const something = !attending && groupMembersNotAttending.length === 1 && groupMembersNotAttending[0].id === userId;

  return (
    <>
      <ConfirmationText onClick={confirmNotAttending}>
        { groupNotAttending || something
          ? "Confirm you're not attending?"
          : "Are you sure you want to mark ALL guests as 'Not Attending'?"
        }
      </ConfirmationText>
      <SubmitButton onClick={confirmNotAttending}>Confirm</SubmitButton>
    </>
  );
};
