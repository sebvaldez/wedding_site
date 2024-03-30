import styled from 'styled-components';
import {COLOR_PALETTE} from '../styles/Colors';
import  Section  from './layout/Section';

const PalletContainer = styled.div`
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


export default function CocktailAttire() {
  return (
    <Section title='Cocktail Attire'>
    <p>
      All guests are welcome (but not required) to dress in our color palette!
    </p>

    <br />

    <h2><em style={{ fontWeight: '600'}}>Please refrain from wearing the following items:</em></h2>
    <p style={{paddingBottom: '1.2rem'}}>
      <em style={{ fontWeight: '600'}}>Denim, Shorts, Baseball Caps, Athletic Wear, Athletic Shoes.</em>
    </p>

    <PalletContainer>
      {
        Object.keys(COLOR_PALETTE).map((color, index) => (
          <PaletteColor key={index} backgroundColor={COLOR_PALETTE[color]} />
        ))
      }
    </PalletContainer>
  </Section>
  )
};
