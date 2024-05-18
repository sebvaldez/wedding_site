import  Section  from './layout/Section';

export default function CocktailAttire() {
  return (
      <Section style={{ gap: '.5rem'}} title='Guest Attire'>
        <p style={{ fontSize: '1.5rem'}}><em>Cocktail Formal</em></p>
        <p>Please refrain from wearing the following items:</p>
        <p>Denim, Shorts, Baseball Caps, Athletic Wear, Athletic Shoes.</p>

        <a href="https://pin.it/1UjE8D8I9" target='_blank' rel="noopener noreferrer">
          <p style={{ paddingTop: '.2rem', fontWeight: '600'}}><em>Need inspiration? <u>CLICK HERE</u></em></p>
        </a>
      </Section>
  )
};
