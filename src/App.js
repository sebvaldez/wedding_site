import React from 'react';
import styled from 'styled-components';
import HeroSection from './components/layout/HeroContainer';
import Section from './components/layout/Section';
import ResponsiveImage from './components/layout/ResponsiveImage'
import SheSaidQuote from './components/SheSaidQuote';
import HeSaidQuote from './components/HeSaidQuote';

const InvitationSection = styled.div`
  padding: 2rem 1.4rem;
  text-align: center;

  h1 {
    font-size: 1.3rem;  // Start with a suitable size for mobile
  }

  p {
    font-size: 1rem;  // Start with a suitable size for mobile
  }

  // Increase font sizes for tablets but not desktops
  @media (min-width: 768px) and (max-width: 1199px) {
    h1 {
      font-size: 1.8rem;
    }

    p {
      font-size: 4rem;
    }
  }

  // Maintain font sizes for larger screens/desktops
  @media (min-width: 1200px) {
    h1 {
      font-size: 2.5rem;  // Retain the tablet size
    }

    p {
      font-size: 1.5rem;  // Retain the tablet size
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

      <Section title="Our Relationship"  marginTop="4rem">
        <RelationshipSection>
          <ResponsiveImage
            mobileHeight={'300px'}
            desktopHeight={'600px'}
            src='https://static-image-bucket-service-dev.s3.us-west-2.amazonaws.com/homepage/he_said_img_web.jpg'
          />
          <HeSaidQuote />

          <ResponsiveImage
            imagePosition={'50% 25%'}
            mobileHeight={'400px'}
            desktopHeight={'600px'}
            src='https://static-image-bucket-service-dev.s3.us-west-2.amazonaws.com/homepage/she_said_img_web.jpg'
            alt="A Photo of Allegra"
          />
          <SheSaidQuote />
        </RelationshipSection>
      </Section>
    </>
  );
}

export default App;
