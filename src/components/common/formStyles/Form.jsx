import styled from 'styled-components'


// I think txt page is using this:
// const FormStyled = styled.form`
//   display: flex;
//   gap: .5rem;
//   flex-direction: column;
// `;
const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;  // Centers the children horizontally in the column
  justify-content: center;  // Centers vertically, useful if form takes full page height
  width: 100%;  // Takes full width of its container
  max-width: 500px;  // Maximum width of the form
  margin: 0 auto;  // Centers the form in the page horizontally
`;



export const ScrollableContainer = styled.div`
  max-height: 420px;
  overflow-y: auto;
  margin-bottom: 1rem;
`;


export const Form = ({ field, ...props }) => (
  <FormStyled field={field} {...props} />
)