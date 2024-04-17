import styled from 'styled-components'

export const Form = styled.form`
  display: flex;
  gap: .5rem;
  flex-direction: column;

  & > *:nth-last-child(2) {
    padding-bottom: 1.3rem;
  }
`;