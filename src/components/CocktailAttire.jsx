import  Section  from './layout/Section';

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

    <img
      style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
      src="https://static-image-bucket-service-dev.s3.us-west-2.amazonaws.com/homepage/attire_img_v2.png"
      alt="Wedding Attire infographic"
    />
  </Section>
  )
}


