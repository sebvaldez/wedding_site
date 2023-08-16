import { Link } from 'react-router-dom';
import Container from '../components/common/Container';

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

export const FourOhFour = () => {
  return (
    <Container md>
      <section style={{ height: '550px' }}>
        <h1>404</h1>
        <h2>Page not found.</h2>
        <Link to='/'>Back</Link>
        <br />
        <img src={getRandomGif()} alt="Tim Robinson Gif" />
        <br />
      </section>
    </Container>
  )
}
