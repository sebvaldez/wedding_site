import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useGetMember, useBulkUpdateMembers } from '../hooks/members';
import Loading from '../components/common/Loading';
import { SubmitButton, BackButton } from '../components/common/formStyles';
import { AttendanceStep, ConfirmationStep, EmailLookupStep, GuestSelectionStep, ConfirmedStep } from '../components/rsvpSteps';

// http://localhost:3000/rsvp?id=24e2f24d-160d-488d-aa81-5cddc3c13bed&groupId=bd2c72a1-7540-49ef-ba6b-bb40df58f3e8

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
    padding: 2rem 2rem;
    margin-bottom: 2.5rem;
    width: 100%;

    @media (min-width: 768px) { // for smaller devices
        flex-wrap: wrap;
        justify-content: space-between;
    }
`;

const rsvpStepFlow = {
      // STEPS
      0: EmailLookupStep, // whats your email?
      1: AttendanceStep, // will you go? yes | no
      2: ConfirmationStep, // are you sure?
      3: GuestSelectionStep, // member api lookup
      4: ConfirmedStep, // confetti page
      // 5: GuestConfirmed, // Looks like you already RSVP'd - todo
}

export const Rsvp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const idParam = searchParams.get('id') || '';
  const groupIdParam = searchParams.get('groupId') || '';
  const [step, setStep] = useState(idParam || groupIdParam ? 1 : 0);
  const isLastStep = step === 4;

  const { data: memberData = {}, isLoading } = useGetMember(idParam);
  const { mutate: bulkUpdateMembers} = useBulkUpdateMembers();

  const handleBack = () => {
    step === 3
    ? setStep(1) // take user from GuestSelection to AttendanceStep
    : setStep(currentStep => currentStep - 1);
  };

  const resetStep = () => setStep(0);

  const formik = useFormik({
    initialValues: {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      dinnerSelection: '',
      foodAllergies: [],
      otherFoodAllergy: '',
      attending: null,
      plannedTransportation: '',
      specialSippingPreference: '',
      rsvpTextUpdates: true
    },
    onSubmit: (values) => {
      switch (step) {
        case 0:
          setStep(1);
          break;
        case 1:
          !values.attending
            ? setStep(2) // User should confirm one last time
            : setStep(3); // User picks their dinner
          break;
        case 2:
          bulkUpdateMembers(values, {
            onSuccess: () => {
              navigate('/registry');
            },
            // Optionally handle onError
          });
          break;
        case 3:
          console.log(bulkUpdateMembers);
          bulkUpdateMembers(values, {
            onSuccess: () => {
              setStep(4);
            },
            // Optionally handle onError
          });
          break;
        case 4:
          if (values.attending) {
            // Assuming "isLastStep" is equivalent to "step === 4"
            console.table(values);
            resetStep();
            navigate('/travel');
          }
          break;
        default:
          console.log("Unhandled case for step:", step);
      }
    },
  });

  useEffect(() => {
    if (memberData && memberData?.email && formik.values.email !== memberData?.email) {
        formik.setFieldValue('id', memberData.id);
        formik.setFieldValue('email', memberData.email);
    }
  }, [memberData.email, formik.values.email, formik.setFieldValue, formik, memberData]);

  // todo - if user has already checked in and is coming back.. skip step
  useEffect(() => {
    if (memberData && memberData.attending) {
      console.log('new useEffect, is user attending?', memberData.attending);
      setStep(3); // if user had prev checked take them to their selections
    }
  }, [memberData,formik.values.attending]);

  if (isLoading && (idParam || groupIdParam)) {
    return (
        <Loading fullscreen='true' />
    );
  }

  const RsvpStep = rsvpStepFlow[step];

  return (
    <PageContainer>
      <StyledForm onSubmit={formik.handleSubmit}>

        {step > 0 && step < 4 && <BackButton memberData={memberData} step={step} handleBack={handleBack} />}

        <RsvpStep formik={formik} memberData={memberData} />

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
