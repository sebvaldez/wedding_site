import './App.css';
import { Link } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components';

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
    <div className="App">
      <header className="App-header">
        <p>
          September 8, 2024 · Portland, Oregon
        </p>
        <Link to='/rsvp'>TODO: rsvp button</Link>
      </header>

      <section></section>
      <section></section>

      <section>
        <h2>Wedding Day</h2>
        <h3>September 8, 2024</h3>
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

        <div>
          <h2>Event Timeline:</h2>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
          <p>12</p>
        </div>
        <br />
      </section>
    </div>
    </>
  );
}

export default App;