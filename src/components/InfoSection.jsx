import React from 'react';
import styled from 'styled-components';

const StyledInfoSection = styled.div`
  flex: 1;
  margin: 1rem;
  font-size: 0.9em;
  // width: 100%; // Takes full width on mobile
  padding: .8rem 0;
  text-align: center;

  @media (min-width: 768px) {
    margin: 0 1rem; // Adds horizontal margin on desktop
    max-width: calc(33.33% - 2rem); // Divided by three minus the left and right margins
    font-ize: 1em;
  }
`;

const InfoSection = ({ children }) => {
  return <StyledInfoSection>{children}</StyledInfoSection>
}

export default InfoSection;