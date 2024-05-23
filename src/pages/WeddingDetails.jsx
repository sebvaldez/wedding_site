import styled from 'styled-components';
import { Link } from 'react-router-dom'
import usePosthog from '../hooks/usePostHog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import CocktailAttire from '../components/CocktailAttire';

import HeroSection from '../components/layout/HeroContainer';
import InfoWrapper from '../components/InfoWrapper';
import InfoSection from '../components/layout/InfoSection';
import Timeline from '../components/Timeline';
import Section from '../components/layout/Section';
import { WeddingColorPallete } from '../components/WeddingColorPallete';

const ArrivalWrapper = styled.div`
  @media (max-width: 1024px) {
    // For viewports smaller than 1024px, the max-width will be the full viewport width
    max-width: 100%;
  }

  @media (min-width: 1025px) {
    // For viewports larger than 1024px, the max-width will be 80% of the viewport width
    max-width: calc(45vw);
  }

  margin: 0 auto;  // centers the container on larger screens
`;

const WeddingDetails = () => {
  const trackEvent = usePosthog();
  trackEvent('wedding-details');

  return (
    <>
      {/*  Deatails page below: */}
      <HeroSection
                height={'450px'}
                backgroundImage="https://static-image-bucket-service-dev.s3.us-west-2.amazonaws.com/homepage/the_evergreen.jpg"
                HeroTextFontWeight={'500'}
                heroText='Event Details'
              />
            <InfoWrapper>
              <InfoSection spanColumns>
                <Section title="Location">
                  <Link
                    to='https://www.google.com/maps/place/The+Evergreen/@45.5178488,-122.6592722,17z/data=!3m1!4b1!4m6!3m5!1s0x5495a0a72fdd55f3:0x74f7e22136d74a4e!8m2!3d45.5178488!4d-122.6592722!16s%2Fg%2F11c3vxydlr?entry=ttu'
                    target='_blank'
                  >
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
                <Section title="Arrival">
                  <ArrivalWrapper>
                    <p>The ceremony will begin promptly at 4:00 PM, with cocktail hour and dinner to follow. </p>
                    <br />
                    <p>Please do not enter the venue prior to 3:30 PM unless otherwise instructed so as to permit our vendors time to complete their set up without interruption.</p>
                  </ArrivalWrapper>
                </Section>
              </InfoSection>

              <InfoSection spanColumns>
                <CocktailAttire />
              </InfoSection>

              <InfoSection spanColumns>
                <WeddingColorPallete />
              </InfoSection>

              <InfoSection spanColumns>
                <Section title='Event Timeline'>
                  <Timeline />
                </Section>
              </InfoSection>
            </InfoWrapper>
    </>
  )
}

export default WeddingDetails;
