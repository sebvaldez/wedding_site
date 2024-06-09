import React from 'react';
import styled from 'styled-components';
import { useSelector } from '@xstate/react';
import { Formik, Form, Field } from 'formik';

import { useFetchMembersByGroupId } from '../../../hooks/members';
import { SubmitButton } from '../../common/formStyles';
import Loading from '../../common/Loading';

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
  // add handle error
  const { data, isLoading } = useFetchMembersByGroupId(groupId);

  if (isLoading) return <Loading />;

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

        const validMembers = values.members.filter(member => member.attending !== 'skip');

        // handle when all members are not attending
        const allMembersSelectedNo = validMembers.every(member => member.attending === 'false');
        if (allMembersSelectedNo) {
          send({ type: 'USER_GROUP_NOT_ATTENDING', nonAttendingMembers: values.members });
          return;
        }

        // select only members that are not skipping
        const attendingMembers = validMembers.filter(member => member.attending === 'true');
        const nonAttendingMembers = validMembers.filter(member => member.attending === 'false');

        send({ type: 'USER_GROUP_DINING_PREFERENCES', attendingMembers, nonAttendingMembers });
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
      {({ values, isValid, dirty }) => {
        const allMembersAttending = values.members.every(member => member.attending === 'true');

        return (
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
              <SubmitButton disabled={!isValid || (!dirty && !allMembersAttending)} type="submit" style={{ marginTop: '2rem' }}>
                Next
              </SubmitButton>
            </CheckInContainer>
          </Form>
        );
      }}
    </Formik>
  );
};