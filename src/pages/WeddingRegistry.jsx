import styled from 'styled-components';
import Container from '../components/common/Container';
import HeroSection from '../components/layout/HeroContainer';

const RegistryContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
    justify-content: center;
    align-items: center;
    padding: 3rem;

    @media (min-width: 601px) {
      padding: 3rem;
      gap: 2rem;
      grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width: 801px) {
      padding: 3rem;
      gap: 2rem;
      grid-template-columns: repeat(4, 1fr);
    }
`;

const RegistryItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 150px;
    background-size: contain;  // Ensure the entire logo is visible within the container
    background-repeat: no-repeat;  // Prevents the image from repeating in case it's too small for the container
    background-position: center;  // Center the background image
    position: relative;
    transition: background-color 0.2s ease-in;  // Adding transition for the background-color

    &:hover {
      background-color: rgba(211, 211, 211, 0.5);
    }

    @media (min-width: 801px) {
      width: 200px;
      height: 200px;
    }

`;

const RegistryLink = styled.a`
    display: block;
    width: 100%;  // Ensure the link covers the entire div
    height: 100%;
    text-decoration: none;
    cursor: pointer;
    z-index: 1;  // Place the link above any other content

    &:hover {
      background-color: rgba(211, 211, 211, 0.5);  // Add the hover effect
    }
`;


const Message = styled.h3`
  text-align: center;
  margin: 1rem 0;
  padding: 0 1.2rem;
  font-size: 1.2rem;
  @media (min-width: 1024px) {
    padding: 2rem 5rem 0 5rem;
    font-size: 1.5rem;
  }
`;

const registryList = [
  {
    vendor: 'CB2',
    url: 'https://www.cb2.com/gift-registry/allegra-sebastian-cesena-valdez/r6741434',
    logo: 'https://static-image-bucket-service-dev.s3.us-west-2.amazonaws.com/registry/cb2.png'
  },
  {
    vendor: 'Amazon',
    url: 'https://www.amazon.com/wedding/sebastian-valdez-allegra-cesena--september-2024/registry/1E1UPPAJDB28H',
    logo: 'https://static-image-bucket-service-dev.s3.us-west-2.amazonaws.com/registry/amazon.png'
  },
  {
    vendor: 'Crate & Barrel',
    url: 'https://www.crateandbarrel.com/gift-registry/allegra-sebastian-cesena/r6774244',
    logo: 'https://static-image-bucket-service-dev.s3.us-west-2.amazonaws.com/registry/crate_and_barrel.png'
  },
  {
    vendor: 'West Elm | William Sonoma',
    url: 'https://www.westelm.com/registry/501182762/registry-list.html?cm_ven=afshoppromo&bnrid=3917500&cm_ite=&cm_cat=64733',
    logo: 'https://static-image-bucket-service-dev.s3.us-west-2.amazonaws.com/registry/west_elm_william_sonoma.png'
  },
  {
    vendor: 'Target',
    url: 'https://www.target.com/gift-registry/gift/cesena-valdez',
    logo: 'https://static-image-bucket-service-dev.s3.us-west-2.amazonaws.com/registry/target.png'
  },
  {
    vendor: 'notNeutral',
    url: 'https://www.notneutral.com/wishlist/shared/index/code/QpATSrUAVhnJxsrUTGXToQ9JnpO0uPQT/',
    logo: 'https://static-image-bucket-service-dev.s3.us-west-2.amazonaws.com/registry/notneutral.svg'
  },
  {
    vendor: 'Sur la Table',
    url: 'https://www.surlatable.com/giftregistry-customershow?ID=93aff6fff7f5d61bd90909c55f',
    logo: 'https://static-image-bucket-service-dev.s3.us-west-2.amazonaws.com/registry/sur_la_table.png'
  },
  {
    vendor: 'Clive Coffee',
    url: 'https://clivecoffee.com/products/vst-precision-portafilter-ridged-basket-58mm-20g',
    logo: 'https://static-image-bucket-service-dev.s3.us-west-2.amazonaws.com/registry/clive_coffee.png'
  },
];

export const WeddingRegistry = () => {
  return (
    <Container>
      <HeroSection
        backgroundImage="https://static-image-bucket-service-dev.s3.us-west-2.amazonaws.com/registry/gift_hero_img.jpg"
        heroText="Registry"
        height={'380px'}
      />

      <Message>
        Please do not feel that you have to buy us a wedding gift. Your presence will be more than we could have hoped for.
        <br /><br />

        However, if you do wish to participate in the time - honoured gift giving tradition, a list of items and ideas is available at the web below. Your contribution to our wishing well would be warmly appreciated.
      </Message>

      <RegistryContainer>
        { registryList.map((item, idx) => (
          <RegistryItem key={idx} style={{backgroundImage: `url(${item.logo})`}}>
            <RegistryLink href={item.url} target='_blank' aria-label={`Link to ${item.vendor} registry`}></RegistryLink>
          </RegistryItem>
        ))}
      </RegistryContainer>

    </Container>
  )
}