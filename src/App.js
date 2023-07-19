import { Link } from 'react-router-dom'
import Container from './components/Container'
import HeroSection from './components/HeroContainer';
import Timeline from './components/Timeline'

function App() {
  return (
    <>
      <Container md={800}>
        <p>
          September 8, 2024 · Portland, Oregon
        </p>
        <Link to='/rsvp'>TODO: rsvp button</Link>
      </Container>

        <HeroSection
          backgroundImage="https://theevergreenpdx.com/app/uploads/2015/11/Staheli-Wedding-247-FINAL-2550x1700.jpg"
          heroText="Wedding Day"
          subText="September 8, 2024"
        />

      <Container md={800}>
        <div style={{ padding: '2rem .2rem' }}>
        <h1>Please join us on September 8, 2024 as we celebrate our wedding in Portland, Oregon.</h1>
        <p>Cocktail | Formal Attire</p>
        <img src="https://picsum.photos/800/550" width='800px' height='800px' alt="" />
        </div>

        <br />
        <h1>Our Relationship</h1>
        <div style={ { display: 'flex', width: '600px', height: '550px', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>He said:</h2>
          <h2>She said:</h2>
        </div>
      </Container>

      <Container md={800}>
        <div>
          <h2>Location</h2>
          <span style={{textDecoration: 'underline', color: 'blue'}}>The Evergreen 618 Alder St Portland, Oregon</span>
        </div>
        <br />

        <div>
          <h2>Arrival</h2>
          <p>Should you arrive prior to the 4 PM entry time, you are welcome to pop into The Loyal Legion Bar and Restaurant next door and grab a drink until it is time for entry.</p>
          <p>Please do not enter the venue prior to 4 PM unless otherwise requested by the couple, so as to permit our vendors to complete their set up without interruption.</p>
        </div>
        <br />

        <div>
          <h2>Weather</h2>
          <p>This is a climate controlled, indoor event venue with central AC | Heat.</p>
          <p>Guests should expect outdoor temperatures between 85 and 75 degrees.</p>
        </div>
        <br />

        <Timeline />

      </Container>
    </>
  );
}

export default App;
