import './App.css';
import { Link } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components';
import HeroSection from './components/HeroContainer';
import Timeline from './components/Timeline'

const GlobalFonts = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,300;0,400;1,200;1,300&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Tenor+Sans&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Bellota+Text:wght@100;200;300;400&display=swap');

  body {
    font-family: 'Montserrat', sans-serif; /* Use the font here */
    /* font-family: 'Tenor Sans', serif; */
    /* font-family: 'Bellota Text', cursive; */
    /* uncomment the font you want to use */
  }
`;

function App() {
  return (
    <>
    <GlobalFonts />
    <div>
      <header className="App-header">
        <p>
          September 8, 2024 · Portland, Oregon
        </p>
        <Link to='/rsvp'>TODO: rsvp button</Link>
      </header>

      <section>
        <HeroSection
          backgroundImage="https://theevergreenpdx.com/app/uploads/2015/11/Staheli-Wedding-247-FINAL-2550x1700.jpg"
          heroText="Wedding Day"
          subText="September 8, 2024"
        />
      </section>

      <section>
        <div>
          <h2>Location</h2>
          <span style={{textDecoration: 'underline', color: 'blue'}}>The Evergreen 618 Alder St Portland, Oregon</span>
        </div>
        <br />

        <div>
          <h2>Weather</h2>
          <p>This is climate controlled, indoor event Guests should expect outdoor temperatures between 85 and 75 degrees.</p>
        </div>
        <br />

        <Timeline />

        <br />
      </section>
    </div>
    </>
  );
}

export default App;
