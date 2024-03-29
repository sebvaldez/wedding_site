import { createGlobalStyle } from 'styled-components';

const GlobalFonts = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,300;0,400;1,200;1,300&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Tenor+Sans&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Bellota+Text:wght@100;200;300;400&display=swap');

  body {
    font-family: 'Montserrat', sans-serif;
  }
  h2 {
    font-family: 'Tenor Sans', serif;
  }
`;

export default GlobalFonts;
