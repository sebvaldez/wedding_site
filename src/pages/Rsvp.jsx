import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useGetMember } from '../hooks/members';
import Greeting from '../components/Greeting';
import Loading from '../components/common/Loading';
import { SubmitButton, BackButton } from '../components/common/formStyles';
import { ErrorMessage } from '../components/common/formStyles';
import { AttendanceStep, ConfirmationStep, EmailLookupStep, GuestSelectionStep } from '../components/rsvpSteps';

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
      justify-content: flex-start;
      height: auto;
      padding-bottom: 0;
    }
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0 2rem;
    width: 100%;

    @media (min-width: 768px) {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
    }
`;

export const Rsvp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const idParam = searchParams.get('id') || '';
  const groupIdParam = searchParams.get('groupId') || '';
  const [step, setStep] = useState(idParam || groupIdParam ? 1 : 0);
  const isLastStep = step === 3;

  const { data: memberData = {}, isLoading } = useGetMember(idParam);

  const handleBack = () => {
    setStep((currentStep) => currentStep - 1);
  };

  const formik = useFormik({
    initialValues: {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      dinnerSelection: '',
      checkIn: null,
      plannedTransportation: '',
      specialSippingPreference: ''
    },
    onSubmit: (values) => {
      // STEPS
      // 0: email lookup step
      // 1: Attendance step
      // 2: Confirmation - for non attending users
      // 3: Member Selection

      if (step === 0) {
        setStep(1);
      } else if (step === 1 && !values.checkIn) {
        setStep(2);
      } else if (step === 1 && values.checkIn) {
        // If user is attending, skip the confirmation and move to MemberForm step.
        setStep(3);
      } else if (step === 2) {
        console.log("%c---------- Member RSVP'd NO ----------", "color: white; background-color: red; padding: 5px;");
        console.table(values)
        navigate('/registry');
      } else if (isLastStep && values.checkIn) {
        // ! should call function for sending member updates
        // ! should check if today's date is rsvpClosed window ( could be api endpoint that is a time stamp)
        console.log("%c---------- Member RSVP'd yes ----------", "color: white; background-color: green; padding: 5px;");
        console.table(values)
        navigate('/travel');
      }
    },
  });

  useEffect(() => {
    if (memberData && memberData?.email && formik.values.email !== memberData?.email) {
        formik.setFieldValue('id', memberData.id);
        formik.setFieldValue('email', memberData.email);
    }
  }, [memberData.email, formik.values.email, formik.setFieldValue, formik, memberData]);

  if (isLoading && (idParam || groupIdParam)) {
    return (
        <Loading fullscreen='true' />
    );
  }

  return (
    <PageContainer>
      <StyledForm onSubmit={formik.handleSubmit}>

        {step > 0 && <BackButton memberData={memberData} step={step} handleBack={handleBack} />}

        {step === 0 && (
          <>
            <ErrorMessage>
              {formik.errors.email}
            </ErrorMessage>
            <EmailLookupStep
              formik={formik}
            />
          </>
        )}

        {step >= 1 && memberData && (
          <Greeting
            firstName={ formik.values.firstName || memberData?.firstName }
            lastName={  formik.values.lastName || memberData?.lastName }
          />
        )}

        {step === 1 && (
          <AttendanceStep
            formik={formik}
          />
        )}

        {step === 2 && <ConfirmationStep formik={formik} />}
        {step === 3 && memberData && (
          <GuestSelectionStep member={memberData} onSubmit={formik.handleSubmit} formik={formik} />
        )}

        {[2,3].includes(step) && (
            <SubmitButton
                type="submit"
                disabled={ step === 3 && !formik.values.dinnerSelection }
            >
              { isLastStep || step === 2 ? 'Submit' : 'Next' }
            </SubmitButton>
        )}

      </StyledForm>
    </PageContainer>
  );
};
