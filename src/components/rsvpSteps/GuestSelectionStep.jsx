import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarOfLife } from '@fortawesome/free-solid-svg-icons';
import Space from '../common/Space';
import { Label, InputSm } from '../common/formStyles';

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

const ALLERGY_OPTIONS = ['None', 'Peanut', 'Gluten', 'Dairy', 'Eggs', 'Seafood', 'Tree Nuts', 'Soy', 'Other'];

export const GuestSelectionStep = ({ formik }) => {

  const handleAllergyChange = (event) => {
    const { value, checked } = event.target;
    let allergies = [...formik.values.foodAllergies] || [];

    if (value === 'None' && checked) {
      // If "None" is selected, reset the allergies array to just include "None"
      allergies = ['None'];
      formik.setFieldValue('otherFoodAllergy', '');
    } else if (checked) {
      // Remove "None" if it exists when selecting any other allergy
      allergies = allergies.filter(allergy => allergy !== 'None');
      allergies.push(value);
    } else {
      // Remove the unchecked value
      allergies = allergies.filter(allergy => allergy !== value);
    }

    // If "Other" is unchecked, clear the otherFoodAllergy field
    if (value === 'Other' && !checked) {
      formik.setFieldValue('otherFoodAllergy', '');
    }

    formik.setFieldValue('foodAllergies', allergies);
  };

  const isOtherSelected = formik.values.foodAllergies.includes('Other');

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    formik.setFieldValue(name, checked);
  };

  return (
    <StyledSelection>
      <GuestName>
      Guest Selections
      </GuestName>

      {/* Selector for dinner selection */}
      <Label>
        <span>
          Dinner Selection <FontAwesomeIcon style={{ fontSize: '.8rem', color: '#A64444' }} icon={faStarOfLife} size='xs' />
        </span>
        <StyledSelect
          name="dinnerSelection"
          value={formik.values.dinnerSelection}
          onChange={formik.handleChange}
        >
          <option value="" disabled>Select</option>
          <option value="Vegetable Polenta Torte">Vegetable Polenta Torte</option>
          <option value="Chicken Saltimcbocca">Chicken Saltimcbocca</option>
          <option value="Kid's Buffet">Kid's Buffet</option>
        </StyledSelect>
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
              <input
                type="checkbox"
                id={`allergy-${allergy}`}
                name="foodAllergies"
                value={allergy}
                checked={formik.values.foodAllergies.includes(allergy)}
                onChange={handleAllergyChange}
              />
              <label htmlFor={`allergy-${allergy}`}>{allergy}</label>
            </div>
          ))}
          <Space />
          {isOtherSelected && (
            <>
            <InputSm
              type="text"
              name="otherFoodAllergy"
              placeholder="Specify other allergy..."
              value={formik.values.otherFoodAllergy || ''}
              onChange={formik.handleChange}
              style={{ marginTop: '1rem' }}
            />
            <Space marginBottom='1.5rem' />
            </>
          )}
        </div>
      </Label>

      {/* Selector for transportation */}
      <Label>
        Planned Transportation
        <StyledSelect
          name="plannedTransportation"
          value={formik.values.plannedTransportation}
          onChange={formik.handleChange}
        >
          <option value="" disabled>Select</option>
          <option value="Renting a Car">Renting a Car</option>
          <option value="Uber or Lyft">Uber or Lyft</option>
          <option value="Carpooling">Carpooling</option>
        </StyledSelect>
      </Label>

      {/* Selector for Drink preferences */}
      <Label>
        Special Sipping Preference
        <StyledSelect
          name="specialSippingPreference"
          value={formik.values.specialSippingPreference}
          onChange={formik.handleChange}
        >
          <option value="" disabled>Select</option>
          <option value="IPA">IPA</option>
          <option value="Pilsner">Pilsner</option>
          <option value="Classic Cocktails">Classic Cocktails</option>
          <option value="NA | Mocktails">NA | Mocktails</option>
          <option value="Red Wine">Red Wine</option>
          <option value="White Wine">White Wine</option>
          <option value="Rose">Rose</option>
        </StyledSelect>
      </Label>

      {/* Checkbox for RSVP text updates */}
      <div style={{ marginTop: '10px' }}>
        <input
          type="checkbox"
          id="rsvpTextUpdates"
          name="rsvpTextUpdates"
          checked={formik.values.rsvpTextUpdates}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="rsvpTextUpdates">
          Send me my RSVP confirmation and invite link via text message.
        </label>
      </div>
    </StyledSelection>
  );
};
