import React from 'react';
import styled from 'styled-components';
import Container from '../common/Container';

const StyledSectionTitle = styled.h2`
    font-size: 2.2rem;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    font-weight: thin;
    color: #333;

    @media (min-width: 1025px) {
      margin-top: ${props => props.marginTop || '1rem'};
      font-size: 3.2rem;
    }
`;

const Section = ({ title, marginTop, icon, children, ...containerProps }) => (
  <Container {...containerProps}>
    {title && (
      <StyledSectionTitle marginTop={marginTop}>
        {title}
        {icon && icon}
      </StyledSectionTitle>
    )}
    {children}
  </Container>
);

export default Section;