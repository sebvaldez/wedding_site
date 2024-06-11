import styled, { keyframes } from 'styled-components';

const bubble = keyframes`
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
`;

const sizeMap = {
  sm: '5px',
  md: '10px',
  lg: '15px'
};

const EllipsesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const Dot = styled.div`
  width: ${props => sizeMap[props.size] || '10px'};
  height: ${props => sizeMap[props.size] || '10px'};
  background-color: ${props => props.color || 'black'};
  border-radius: 50%;
  animation: ${bubble} 1s infinite;

  &:nth-child(2) {
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

export const LoadingEllipse = ({ color, size }) => (
  <EllipsesContainer>
    <Dot color={color} size={size}></Dot>
    <Dot color={color} size={size}></Dot>
    <Dot color={color} size={size}></Dot>
  </EllipsesContainer>
);
