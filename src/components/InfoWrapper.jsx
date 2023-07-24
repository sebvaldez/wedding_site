import React from 'react';
import styled from 'styled-components';

const StyledInfoWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const InfoWrapper = ({ children }) => {
  return <StyledInfoWrapper>{children}</StyledInfoWrapper>;
};

export default InfoWrapper;