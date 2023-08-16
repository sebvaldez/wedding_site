import styled from 'styled-components'

export const Input = styled.input`
  font-size: 1.5rem;  // larger font for visibility
  padding: 1rem;      // increased padding for touch targets
  width: 100%;        // utilizing the full width
  border: none;       // removing all borders
  border-bottom: 1px solid #d9d9d9;  // subtle bottom border
  background-color: transparent;     // clear background
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-bottom-color: #8AA399;  // sage green color when focused
  }
`;
