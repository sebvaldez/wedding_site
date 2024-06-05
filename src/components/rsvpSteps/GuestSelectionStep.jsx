import React from 'react';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import { useSelector } from '@xstate/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarOfLife } from '@fortawesome/free-solid-svg-icons';
import Space from '../common/Space';
import { Label, InputSm, SubmitButton } from '../common/formStyles';

const StyledSelection = styled.div`
  margin-bottom: 2.5rem;
  padding: 0 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  @media (min-width: 768px) {
      flex-wrap: wrap;
      justify-content: space-between;
  }
`;

const StyledSelect = styled.select`
  padding: 0.8rem;  // Increased padding for dropdowns too
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1.2rem;  // Increased font-size for dropdowns
  width: 100%;
  box-sizing: border-box;
`;

const GuestName = styled.div`
  font-size: 2rem;
  font-weight: 300;
  text-align: center;
  padding: 0 0 1.2rem 0;
`;

const SubText = styled.div`
  font-size: 1rem; /* Smaller font size for subtext */
  font-weight: 200; /* Lighter weight */
  text-align: center;
  padding: 0;
  margin-top: -1rem; /* Optional: Adjust spacing as needed */
`;

const ALLERGY_OPTIONS = ['None', 'Peanut', 'Gluten', 'Dairy', 'Eggs', 'Seafood', 'Tree Nuts', 'Soy', 'Other'];

export const GuestSelectionStep = ({ actor, send }) => {
  const {
    firstName,
    lastName,
    dinnerSelection,
    foodAllergies,
    plannedTransportation,
    specialSippingPreference,
    rsvpTextUpdates,
    otherFoodAllergy
  } = useSelector(actor, s => s?.context);

  const handleAllergyChange = (event, setFieldValue, values) => {
    const { value, checked } = event.target;
    if (value === 'None') {
      if (checked) {
        setFieldValue('foodAllergies', ['None']);
        setFieldValue('otherFoodAllergy', '');
      } else {
        setFieldValue('foodAllergies', []);
      }
    } else {
      let allergies = values.foodAllergies.filter(a => a !== 'None');
      if (checked) {
        allergies = [...allergies, value];
      } else {
        allergies = allergies.filter(a => a !== value);
      }
      setFieldValue('foodAllergies', allergies);
    }
  };

  const isDinnerSelected = (dinnerSelection) => {
    return !!dinnerSelection && dinnerSelection !== "";
  };

  const areAllergiesSelected = (foodAllergies) => {
    return foodAllergies.length > 0
  };

  const handleSubmit = (values) => {
    console.log('Form Values:', JSON.stringify(values, null, 2));
    send({ type: 'USER_CONFIRMED_PREFERENCES', values })
  }

  return (
    <Formik
      initialValues={{
          firstName,
          lastName,
          dinnerSelection,
          foodAllergies,
          plannedTransportation,
          specialSippingPreference,
          rsvpTextUpdates,
          otherFoodAllergy
      }}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <StyledSelection>

            <GuestName>
              {dinnerSelection
                ? `Welcome back, ${firstName}!`
                : "Guest Selections"
              }
            </GuestName>

            {dinnerSelection && <SubText>You can change your selection until August 15th, 2024.</SubText>}

            {/* Selector for dinner selection */}
            <Label>
              <span>
                Dinner Selection <FontAwesomeIcon style={{ fontSize: '.8rem', color: '#A64444' }} icon={faStarOfLife} size='xs' />
              </span>
              <Field
                as={StyledSelect}
                name="dinnerSelection"
                value={values.dinnerSelection}
              >
                <option value="" disabled>Select</option>
                <option value="balsamic_rosemary_chicken">Balsamic Rosemary Chicken</option>
                <option value="grilled_vegetable_wellington">Grilled Vegetable Wellington</option>
              </Field>
            </Label>

            {/* Selector for Food allergies */}
            <Label>
              <span>
                Food Allergies <FontAwesomeIcon style={{ fontSize: '.8rem', color: '#A64444' }} icon={faStarOfLife} size='xs' />
              </span>
              <div>
                {/* Dynamically generate checkboxes for allergies */}
                {ALLERGY_OPTIONS.map(allergy => (
                  <div key={allergy}>
                    <Field
                      as='input'
                      type="checkbox"
                      name="foodAllergies"
                      id={`allergy-${allergy}`}
                      value={allergy}
                      checked={values.foodAllergies.includes(allergy)}
                      onChange={(event) => handleAllergyChange(event, setFieldValue, values)}
                    />
                    <label htmlFor={`allergy-${allergy}`}>{allergy}</label>
                  </div>
                ))}
                <Space />
                {values.foodAllergies.includes('Other') && (
                  <Field
                    as={InputSm}
                    type="text"
                    name="otherFoodAllergy"
                    placeholder="Specify other allergy..."
                    value={values.otherFoodAllergy}
                    style={{ marginTop: '1rem' }}
                  />
                )}
              </div>
            </Label>

            {/* Selector for transportation */}
            <Label>
              Planned Transportation
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
            </Label>

            {/* Selector for Drink preferences */}
            <Label>
              Special Sipping Preference
              <Field
                as={StyledSelect}
                name="specialSippingPreference"
                value={values.specialSippingPreference}
              >
                <option value="" disabled>Select</option>
                <option value="ipa">IPA</option>
                <option value="pilsner">Pilsner</option>
                <option value="classic_cocktails">Classic Cocktails</option>
                <option value="na_mocktails">NA | Mocktails</option>
                <option value="red_wine">Red Wine</option>
                <option value="white_wine">White Wine</option>
                <option value="rose">Rose</option>
              </Field>
            </Label>

            {/* Checkbox for RSVP text updates */}
            <div style={{ marginTop: '10px' }}>
              <Field
                type="checkbox"
                id="rsvpTextUpdates"
                name="rsvpTextUpdates"
                checked={values.rsvpTextUpdates}
              />
              <label htmlFor="rsvpTextUpdates">
                Send me my RSVP confirmation and invite link via text message.
              </label>
            </div>
          <SubmitButton  disabled={!isDinnerSelected(values.dinnerSelection) || !areAllergiesSelected(values.foodAllergies)}  type="submit">Submit</SubmitButton>
          </StyledSelection>
        </Form>
      )}
    </Formik>
  );
};
