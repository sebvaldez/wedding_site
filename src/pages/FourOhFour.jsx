import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHammer } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const timRobinsonGifs = [
  'https://media.giphy.com/media/bjB3gtFvREqqr5NAHW/giphy.gif',
  'https://media.giphy.com/media/J9MnwDiwCmjkexy9e1/giphy.gif',
  'https://media.giphy.com/media/CEPCCpYP8baFh7ISQO/giphy.gif',
  'https://media.giphy.com/media/GHdE1VNN1KknPeZqoQ/giphy.gif',
  'https://media.giphy.com/media/6cFYYRYXCmS3hDAuXv/giphy.gif',
];

const getRandomGif = () => {
  const randomIndex = Math.floor(Math.random() * timRobinsonGifs.length);
  return timRobinsonGifs[randomIndex];
}

const FourOhFourSection = styled.section`
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1, h2 {
    margin: 0;
    padding: 0;
    text-align: center;
  }

  @media (max-width: 768px) {
    height: auto;
    padding: 20px 0;

    h1 {
      font-size: 32px;
    }

    h2 {
      font-size: 24px;
    }
  }
`;

const BackLink = styled(Link)`
  margin: 20px 0;
  font-size: 18px;
  padding: 10px 15px;
  text-decoration: none; // if you want to remove the underline
  color: inherit; // if you want the link color to be same as text
`;

const ResponsiveGif = styled.img`
  max-width: 100%;
  height: auto;
`;

export const FourOhFour = () => {
  const location = useLocation();

  const displayRsvpMessage = location.pathname === '/rsvp';

  return (

      <FourOhFourSection>
        {displayRsvpMessage ? (
          <div style={{ height: '60vh', display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '4rem'}}>
            <h2>RSVP Page</h2>
            <p>Coming soon! We're working on it.</p>
            <FontAwesomeIcon icon={faHammer} size='4x' />
          </div>
        ) : (
          <>
            <h1>404</h1>
            <h2>Page not found.</h2>
            <ResponsiveGif src={getRandomGif()} alt="Tim Robinson Gif" />
          </>
        )}
        <BackLink to='/'>Back to Home</BackLink>
      </FourOhFourSection>

  )
};
