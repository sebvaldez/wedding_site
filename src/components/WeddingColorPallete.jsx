import styled from 'styled-components';
import Section from './layout/Section';
import {COLOR_PALETTE} from '../styles/Colors';

const PalletContainer = styled.div`
  max-width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 1rem;
  margin-top: 1rem;
  padding: 1rem;
  overflow-x: auto; /* Allows for horizontal scrolling on smaller screens if necessary */

  @media (min-width: 768px) {
    max-width: 55%;
    justify-content: center; /* Center items for larger screens */
    overflow-x: hidden; /* Prevent horizontal scrolling on larger screens */
  }
`;

const PaletteColor = styled.div`
  border-radius: 50%;
  height: 80px;
  width: 80px;
  background-color: ${props => props.backgroundColor};

  @media (min-width: 768px) {
    height: 120px;
    width: 120px;
  }
`;

export const WeddingColorPallete = () => (
  <Section title='Wedding Colors'>
  <PalletContainer>
    {
      Object.keys(COLOR_PALETTE).map((color, index) => (
        <PaletteColor key={index} backgroundColor={COLOR_PALETTE[color]} />
      ))
    }
  </PalletContainer>
  </Section>
)