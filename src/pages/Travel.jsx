import styled from 'styled-components'
import { useSpring, animated, config } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import HeroSection from '../components/HeroContainer'

// Container for all cards
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding-bottom: 2rem;
  // For larger screens
  @media (min-width: 768px) {
    padding: 3rem 0;
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
  margin: 2rem 0; // Add some vertical spacing between cards on mobile
  flex-grow: 1;
  background-color: ${props => props.backgroundColor || 'transparent'}; // Adding background-color functionality here

  @media (min-width: 768px) {
    margin: 0 1rem;  // Add some horizontal spacing between cards on desktop
  }
`;

const CardHeader = styled.h2`
  font-weight: bold;
  text-align: center;
  margin: 0; // Ensure there's no extra margin from default h2 styles
  padding: 0 1rem;
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

const Hotels = () => {
  const [inViewRef1, inView1] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [inViewRef3, inView3] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [inViewRef4, inView4] = useInView({ triggerOnce: false, threshold: 0.1 });

  const animationProps1 = useSpring({
    opacity: inView1 ? 1 : 0,
    transform: inView1 ? 'translateY(0px)' : 'translateY(30px)',
    delay: 100,
    config: config.slow
  });

  const animationProps3 = useSpring({
    opacity: inView3 ? 1 : 0,
    transform: inView3 ? 'translateY(0px)' : 'translateY(30px)',
    delay: 200, // further delay
    config: config.slow
  });

  const animationProps4 = useSpring({
    opacity: inView4 ? 1 : 0,
    transform: inView4 ? 'translateY(0px)' : 'translateY(30px)',
    delay: 250, // even further delay
    config: config.slow
  });

  return (
    <>
      <CardContainer>
        <Card>
          <CardHeader>
            We have rooms blocked off for wedding guests at the following West Portland Hotels:
          </CardHeader>
        </Card>

        <AnimatedCard style={animationProps1} ref={inViewRef1}>
          <CardHeader>THE HOTEL VANCE</CardHeader>
          <CardText>
            1455 Broadway St<br />
            Portland, OR<br />
            (503) 334-2167
          </CardText>
          <CardLink
            href='https://www.marriott.com/event-reservations/reservation-link.mi?app=resvlink&id=1689261779325&key=GRP'
            target='_blank'
          >
            BOOK NOW
          </CardLink>
        </AnimatedCard>

        <AnimatedCard style={animationProps3} ref={inViewRef3}>
          <CardHeader>RESIDENCE INN, PEARL DISTRICT</CardHeader>
          <CardText>
            1150 NW 9th Ave<br />
            Portland, OR<br />
            (503) 220-1339
          </CardText>
          <CardLink
            href='https://www.marriott.com/en-us/hotels/pdxpd-residence-inn-portland-downtown-pearl-district/overview/'
            target='_blank'
          >
            BOOK NOW
          </CardLink>
        </AnimatedCard>

        <AnimatedCard style={animationProps4} ref={inViewRef4}>
          <CardText>
            Estimated travel time from the above Hotel Blocks to the Wedding Venue is between 8 - 12 minutes on Sundays between 3:00 and 4:00 pm.
          </CardText>
          <CardLink
            href="https://www.google.com/maps/@/data=!3m1!4b1!4m3!11m2!2swaEFAX1NTpmwyrRFOvhUtA!3e3?entry=tts&shorturl=1"
            target='_blank'
          >
            VIEW ON MAP
          </CardLink>
        </AnimatedCard>
      </CardContainer>
    </>
  );
};


export const Travel = () => {
  return (
    <>
      <HeroSection
        height={'400px'}
        backgroundImage="https://images.unsplash.com/photo-1589211963780-1f74f3864f74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        HeroTextFontSize={'5rem'}
        HeroTextFontWeight={'500'}
        heroText="Travel"
      />

      <CardContainer>
        <Card>
          <CardImage src='https://logos-world.net/wp-content/uploads/2020/11/United-Airlines-Logo.png' alt="United Airlines Logo" />
          <CardLink href='https://www.united.com/en/us' target='_blank'>
            Book out of SFO
          </CardLink>
        </Card>

        <Card>
          <CardImage src='https://1000logos.net/wp-content/uploads/2019/08/southwest-airlines-logo.png' alt="Southwest Airlines Logo" />
          <CardLink href='https://www.southwest.com/' target='_blank'>
            Book out of SMF
          </CardLink>
        </Card>

        <Card>
          <CardImage src='https://www.logo.wine/a/logo/Alaska_Airlines/Alaska_Airlines-Logo.wine.svg' alt="Airline Logo" />
          <CardLink href='https://www.alaskaair.com/' target='_blank'>
            Book out of SMF or SFO
          </CardLink>
        </Card>

      </CardContainer>

      <HeroSection
        backgroundImage="https://jesswandering.com/wp-content/uploads/2021/09/Cabin-5-819x1024.jpg"
        height={'380px'}
        HeroTextFontWeight={'500'}
        heroText="Where to Stay"
        SubTextFontSize={'1.8rem'}
      />

      <Hotels />

      <HeroSection
        backgroundImage="https://i.pinimg.com/originals/1f/83/64/1f8364a507bac22709d0b1c062a5b266.jpg"
        height={'380px'}
        HeroTextFontSize={'3.2rem'}
        HeroTextFontWeight={'500'}
        heroText="What to Do"
      />

      <CardContainer>
        <Card>
          <CardText>
            With over 90 distinct districts within Portland, the city can be seen as divided into 4 main quadrants for you to explore - North, South, East and West.
          </CardText>
          <CardText>
            Burnside Street divides Portland’s north and south quadrants, while the Willamette River divides it’s east and west quadrants, and there is great food, adventures, and shopping to be had across all.
          </CardText>
        </Card>

        <Card>
          <CardLink href="https://goo.gl/maps/esqCoN5YsChviWbAA" target='_blank'>EAT AND DRINK</CardLink>
          <CardText>
            At food carts, subterranean bars, and white-tablecloth restaurants, chefs gather some of the region’s finest ingredients to transform into immaculate sushi, handmade pastas, and imaginative pintxos. For a city its size, Portland’s restaurant scene is impressively multifaceted — traditional and offbeat, covering hundreds of cuisines from various countries and regions around the world.
          </CardText>
        </Card>

        <Card>
          <CardLink href="https://goo.gl/maps/7pjs5JGQZoyweF2C9" target='_blank'>CHOOSE YOUR ADVENTURE</CardLink>
          <CardText>
            You’ve heard the saying, “Keep Portland weird,” but its also full of wonder. Across every one of its bridges is a unique experience waiting. Whether you’re looking for outdoor recreation, live music, sporting events, or amusement parks, the city has endless options for all.
          </CardText>
        </Card>

        <Card>
          <CardLink href="https://goo.gl/maps/o8vb5zRvQQD4yMrNA" target='_blank'>GET THRIFTY</CardLink>
          <CardText>
            Portland boasts nearly 50 vintage shops, offering up meticulously curated — and constantly updated — collections of costume jewelry, traditionally tailored suits and, of course, racks upon racks of dresses that span decades. The city’s vintage bounty has fashion-savvy visitors stuffing their suitcases to the limit with secondhand goodies.
          </CardText>
        </Card>
      </CardContainer>
    </>
  )
}