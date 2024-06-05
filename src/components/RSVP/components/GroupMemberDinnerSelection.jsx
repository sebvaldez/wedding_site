import React from 'react';
import styled from 'styled-components';
import { Formik, Form, Field, FieldArray } from 'formik';
import { useSelector } from "@xstate/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarOfLife } from '@fortawesome/free-solid-svg-icons';
import Space from '../../common/Space';
import { SubmitButton, InputSm } from '../../common/formStyles';

const StyledSelect = styled.select`
  padding: 0.8rem;  // Increased padding for dropdowns too
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1.2rem;  // Increased font-size for dropdowns
  width: 100%;
  box-sizing: border-box;
`;

const StyledFieldArray = styled.div`
  margin-bottom: 2.5rem;
  padding: 0 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  //every other child is a different color
  /* div:nth-child(odd) {
    background-color: #ac9d9d;
  } */
  @media (min-width: 768px) {
      flex-wrap: wrap;
      justify-content: space-between;
  }
`;

const MemberName = styled.h1`
  font-size: 2rem;
`;

const ALLERGY_OPTIONS = ['None', 'Peanut', 'Gluten', 'Dairy', 'Eggs', 'Seafood', 'Tree Nuts', 'Soy', 'Other'];

const handleAllergyChange = (event, setFieldValue, values, index) => {
  const { value, checked } = event.target;
  let allergies = values.members[index].foodAllergies || [];

  // Helper function to update the food allergies of the current member
  const updateAllergies = (newAllergies) => {
    setFieldValue(`members.${index}.foodAllergies`, newAllergies);
  };

  // Helper function to clear the 'otherFoodAllergy' field of the current member
  const clearOtherAllergy = () => {
    setFieldValue(`members.${index}.otherFoodAllergy`, '');
  };

  // Handle the case where the 'None' option is checked or unchecked
  if (value === 'None') {
    if (checked) {
      // If 'None' is checked, clear other allergies and 'otherFoodAllergy' field
      updateAllergies(['None']);
      clearOtherAllergy();
    } else {
      // If 'None' is unchecked, clear all allergies
      updateAllergies([]);
    }
  } else {
    // Remove 'None' from allergies if it's already present
    allergies = allergies.filter(a => a !== 'None');

    if (checked) {
      // Add the checked allergy to the list
      updateAllergies([...allergies, value]);
    } else {
      // Remove the unchecked allergy from the list
      const updatedAllergies = allergies.filter(a => a !== value);
      updateAllergies(updatedAllergies);

      // Clear the 'otherFoodAllergy' field if 'Other' is unchecked
      if (value === 'Other') {
        clearOtherAllergy();
      }
    }
  }
};

const validateForm = (values) => {
  const errors = {};
  errors.members = values.members.map((member, index) => {
    const memberErrors = {};
    if (!member.dinnerSelection) {
      memberErrors.dinnerSelection = 'Required';
    }
    if (!member.foodAllergies || member.foodAllergies.length === 0) {
      memberErrors.foodAllergies = 'Required';
    }
    if (member.foodAllergies.includes('Other') && !member.otherFoodAllergy) {
      memberErrors.otherFoodAllergy = 'Required';
    }
    return memberErrors;
  });

  // Check if any member errors exist
  if (errors.members.some(memberErrors => Object.keys(memberErrors).length > 0)) {
    return errors;
  }

  return {};
};


export const GroupMemberDinnerSelection = ({ actor, send }) => {
  const {userId, groupMembersAttending} = useSelector(actor, state => {
    return { userId: state.context.userId, groupMembersAttending: state.context.groupMembersAttending}
  });

  return (
    <Formik
      initialValues={{
        members: groupMembersAttending.map(member => ({
          ...member,
          foodAllergies: member.foodAllergies || [], // Ensure foodAllergies is initialized
          dinnerSelection: member.dinnerSelection || '', // Ensure dinnerSelection is initialized
          specialSippingPreference: member.specialSippingPreference || '' // Ensure specialSippingPreference is initialized
        }))
      }}
      onSubmit={(values, actions) => {
        console.log('Submitting:', values);
        // send('SUBMIT', { data: values.members });
        actions.setSubmitting(false);
      }}
      validate={validateForm}
    >
      {({ values, setFieldValue, isSubmitting, isValid, dirty, errors }) => (
        <Form style={{ marginBottom: '1.2rem' }}>
          <FieldArray name="members">
            {({ insert, remove, push }) => (
              <StyledFieldArray>
                {values.members.length > 0 && values.members.map((member, index) => (
                  <div key={member.id}>

                    { member.id === userId && 'Primary Person' }

                    <MemberName>{member.firstName} {member.lastName}</MemberName>
                    <br />
                    <Space />

                    <span>
                      Dinner Selection <FontAwesomeIcon style={{ fontSize: '.8rem', color: '#A64444' }} icon={faStarOfLife} size='xs' />
                    </span>
                    <Field name={`members.${index}.dinnerSelection`} as={StyledSelect}>
                      <option value="" disabled>Select</option>
                      <option value="balsamic_rosemary_chicken">Balsamic Rosemary Chicken</option>
                      <option value="grilled_vegetable_wellington">Grilled Vegetable Wellington</option>
                    </Field>

                    <Space />
                    <br />

                    <span>
                      Food Allergies <FontAwesomeIcon style={{ fontSize: '.8rem', color: '#A64444' }} icon={faStarOfLife} size='xs' />
                    </span>
                    {ALLERGY_OPTIONS.map(allergy => (
                      <div key={allergy}>
                        <Field
                          as='input'
                          type="checkbox"
                          name={`members.${index}.foodAllergies`}
                          id={`allergy-${member.id}-${allergy}`}
                          value={allergy}
                          checked={member.foodAllergies.includes(allergy)}
                          onChange={(event) => handleAllergyChange(event, setFieldValue, values, index)}
                        />
                        <label htmlFor={`allergy-${member.id}-${allergy}`}>{allergy}</label>
                      </div>
                    ))}
                    {member.foodAllergies.includes('Other') && (
                      <>
                        <Field
                          as={InputSm}
                          type="text"
                          name={`members.${index}.otherFoodAllergy`}
                          placeholder="Specify other allergy..."
                          value={member.otherFoodAllergy || ''}
                          style={{ marginTop: '1rem' }}
                        />
                        <br />
                        <br />
                      </>
                    )}
                    <br />
                    <Space />

                    { member.id === userId && (
                      <>
                        <span>Planned Transportation</span>
                        <Field
                          as={StyledSelect}
                          name="plannedTransportation"
                          value={values.plannedTransportation}
                        >
                          <option value="" disabled>Select</option>
                          <option value="renting_a_car">Renting a Car</option>
                          <option value="uber_or_lyft">Uber or Lyft</option>
                          <option value="carpooling">Carpooling</option>
                        </Field>
                        <br />
                        <Space />
                      </>
                    )}

                    <span>Special Sipping Preference</span>
                    <Field name={`members.${index}.specialSippingPreference`} as={StyledSelect}>
                      <option value="" disabled>Select</option>
                      <option value="ipa">IPA</option>
                      <option value="pilsner">Pilsner</option>
                      <option value="classic_cocktails">Classic Cocktails</option>
                      <option value="na_mocktails">NA | Mocktails</option>
                      <option value="red_wine">Red Wine</option>
                      <option value="white_wine">White Wine</option>
                      <option value="rose">Rose</option>
                    </Field>

                    <br />
                    <Space />
                  </div>
                ))}
              </StyledFieldArray>
            )}
          </FieldArray>
          <SubmitButton type="submit" disabled={isSubmitting || !isValid || !dirty}>
            Submit
          </SubmitButton>
        </Form>
      )}
    </Formik>
  );
};
