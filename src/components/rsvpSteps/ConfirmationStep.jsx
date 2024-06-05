import styled from 'styled-components';
import { SubmitButton } from '../common/formStyles';
const ConfirmationText = styled.h2`
  font-size: 1.3rem;
  font-weight: 600;
  text-align: center;
  padding: .5rem 0;
`;

export const ConfirmationStep = ({ actor, send }) => {

  const confirmNotAttending = () => {
    send({ type: 'USER_CONFIRM_OPT_OUT' });
  }

  return (
    <>
      <ConfirmationText onClick={confirmNotAttending}>Confirm you're not attending?</ConfirmationText>
      <SubmitButton onClick={confirmNotAttending}>Confirm</SubmitButton>
    </>
  );
};
