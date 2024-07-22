import { createGlobalStyle } from 'styled-components';


const GlobalStyle = createGlobalStyle`

@font-face {
    font-family: 'SUITE-Regular';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
}


  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'SUITE-Regular', sans-serif;
  }

  html, body {
    height: 100%;
    font-family: 'SUITE-Regular', sans-serif;
    line-height: 1.6;
  }
  

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    
  }

  a {
    text-decoration: none;
    color: inherit;
  }
  
  ul {
    list-style-type: none;
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;
