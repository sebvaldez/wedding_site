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
    // @media (min-width: 601px) {
    //   width: 150px;
    //   height: 150px;
    // }
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
  font-weight: 500;
`

const registyList = [
  {
    vendor: 'CB2',
    url: 'https://www.cb2.com/gift-registry/allegra-sebastian-cesena-valdez/r6741434',
    logo: 'https://images.squarespace-cdn.com/content/v1/6059ecd2c49f5d3d9ef9a9ed/1617306626011-1C6XZRUS8I3N1HXILPWI/CB2+LOGO.png'
  },
  {
    vendor: 'Amazon',
    url: 'https://www.amazon.com/wedding/sebastian-valdez-allegra-cesena--september-2024/registry/1E1UPPAJDB28H',
    logo: 'https://logolook.net/wp-content/uploads/2021/03/Amazon-logo.png'
  },
  {
    vendor: 'Crate & Barrel',
    url: 'https://www.crateandbarrel.com/gift-registry/allegra-sebastian-cesena/r6774244',
    logo: 'https://logos-world.net/wp-content/uploads/2022/04/Crate-Barrel-Logo.png'
  },
  {
    vendor: 'West Elm | William Sonoma',
    url: 'https://www.westelm.com/registry/501182762/registry-list.html?cm_ven=afshoppromo&bnrid=3917500&cm_ite=&cm_cat=64733',
    logo: 'https://searchlogovector.com/wp-content/uploads/2020/02/west-elm-logo-vector.png'
  },
  {
    vendor: 'Target',
    url: 'https://www.target.com/gift-registry/gift/cesena-valdez',
    logo: 'https://1000logos.net/wp-content/uploads/2017/06/Target-logo-1.png'
  },
  {
    vendor: 'notNeutral',
    url: 'https://www.notneutral.com/wishlist/shared/index/code/QpATSrUAVhnJxsrUTGXToQ9JnpO0uPQT/',
    logo: 'https://www.notneutral.com/pub/media/logo/stores/1/logo.svg'
  },
  {
    vendor: 'Sur la Table',
    url: 'https://www.surlatable.com/giftregistry-customershow?ID=93aff6fff7f5d61bd90909c55f',
    logo: 'https://searchlogovector.com/wp-content/uploads/2018/05/sur-la-table-logo-vector.png'
  },
  {
    vendor: 'Clive Coffee',
    url: 'https://clivecoffee.com/products/vst-precision-portafilter-ridged-basket-58mm-20g',
    logo: 'https://directory.sca.coffee/custom/domain_1/image_files/440_photo_643.png'
  },
]


export const WeddingRegistry = () => {
  return (
    <Container md>
      <HeroSection
        backgroundImage="https://picsum.photos/3840/2400"
        heroText="Registry"
        height={'400px'}
      />

      <Message>
        Please do not feel that you have to buy us a wedding gift. Your Presence will be more than we could have hoped for.
      <br />
        However, if you do wish to participate in the time - honoured gift giving tradition. A list of items and ideas is available at the web below. Your contribution to our wishing well would be warmly appreciated.
      </Message>

      <RegistryContainer>
        { registyList.map(item => (
          <RegistryItem style={{backgroundImage: `url(${item.logo})`}}>
            <RegistryLink href={item.url} target='_blank' aria-label={`Link to ${item.vendor} registry`}></RegistryLink>
          </RegistryItem>
        ))}
      </RegistryContainer>
    </Container>
  )
}