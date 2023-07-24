import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faCircleInfo, faCloudSun, faMapPin, } from '@fortawesome/free-solid-svg-icons';
import Modal from './components/Modal';
import HeroSection from './components/HeroContainer';
import Timeline from './components/Timeline';
import Container from './components/Container'
import InfoWrapper from './components/InfoWrapper';
import InfoSection from './components/InfoSection';
import ResponsiveImage from './components/ResponsiveImage'

const StyledSectionTitle = styled.h2`
    font-size: 2.2rem;  // Increase the size for the title
    margin-bottom: 1.5rem;  // Space below the h2 heading
    font-weight: thin;  // Bold font weight to make it stand out
    color: #333;  // Darker color for more contrast
`;

const Section = ({ title, icon, children, ...containerProps }) => (
  <Container {...containerProps}>
    {title && <StyledSectionTitle>{title} {icon && icon}</StyledSectionTitle>}
    {children}
  </Container>
);

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

function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <HeroSection
        backgroundImage="https://lh3.googleusercontent.com/pw/AIL4fc_pV4EI6MopIz1PGfgJbV-RnSt__AKCpxwloDSLLZyXMsEEXZuFV4jVGywAAPlEZpjhdJMjQU0nCGEiv5h5uayK6G-VvTCL1M4hYauOtSwBX5jF3lMGWY-QMKCknSmbuD0S67ypxQVg2UVsioEMxGbC=w1440-h1800-s-no?authuser=0"
        HeroTextFontWeight={'500'}
        heroText='Allegra & Sebastian'
        subText="September 8, 2024 Portland, Oregon"
        buttonText='RSVP'
        buttonLink='/rsvp'
      />

      <InvitationSection>
        <h1>Please join us on September 8, 2024 as we celebrate our wedding in Portland, Oregon.</h1>
        <br />
        <p onClick={() => setModalOpen(true)}>Cocktail | Formal Attire <FontAwesomeIcon icon={faCircleInfo} size='md' /></p>
      </InvitationSection>

      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          {/* Your responsive image */}
          <img src="https://www.paperlesspost.com/blog/wp-content/uploads/info_cocktail_6-01.png" alt="Cocktail | Formal Attire"  style={{ maxWidth: '100%', height: 'auto' }} />
        </Modal>
      )}

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
          HeroTextFontWeight={'500'}
          heroText='Wedding Day'
        />
        <InfoSection>
          <Section title="Location" icon={<FontAwesomeIcon icon={faMapPin} size='sm' />}>
            <Link to='https://www.google.com/maps/place/The+Evergreen/@45.5178488,-122.6592722,17z/data=!3m1!4b1!4m6!3m5!1s0x5495a0a72fdd55f3:0x74f7e22136d74a4e!8m2!3d45.5178488!4d-122.6592722!16s%2Fg%2F11c3vxydlr?entry=ttu' target='_blank'>
              The Evergreen <br /> 618 Alder St <br /> Portland, Oregon
            </Link>
          </Section>
        </InfoSection>

        <InfoSection>
          <Section title="Weather" icon={<FontAwesomeIcon icon={faCloudSun} size='sm' />}>
            <p>This is a climate controlled, indoor event venue with central AC | Heat.</p>
            <br />
            <p>Guests should expect outdoor temperatures between 85 and 75 degrees.</p>
          </Section>
        </InfoSection>

        <InfoSection>
          <Section title="Arrival" icon={<FontAwesomeIcon icon={faCar} size='sm' />}>
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
