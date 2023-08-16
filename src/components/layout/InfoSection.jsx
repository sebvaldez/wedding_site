import React from 'react';
import styled from 'styled-components';

const StyledInfoSection = styled.div`
  margin: 1rem;
  font-size: 0.9em;
  padding: .8rem 0;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 1em;

    ${props => props.spanColumns && `
      grid-column: span 3;
    `}
  }
`;

const InfoSection = ({ children, spanColumns = false }) => {
  return <StyledInfoSection spanColumns={spanColumns}>{children}</StyledInfoSection>
}

export default InfoSection;