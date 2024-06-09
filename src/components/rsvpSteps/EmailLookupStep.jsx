import * as yup from 'yup';
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import styled from 'styled-components';
import { useGetMemberByEmail } from '../../hooks/members';
import { Input, SubmitButton } from '../common/formStyles';
import { ErrorMessage } from '../common/formStyles/ErrorMessage';
import Loading from '../common/Loading';
import { useSelector } from '@xstate/react';

const EMAIL_INVALID_MESSAGE = 'Email must be valid!';
const EMAIL_REQUIRED_MESSAGE = 'Email is required!';

/* eslint-disable dot-location */
const validationSchema = yup.object().shape({
  email: yup.
    string().
    email(EMAIL_INVALID_MESSAGE).
    required(EMAIL_REQUIRED_MESSAGE)
});
/* eslint-enable dot-location */

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  justify-content: center;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

export const EmailLookupStep = ({ actor, send }) => {
  const [ lookupClicked, setLookupClicked ] = useState(false);
  const [ lookupEmail, setLookupEmail ] = useState(null);

  // todo handle isError
  const { data: memberData, isLoading: isQueryLoading } = useGetMemberByEmail(lookupEmail, lookupClicked);

  useEffect(() => {
    if (memberData) {
      send({ type: 'USER_EMAIL_LOOKUP', lookupEmail, memberData });
    }
  }, [memberData, lookupEmail, send]);


  const emailContext = useSelector(actor, (s) => s?.context.email);

  const handleSubmit = (e) => {
    const email = e.email;
    setLookupEmail(email)
    setLookupClicked(true)
  }

  if (isQueryLoading && lookupClicked) {
    return <Loading fullscreen='true' />;
  }

  return (
    <Formik
      initialValues={{ email: emailContext || '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isValidating, isValid, dirty }) => (
        <StyledForm>
          {errors.email && touched.email && (
            <ErrorMessage>{errors.email}</ErrorMessage>
          )}
          <Field
            component={Input}
            placeholder="Please enter your email"
            type="email"
            name="email"
          />
          <SubmitButton
            type="submit"
            disabled={isValidating || !isValid || !dirty}
          >
            Submit
          </SubmitButton>
        </StyledForm>
      )}
    </Formik>
  );
};
