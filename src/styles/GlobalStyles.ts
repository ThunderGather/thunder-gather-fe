import { createGlobalStyle } from 'styled-components';


const GlobalStyle = createGlobalStyle`

@font-face {
    font-family: 'SUITE-Regular';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
}

@font-face {
    font-family: 'ChungbukNationalUniversity-Regular';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/ChungbukNationalUniversity-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

  *, *::before, *::after {
      font-family: 'ChungbukNationalUniversity-Regular';
      //font-family: 'MinSans-Regular';
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
     
    //height: 100%;
    //font-family: 'SUITE-Regular', sans-serif;
    //font-family: 'MinSans-Regular', sans-serif;
    line-height: 1.6;
      //overflow-x: hidden;
      margin: 0 auto;
  }

  
  //
  //body {
  //    margin: 0;
  //    padding: 0;
  //    box-sizing: border-box;
  //    display: flex;
  //    justify-content: center;
  //    flex-direction: column; /* 모바일 뷰처럼 세로 정렬 */
  //    align-items: center;
  //}

  a {
    text-decoration: none;
    color: inherit;
  }
  
  ul {
    list-style-type: none;
  }

  button {
    cursor: pointer;
      border:none;
      outline: none;
      box-shadow: none;
  }
  
  
`;

export default GlobalStyle;
