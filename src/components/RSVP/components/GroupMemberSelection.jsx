import React from 'react';
import styled from 'styled-components';
import { useSelector } from '@xstate/react';
import { Formik, Form, Field } from 'formik';
import { useFetchMembersByGroupId } from '../../../hooks/members';
import { SubmitButton } from '../../common/formStyles';
import Loading from '../../common/Loading';

const mockMemberData = [
  {
    email: "valdez.sebastian4@gmail.com",
    id: "66cb0483-7ef8-4fed-b5fa-11acef6a23ac",
    userId: "66cb0483-7ef8-4fed-b5fa-11acef6a23ac",
    groupId: "bc274c78-90a8-4366-8e01-853764701642",
    firstName: "Sebastian",
    lastName: "Valdez",
    attending: null,
    dinnerSelection: "balsamic_rosemary_chicken",
    foodAllergies: ["None"],
    plannedTransportation: "uber_or_lyft",
    specialSippingPreference: "classic_cocktails",
    phoneNumber: 4152994331,
  },
  {
    id: "a8013bc4-f2bd-4b9e-b6a0-a94834df0055",
    userId: "a8013bc4-f2bd-4b9e-b6a0-a94834df0055",
    firstName: "Allegra",
    lastName: "Cesena",
    email: "allegracesena@gmail.com",
    phoneNumber: 2096630485,
    rsvpTextUpdates: true,
    attending: null,
    dinnerSelection: "grilled_vegetable_wellington",
    foodAllergies: [
      "Other"
    ],
    plannedTransportation: "uber_or_lyft",
    specialSippingPreference: "rose",
    otherFoodAllergy: "Vegan",
    groupId: "bc274c78-90a8-4366-8e01-853764701642",
  },
  {
    id: "96854b50-bfac-46a0-ac43-0309fcb7265a",
    userId: "96854b50-bfac-46a0-ac43-0309fcb7265a",
    firstName: "Jordan",
    lastName: "Meyers",
    email: "jordan.meyers209@gmail.com",
    phoneNumber: 2092945877,
    rsvpTextUpdates: true,
    emailedInvitation: false,
    attending: null,
    dinnerSelection: "balsamic_rosemary_chicken",
    foodAllergies: [
      "None"
    ],
    plannedTransportation: "carpooling",
    specialSippingPreference: "white_wine",
    otherFoodAllergy: "",
    groupId: "bc274c78-90a8-4366-8e01-853764701642",
  }
];

const CheckInContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  gap: 0.2rem;
  h1 {
    margin-bottom: 20px;
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;  // Changes to column to stack the name above the choices
  justify-content: center;
  align-items: center;
  padding: 15px;
  background-color: ${props => props.selected === false ? 'white' : '#f0f0f0'};
  border: 1px solid #ccc;
  margin-bottom: 10px;
  cursor: pointer;
  opacity: ${props => props.selected === false ? '1' : '.8'};
  transition: background-color 0.2s ease;

  @media (min-width: 600px) {  // Adjusts for larger screens
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  &:hover {
    background-color: #e8e8e8;
  }
`;

const Label = styled.label`
  margin: 0 10px;
`;

const Name = styled.div`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 8px;  // Provides spacing between name and options on mobile

  @media (min-width: 600px) {
    margin-bottom: 0;  // Removes the bottom margin on larger screens
  }
`;

const OptionsContainer = styled.div`
  display: flex;
  justify-content: center;  // Centers options on mobile
  width: 100%;  // Full width on mobile

  @media (min-width: 600px) {
    justify-content: flex-start;  // Aligns options to the start on larger screens
    width: auto;  // Auto width on larger screens
  }
`;

export const GroupMemberSelection = ({ actor, send}) => {
  const groupId  = useSelector(actor, s => s?.context.groupId);
  console.log('GroupMemberSelection:', groupId);
  const { data, isLoading, error } = useFetchMembersByGroupId(groupId);

  if (isLoading) {
    return <Loading />;
  }

  const initialValues = {
    members: data.map(member => ({
      ...member,
      attending: member.attending != null ? String(member.attending) : null  // Ensure attending is a string matching the Field values
    }))
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        // select only members that are not skipping
        const attendingMembers = values.members.filter(member => member.attending !== 'skip');

        // console.log('Submitting:', JSON.stringify(attendingMembers, null, 2));
        send({ type: 'USER_GROUP_DINING_PREFERENCES', attendingMembers });
      }}
      validate={values => {
        const errors = {};
        // Check if all members have made a selection
        if (values.members.some(member => member.attending === null)) {
          errors.members = 'All members must make a selection';
        }
        // Check if all members have 'skip' selected
        if (values.members.every(member => member.attending === 'skip')) {
          errors.members = 'At least one member must attend or not attend (not all can skip)';
        }
        return errors;
      }}
    >
      {({ values, isValid, dirty }) => (
        <Form>
          <CheckInContainer>
            <h1>Who would you like to check-in?</h1>
            {values.members.map((member, index) => (
              <Row key={member.userId} selected={member.attending === 'false'}>
                <Name>{`${member.firstName} ${member.lastName}`}</Name>
                <OptionsContainer>
                  <Label>
                    <Field type="radio" name={`members[${index}].attending`} value="true" /> Attending
                  </Label>
                  <Label>
                    <Field type="radio" name={`members[${index}].attending`} value="false" /> Not Attending
                  </Label>
                  <Label>
                    <Field type="radio" name={`members[${index}].attending`} value="skip" /> Skip
                  </Label>
                </OptionsContainer>
              </Row>
            ))}
            <SubmitButton  disabled={!isValid || !dirty} type="submit" style={{ marginTop: '2rem' }}>Next</SubmitButton>
          </CheckInContainer>
        </Form>
      )}
    </Formik>
  );
};