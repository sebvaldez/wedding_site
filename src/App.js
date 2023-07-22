import React from 'react';
import styled from 'styled-components';
import HeroSection from './components/HeroContainer';
import Timeline from './components/Timeline';
import Container from './components/Container'

const StyledSectionTitle = styled.h2`
    font-size: 2.2rem;  // Increase the size for the title
    margin-bottom: 1.5rem;  // Space below the h2 heading
    font-weight: thin;  // Bold font weight to make it stand out
    color: #333;  // Darker color for more contrast
`;

const Section = ({ title, children, ...containerProps }) => (
  <Container {...containerProps}>
    {title && <StyledSectionTitle>{title}</StyledSectionTitle>}
    {children}
  </Container>
);

const ResponsiveImage = styled.img`
  width: 100%;
  height: auto;
  display: block;  // To remove any spacing below the image
  margin: 1rem 0;  // Add some spacing above and below the image
`;

const InvitationSection = styled.div`
  padding: 2rem 0.2rem;
  text-align: center;

  h1 {
    font-size: 1.5rem;  // Start with a suitable size for mobile
  }

  p {
    font-size: 1rem;  // Start with a suitable size for mobile
  }

  // Increase font sizes for larger screens
  @media (min-width: 768px) {
    h1 {
      font-size: 2.5rem;
    }

    p {
      font-size: 1.5rem;
    }
  }

  @media (min-width: 1200px) {
    h1 {
      font-size: 3rem;
    }

    p {
      font-size: 2rem;
    }
  }
`;

const RelationshipSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1rem 0;

  h2 {
    font-size: 1.5rem;  // Increase the size for this particular section
    margin-bottom: 1rem;  // Space below the h2 heading
    font-weight: thin;  // Bold font weight to make it stand out
    color: #333;  // Darker color for more contrast, can adjust as needed
  }

  div {
    text-align: center;
    margin-bottom: 1.5rem;
  }
`;

// const InfoWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1rem; // Space between stacked sections

//   @media (min-width: 768px) { // For desktop and above
//     flex-direction: row;
//     justify-content: space-between;
//   }
// `;
const InfoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap; // This will allow sections to wrap to the next line if they don't fit
  justify-content: space-between; // Provides even spacing between the sections

  @media (max-width: 768px) { // For mobile
    flex-direction: column; // Stack the sections vertically for mobile
    align-items: center; 
  }
`;

// const InfoSection = styled.div`
//   flex: 1;
//   margin: 1rem; // Increased spacing around each section for mobile
//   font-size: 0.9em; // Slightly reduced font size for mobile
  
//   @media (min-width: 768px) { // For desktop and above
//     margin: 0;
//     max-width: calc(33% - 1rem); // Distributes the space evenly between sections with a gap in between
//     font-size: 1em; // Resets the font size to default for desktop
//   }
// `;

const InfoSection = styled.div`
  flex: 1;
  margin: 1rem; 
  font-size: 0.9em; 
  width: 100%; // Takes full width on mobile
  
  @media (min-width: 768px) {
    margin: 0 1rem; // Adds horizontal margin on desktop
    max-width: calc(33.33% - 2rem); // Divided by three minus the left and right margins
    font-size: 1em; 
  }
`;



function App() {
  return (
    <>
      <HeroSection
        backgroundImage="https://theevergreenpdx.com/app/uploads/2015/11/Staheli-Wedding-247-FINAL-2550x1700.jpg"
        heroText="Allegra & Sebastian"
        subText="September 8, 2024 · Portland, Oregon"
        buttonText='RSVP'
        buttonLink='/rsvp'
      />

      <InvitationSection>
        <h1>Please join us on September 8, 2024 as we celebrate our wedding in Portland, Oregon.</h1>
        <br />
        <p>Cocktail | Formal Attire</p>
      </InvitationSection>

        <ResponsiveImage src="https://picsum.photos/800/550" alt="Wedding invitation" />

        <Section title="Our Relationship" md={800}>
          <RelationshipSection>
            <div>
              <h2>He said:</h2>
              {/* Content or story about him will go here */}
            </div>
            <div>
              <h2>She said:</h2>
              {/* Content or story about her will go here */}
            </div>
          </RelationshipSection>
        </Section>
        <InfoWrapper>
          <InfoSection>
            <Section title="Location">
              <span style={{ textDecoration: 'underline', color: 'blue' }}>The Evergreen 618 Alder St Portland, Oregon</span>
            </Section>
          </InfoSection>
          
          <InfoSection>
            <Section title="Arrival">
              <p>Should you arrive prior to the 4 PM entry time, you are welcome to pop into The Loyal Legion Bar and Restaurant next door and grab a drink until it is time for entry.</p>
              <p>Please do not enter the venue prior to 4 PM unless otherwise requested by the couple, so as to permit our vendors to complete their set up without interruption.</p>
            </Section>
          </InfoSection>

          <InfoSection>
            <Section title="Weather">
              <p>This is a climate controlled, indoor event venue with central AC | Heat.</p>
              <p>Guests should expect outdoor temperatures between 85 and 75 degrees.</p>
            </Section>
          </InfoSection>
        </InfoWrapper>

      <Section md={800}>
        <Timeline />
      </Section>
    </>
  );
}

export default App;
