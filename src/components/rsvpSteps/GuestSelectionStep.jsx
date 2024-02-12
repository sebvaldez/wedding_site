import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarOfLife } from '@fortawesome/free-solid-svg-icons';
import { Label } from '../common/formStyles';

const StyledSelection = styled.div`
  margin-bottom: 2.5rem;
  padding: 0 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  @media (min-width: 768px) {
      /* flex-direction: row; */
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

export const GuestSelectionStep = ({ formik }) => {

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    formik.setFieldValue(name, checked);
  };

  return (
    <StyledSelection>
      <GuestName>
      Guest Selections
      </GuestName>
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
      </Label>
    </StyledSelection>
  );
};
