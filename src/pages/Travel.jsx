import React from 'react';
import styled from 'styled-components'
import { useSpring, animated, config } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import HeroSection from '../components/layout/HeroContainer'
import usePosthog from '../hooks/usePostHog';

const TravelHeader = styled.h1`
  text-align: center;
  margin: 0 auto;
  font-size: 1rem;
  padding: 1.8rem;
  padding-bottom: 0;
  font-style: italic;
  font-weight: bold;

  @media (min-width: 1024px) {
    padding: 2rem 5rem 0 5rem;
    font-size: 1.5rem;
  }
`;

// Container for all cards
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
  /* padding-bottom: 2rem; */

  // For larger screens
  @media (min-width: 768px) {
    padding: 1.5rem 1.2rem 3rem 1.2rem;
    flex-direction: row;
    align-items: baseline;
  }
`;

// Individual card style
const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  margin: 1rem 0; // Add some vertical spacing between cards on mobile
  flex-grow: .1;
  background-color: ${props => props.backgroundColor || 'transparent'}; // Adding background-color functionality here

  @media (min-width: 768px) {
    margin: 0 1rem;  // Add some horizontal spacing between cards on desktop
  }
`;

const CardHeader = styled.h2`
  font-weight: bold;
  text-align: center;
  margin: 0; // Ensure there's no extra margin from default h2 styles
  padding: .5rem;
`;

const CardImage = styled.img`
  width: 320px;   // Set the width, let the height auto adjust
  height: auto;   // This maintains the original image aspect ratio
  object-fit: cover;  // This will resize the image to cover the element, cropping it if necessary
  display: block;  // Remove any gaps under the image
  max-height: 200px;  // Ensure it doesn't get too tall (optional)
`;

const CardText = styled.p`
  text-align: center;
  margin: 1rem 0;  // Add some spacing between the text and the link
  padding: 0 1.2rem;
`;

const CardLink = styled.a`
  color: white;
  background-color: #000000; /* Example blue color */
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3; /* Darker blue on hover */
    cursor: pointer;
  }
`;

const AnimatedCard = animated(Card);

const Hotels = ({ trackEvent }) => {
  const [inViewRef1, inView1] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [inViewRef2, inView2] = useInView({ triggerOnce: false, threshold: 0.1 });

  const animationProps1 = useSpring({
    opacity: inView1 ? 1 : 0,
    transform: inView1 ? 'translateY(0px)' : 'translateY(30px)',
    delay: 100,
    config: config.slow
  });

  const animationProps2 = useSpring({
    opacity: inView2 ? 1 : 0,
    transform: inView2 ? 'translateY(0px)' : 'translateY(30px)',
    delay: 200, // further delay
    config: config.slow
  });

  return (
    <>
      <CardContainer>
        <AnimatedCard style={animationProps1} ref={inViewRef1}>
          <CardHeader>THE HOTEL VANCE</CardHeader>
          <CardText>
            1455 Broadway St<br />
            Portland, OR<br />
            (503) 334-2167
          </CardText>
          <CardLink
            onClick={() => trackEvent('Travel', { link: 'Hotel: The Hotel Vance'}) }
            href='https://www.marriott.com/event-reservations/reservation-link.mi?app=resvlink&id=1689261779325&key=GRP'
            target='_blank'
          >
            BOOK NOW
          </CardLink>
        </AnimatedCard>

        <AnimatedCard style={animationProps2} ref={inViewRef2}>
          <CardHeader>RESIDENCE INN, PEARL</CardHeader>
          <CardText>
            1150 NW 9th Ave<br />
            Portland, OR<br />
            (503) 220-1339
          </CardText>
          <CardLink
            onClick={() => trackEvent('Travel',  {link: 'Hotel: Residence Inn, Pearl'}) }
            href='https://www.marriott.com/event-reservations/reservation-link.mi?id=1689711999522&key=GRP&app=resvlink'
            target='_blank'
          >
            BOOK NOW
          </CardLink>
        </AnimatedCard>
      </CardContainer>
    </>
  );
};

export const Travel = () => {
  const trackEvent = usePosthog();

  return (
    <>

      <HeroSection
        id='where-to-stay'
        backgroundImage='https://static-image-bucket-service-dev.s3.us-west-2.amazonaws.com/travelpage/where_to_stay_img.jpg'
        height={'400px'}
        HeroTextFontWeight={'300'}
        heroText="Where to Stay"
        SubTextFontSize={'1.8rem'}
      />

      <TravelHeader>
        We have rooms blocked off for wedding guests at the following hotels:
      </TravelHeader>

      <Hotels trackEvent={trackEvent} />

      <HeroSection
        height={'400px'}
        backgroundImage='https://static-image-bucket-service-dev.s3.us-west-2.amazonaws.com/travelpage/portland_travel_hero_img.jpg'
        HeroTextFontSize={'5rem'}
        HeroTextFontWeight={'300'}
        heroText="Travel"
      />
        <TravelHeader>
            The following airlines have direct flights to Portland (PDX) throughout the year.
        </TravelHeader>

      <CardContainer>

        <Card>
          <CardImage src='https://static-image-bucket-service-dev.s3.us-west-2.amazonaws.com/travelpage/united_airlines_logo.png' alt="United Airlines Logo" />
          <CardLink onClick={() => trackEvent('Travel',  {link: 'Airfare: SFO | DEN'}) } href='https://www.united.com/en/us' target='_blank'>
            Book out of SFO | DEN
          </CardLink>
        </Card>

        <Card>
          <CardImage src='https://static-image-bucket-service-dev.s3.us-west-2.amazonaws.com/travelpage/southwest_airlines_logo.png' alt="Southwest Airlines Logo" />
          <CardLink onClick={() => trackEvent('Travel', {link: 'Airfare: SMF | DEN'}) } href='https://www.southwest.com/' target='_blank'>
            Book out of SMF | DEN
          </CardLink>
        </Card>

        <Card>
          <CardImage src='https://static-image-bucket-service-dev.s3.us-west-2.amazonaws.com/travelpage/alaska_airlines_logo.svg' alt="Alaska Airlines Logo" />
          <CardLink onClick={() => trackEvent('Travel', { link: 'Airfare: SMF | SFO'}) } href='https://www.alaskaair.com/' target='_blank'>
            Book out of SMF | SFO
          </CardLink>
        </Card>

      </CardContainer>
    </>
  )
}
