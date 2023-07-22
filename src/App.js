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
  padding: 2rem 1.4rem;
  text-align: center;

  h1 {
    font-size: 1.2rem;  // Start with a suitable size for mobile
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

const InfoWrapper = styled.section`
  display: flex;
  flex-wrap: wrap; // This will allow sections to wrap to the next line if they don't fit
  justify-content: space-between; // Provides even spacing between the sections
  @media (max-width: 768px) { // For mobile
    flex-direction: column; // Stack the sections vertically for mobile
    align-items: center;
  }
`;

const InfoSection = styled.div`
  flex: 1;
  margin: 1rem;
  font-size: 0.9em;
  // width: 100%; // Takes full width on mobile
  padding: .8rem 0;
  text-align: center;

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
        backgroundImage="https://lh3.googleusercontent.com/pw/AIL4fc_pV4EI6MopIz1PGfgJbV-RnSt__AKCpxwloDSLLZyXMsEEXZuFV4jVGywAAPlEZpjhdJMjQU0nCGEiv5h5uayK6G-VvTCL1M4hYauOtSwBX5jF3lMGWY-QMKCknSmbuD0S67ypxQVg2UVsioEMxGbC=w1440-h1800-s-no?authuser=0"
        heroText='Allegra & Sebastian'
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
            <h2><em>He said...</em></h2>
            <blockquote>I love my bee bee</blockquote>
          </div>

          <div>
            <h2><em>She said...</em></h2>
            <blockquote>I love my bee bee</blockquote>
          </div>
        </RelationshipSection>
      </Section>

      <InfoWrapper>
        <HeroSection
          height={'380px'}
          backgroundImage="https://theevergreenpdx.com/app/uploads/2015/11/Staheli-Wedding-247-FINAL-2550x1700.jpg"
          heroText='Wedding Day'
        />
        <InfoSection>
          <Section title="Location">
            <span style={{ textDecoration: 'underline', color: 'blue', textAlign: 'center' }}>The Evergreen <br /> 618 Alder St <br /> Portland, Oregon</span>
          </Section>
        </InfoSection>

        <InfoSection>
          <Section title="Weather">
            <p>This is a climate controlled, indoor event venue with central AC | Heat.</p>
            <br />
            <p>Guests should expect outdoor temperatures between 85 and 75 degrees.</p>
          </Section>
        </InfoSection>

        <InfoSection>
          <Section title="Arrival">
            <p>Should you arrive prior to the 4 PM entry time, you are welcome to pop into The Loyal Legion Bar and Restaurant next door and grab a drink until it is time for entry.</p>
            <br />
            <p>Please do not enter the venue prior to 4 PM unless otherwise requested by the couple, so as to permit our vendors to complete their set up without interruption.</p>
          </Section>
        </InfoSection>

        <InfoSection>
          <Section md={800} title='Event Timeline'>
            <Timeline />
          </Section>
        </InfoSection>
      </InfoWrapper>


    </>
  );
}

export default App;
