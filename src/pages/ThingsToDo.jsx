
import styled from 'styled-components'
import HeroSection from '../components/layout/HeroContainer'
import usePosthog from '../hooks/usePostHog';


const TravelHeader = styled.h1`
  text-align: center;
  margin: 0 auto;
  font-size: 1.1rem;
  padding: 1.8rem;

  @media (min-width: 1024px) {
    padding: 2rem 5rem 0 5rem;
    font-size: 1.5rem;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 2rem;

  // For larger screens
  @media (min-width: 768px) {
    padding: 3rem 1.2rem;
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
  flex-grow: .1;
  background-color: ${props => props.backgroundColor || 'transparent'}; // Adding background-color functionality here

  @media (min-width: 768px) {
    margin: 0 1rem;  // Add some horizontal spacing between cards on desktop
  }
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

const CardText = styled.p`
  text-align: center;
  margin: 1rem 0;  // Add some spacing between the text and the link
  padding: 0 1.2rem;
`;

const ThingsToDo = () => {
  return (
  <>
    <HeroSection
    backgroundImage='https://static-image-bucket-service-dev.s3.us-west-2.amazonaws.com/travelpage/rose_garden_img.jpg'
    height={'400px'}
    HeroTextFontWeight={'300'}
    heroText="What to Do"
    />

    <TravelHeader>
      Burnside Street divides Portland’s north and south quadrants, while the Willamette River divides it’s east and west quadrants, and there is great food, adventures, and shopping to be had across all.
    </TravelHeader>

    <CardContainer>

    <Card>
      <CardLink href='https://goo.gl/maps/esqCoN5YsChviWbAA' target='_blank'>EAT AND DRINK</CardLink>
      <CardText>
        At food carts, subterranean bars, and white-tablecloth restaurants, chefs gather some of the region’s finest ingredients to transform into immaculate sushi, handmade pastas, and imaginative pintxos. For a city its size, Portland’s restaurant scene is impressively multifaceted — traditional and offbeat, covering hundreds of cuisines from various countries and regions around the world.
      </CardText>
    </Card>

    <Card>
      <CardLink href='https://goo.gl/maps/7pjs5JGQZoyweF2C9' target='_blank'>CHOOSE YOUR ADVENTURE</CardLink>
      <CardText>
        You’ve heard the saying, “Keep Portland weird,” but its also full of wonder. Across every one of its bridges is a unique experience waiting. Whether you’re looking for outdoor recreation, live music, sporting events, or amusement parks, the city has endless options for all.
      </CardText>
    </Card>

    <Card>
      <CardLink href='https://goo.gl/maps/o8vb5zRvQQD4yMrNA' target='_blank'>GET THRIFTY</CardLink>
      <CardText>
        Portland boasts nearly 50 vintage shops, offering up meticulously curated — and constantly updated — collections of costume jewelry, traditionally tailored suits and, of course, racks upon racks of dresses that span decades. The city’s vintage bounty has fashion-savvy visitors stuffing their suitcases to the limit with secondhand goodies.
      </CardText>
    </Card>
    </CardContainer>
  </>
  )
}

export default ThingsToDo;

