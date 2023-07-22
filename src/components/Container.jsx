import styled, { css } from 'styled-components';


const sizes = {
  xs: 480,
  sm: 768,
  md: 992,
  lg: 1200,
};

// Helper function to generate media queries
const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label]}px) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});


const Container = styled.section`
  // width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: .2rem .2rem;

  ${props => props.sm && media.sm`width: ${props.sm}px;`}
  ${props => props.md && media.md`width: ${props.md}px;`}
  ${props => props.lg && media.lg`width: ${props.lg}px;`}
`;

export default Container;
