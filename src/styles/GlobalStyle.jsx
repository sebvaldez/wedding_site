import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* Reset some basic styles */
  *, *::before, *::after {
    box-sizing: border-box;
  }
  html, body, div, span, h1, h2, h3, h4, h5, h6, p, a, ul, li, form, label, table, tbody, tfoot, thead, tr, th, td {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  body {
    line-height: 1;
  }
  ul {
    list-style: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a {
    text-decoration: none;
    color: inherit;
  }

  /* Mobile first */
  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: #333;
    background-color: #fff;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Media queries can be added for responsive design */
  @media (min-width: 768px) {
    body {
      font-size: 18px;
    }
  }
`;

export default GlobalStyle;
