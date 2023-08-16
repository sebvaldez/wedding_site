import React from 'react';
import styled from 'styled-components';
import Container from '../common/Container';

const StyledSectionTitle = styled.h2`
    font-size: 2.2rem;  // Increase the size for the title
    margin-bottom: 1.5rem;  // Space below the h2 heading
    font-weight: thin;  // Bold font weight to make it stand out
    color: #333;  // Darker color for more contrast
`;

const Section = ({ title, icon, children, ...containerProps }) => (
  <Container {...containerProps}>
    {title && <StyledSectionTitle>{title} {icon && icon}</StyledSectionTitle>}
    {children}
  </Container>
);

export default Section;