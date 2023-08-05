import React from 'react';
import styled from 'styled-components';

const StyledInfoWrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr; /* by default one column for mobile */
  gap: 1rem; /* a little space between rows */

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr); /* three columns for desktop/tablet */
  }
`;

const InfoWrapper = ({ children }) => {
  return <StyledInfoWrapper>{children}</StyledInfoWrapper>;
};

export default InfoWrapper;
