import styled from 'styled-components'

const InputStyle = styled.input`
  font-size: 1.5rem;  // Larger font for better readability
  padding: 0.5rem;  // Sufficient padding
  width: 100%;  // Takes full width of its container
  max-width: 40rem;  // Reasonable max width for large screens, adjust as needed
  border: none;
  border-bottom: 1px solid #d9d9d9;
  background-color: transparent;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-bottom-color: #8AA399;
  }

  @media (max-width: 768px) {
    font-size: 1rem;  // Smaller font for smaller devices
    padding: 0.25rem;  // Less padding to fit smaller screens better
  }
`;


export const InputSm = styled.input`
  font-size: 1rem;  // larger font for visibility
  padding: .5rem;      // increased padding for touch targets
  width: 100%;        // utilizing the full width
  border: none;       // removing all borders
  border-bottom: 1px solid #d9d9d9;  // subtle bottom border
  background-color: transparent;     // clear background
  transition: border-color 0.3s ease;
  text-align: center;
  &:focus {
    outline: none;
    border-bottom-color: #8AA399;  // sage green color when focused
  }
`;

export const Input = ({ field, ...props }) => (
  <InputStyle {...field} {...props} />
);

