import React, { useEffect, useCallback, useState } from 'react';
import { useGetMemberByEmail } from '../../hooks/members';
import { Input, SubmitButton } from '../common/formStyles';
import { ErrorMessage } from '../common/formStyles/ErrorMessage';
import Loading from '../common/Loading';

export const EmailLookupStep = ({ formik }) => {
  const [lookupClicked, setLookupClicked] = useState(false);
  const { data: member, isError, isLoading: isQueryLoading } = useGetMemberByEmail(formik.values.email, lookupClicked);

  const isEmailValid = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const lookupEmail = useCallback(() => {
    if (isEmailValid(formik.values.email)) {
      setLookupClicked(true);
    } else {
      formik.setFieldError('email', 'Please provide a valid email.');
    }
  }, [formik]);

  useEffect(() => {
    if (member && !isError) { // Check for the absence of an error here as well
        formik.setFieldValue('id', member.id);
        formik.setFieldValue('firstName', member.firstName);
        formik.setFieldValue('lastName', member.lastName);
        formik.setFieldValue('email', member.email);
        formik.submitForm();
    } else if (isError && lookupClicked) {
        formik.setFieldError('email', 'Email not found.');
        setLookupClicked(false);
    }
}, [member, isError, formik, lookupClicked]);


  if (isQueryLoading && lookupClicked) {
    return <Loading fullscreen='true' />;
  }

  return (
    <>
      <ErrorMessage>
        {formik.errors.email}
      </ErrorMessage>
      <h2>Guest Lookup</h2>
      <Input
        type="email"
        name="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        placeholder="Enter your email"
      />
      <SubmitButton
        onClick={lookupEmail}
        disabled={!formik.values.email || !isEmailValid(formik.values.email)}
      >
        Look me up
      </SubmitButton>
    </>
  );
};
