import styled from 'styled-components';

const ErrorMessageStyle = styled.h2`
  font-size: 1rem;
  height: 30px;
  font-weight: 500;
  color: #A64444;
`

export const ErrorMessage = ({ field, ...props }) => (
  <ErrorMessageStyle field={field} {...props} />
)