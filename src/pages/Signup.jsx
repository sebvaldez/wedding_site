import React from 'react';
import { Input, SubmitButton } from '../components/common/formStyles';
import styled from 'styled-components';

const StyledHeader = styled.h1`
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 1rem;
  text-align: center;
  color: #333;  // Adjust the color if needed
`;

const StyledPageContainer = styled.div`
  margin-top: 0rem;
  padding-bottom: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  /* height: 90vh; */

  @media (max-width: 768px) {  // Adjust for mobile devices
    padding: 1rem;
    gap: 1rem;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  margin-bottom: 2.5rem;
  width: 100%;

  @media (max-width: 768px) {  // Adjust for mobile devices
    padding: 1rem;
  }
`;

const OptInContainer = styled.div`
  display: flex;
  align-items: center;
`;

const OptInMessage = styled.label`
  font-size: 0.8rem;
  color: #333;
  margin-left: 0.5rem;
`;

const StyledLink = styled.a`
  color: darkgray;
  font-weight: 700;
  text-decoration: underline;
`;

const LargeCheckbox = styled(Input)`
  width: 20px;  // Increase width
  height: 20px;  // Increase height
  cursor: pointer;  // Cursor pointer for better UX
`;

export default function Signup() {
  return (
    <StyledPageContainer>
      <StyledHeader>
        Become a Member
      </StyledHeader>
      <StyledForm>
        <label htmlFor="firstname">First Name</label>
        <Input type="text" name="firstname" id="firstname" />

        <label htmlFor="lastname">Last Name</label>
        <Input type="text" name="lastname" id="lastname" />

        <label htmlFor="email">Email</label>
        <Input type="email" name="email" id="email" />

        <label htmlFor="password">Password</label>
        <Input type="password" name="password" id="password" />

        <label htmlFor="confirm-password">Confirm Password</label>
        <Input type="password" name="confirm-password" id="confirm-password" />

        <OptInContainer>
          <LargeCheckbox type="checkbox" name="opt-in" id="opt-in" />
          <OptInMessage htmlFor="opt-in">
            Join our event circle! Opt in to receive important updates and personalized RSVP links for our events. Enjoy exclusive, early access to our latest happenings. We'll send updates occasionally—no spam. Message and data rates may apply. Text STOP to unsubscribe anytime. For more info, visit our <StyledLink href="LINK_TO_YOUR_PRIVACY_POLICY">Privacy Policy</StyledLink> and <StyledLink href="LINK_TO_YOUR_TERMS_AND_CONDITIONS">Terms & Conditions</StyledLink>.
          </OptInMessage>
        </OptInContainer>

        <SubmitButton type="submit">Submit</SubmitButton>
      </StyledForm>
    </StyledPageContainer>
  )
}

