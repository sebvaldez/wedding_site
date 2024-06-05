import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { COLOR_PALETTE } from '../../styles/Colors';

const StyledCard = styled.div`
  background-color: ${COLOR_PALETTE.cream};
  border-radius: 8px;
  padding: 32px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.15);
  }
`;

const Title = styled.h2`
  color: ${COLOR_PALETTE.darkGreen};
  margin: 0;
  font-size: 24px;
`;

const IconWrapper = styled.div`
  color: ${COLOR_PALETTE.gold};
  font-size: 32px;
`;

// Main Card component
const Card = ({ children, onClick }) => {
  return <StyledCard onClick={onClick}>{children}</StyledCard>;
};

// Subcomponent for Card Title
Card.Title = ({ children }) => {
  return <Title>{children}</Title>;
};

// Subcomponent for Card Icon
Card.Icon = ({ icon, size = 'xl' }) => {
  return (
    <IconWrapper>
      <FontAwesomeIcon icon={icon} size={size} />
    </IconWrapper>
  );
};

export default Card;
