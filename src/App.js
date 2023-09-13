import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import HeroSection from './components/layout/HeroContainer';
import Timeline from './components/Timeline';
import Section from './components/layout/Section';
import InfoWrapper from './components/InfoWrapper';
import InfoSection from './components/layout/InfoSection';
import ResponsiveImage from './components/layout/ResponsiveImage'
import SheSaidQuote from './components/SheSaidQuote';
import HeSaidQuote from './components/HeSaidQuote';
import WeatherSection from './components/WeatherSection';

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

  return (
    <>
      <HeroSection
        backgroundImage="https://static-image-bucket-service-dev.s3.us-west-2.amazonaws.com/homepage/asw_home_img_web.jpg"
        HeroTextFontWeight={'350'}
        overlay={false}
        heroText=' '
        subText=' '
      />

      <InvitationSection>
        <h1>
          <em>Please join us on September 8, 2024 as we celebrate our wedding in Portland, Oregon.</em>
        </h1>
      </InvitationSection>

      <Section title="Our Relationship">
        <RelationshipSection>
          <ResponsiveImage src='https://static-image-bucket-service-dev.s3.us-west-2.amazonaws.com/homepage/he_said_img_web.jpg'/>
          <div>
            <HeSaidQuote />
          </div>


          <ResponsiveImage height={'380px'} src='https://static-image-bucket-service-dev.s3.us-west-2.amazonaws.com/homepage/she_said_img_web.jpg'/>
          <div>
            <SheSaidQuote />
          </div>
        </RelationshipSection>
      </Section>

        <HeroSection
          height={'380px'}
          backgroundImage="https://static-image-bucket-service-dev.s3.us-west-2.amazonaws.com/homepage/the_evergreen.jpg"
          HeroTextFontWeight={'500'}
          heroText='Wedding Day'
        />
      <InfoWrapper>
        <InfoSection spanColumns>
          <Section title="Location">
              <Link to='https://www.google.com/maps/place/The+Evergreen/@45.5178488,-122.6592722,17z/data=!3m1!4b1!4m6!3m5!1s0x5495a0a72fdd55f3:0x74f7e22136d74a4e!8m2!3d45.5178488!4d-122.6592722!16s%2Fg%2F11c3vxydlr?entry=ttu' target='_blank'>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '.3rem', padding: '0 .2rem'}}>
                The Evergreen <br />
                618 Alder St <br />
                Portland, Oregon
              <FontAwesomeIcon style={{ marginBottom: '.3rem'}} icon={faUpRightFromSquare} size='2x' />
            </div>
              </Link>
          </Section>
        </InfoSection>

        <InfoSection spanColumns>
          <Section title='Event Attire'>
            <h1 style={{ fontSize: '1.5rem'}}>Cocktail</h1>
            <ResponsiveImage src="https://static-image-bucket-service-dev.s3.us-west-2.amazonaws.com/homepage/attire_img.png" alt="Wedding invitation" />
            <p>
              All guests are welcome (but not required) to dress in our color palette!
            </p>

            <br />

            <h2><em style={{ fontWeight: '600'}}>Please refrain from wearing the following items:</em></h2>
            <p>
              <em style={{ fontWeight: '600'}}>Denim, Shorts, Baseball Caps, Athletic Wear, Athletic Shoes.</em>
            </p>

          </Section>
        </InfoSection>

        <InfoSection spanColumns>
          <WeatherSection />
        </InfoSection>

        <InfoSection spanColumns>
          <Section title="Arrival">
            <p>Should you arrive prior to the 4 PM entry time, you are welcome to pop into The Loyal Legion Bar and Restaurant next door and grab a drink until it is time for entry.</p>
            <br />
            <p>Please do not enter the venue prior to 4 PM unless otherwise requested by the couple, so as to permit our vendors to complete their set up without interruption.</p>
          </Section>
        </InfoSection>

        <InfoSection spanColumns>
          <Section md={800} title='Event Timeline'>
            <Timeline />
          </Section>
        </InfoSection>
      </InfoWrapper>


    </>
  );
}

export default App;
