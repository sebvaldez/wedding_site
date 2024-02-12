import styled from 'styled-components';

const ConfirmationText = styled.h2`
  font-size: 1.3rem;
  font-weight: 600;
  text-align: center;
  padding: .5rem 0;
`;

export const ConfirmationStep = ({ formik }) => {
  const confirmNotAttending = () => {
    formik.setFieldValue('attending', false);
  }

  return (
    <ConfirmationText onClick={confirmNotAttending}>Confirm you're not attending?</ConfirmationText>
  );
};
