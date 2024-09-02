// GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  @font-face {
  font-family: 'Pretendard-Regular';
  src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
}

  :root {
    --black100: #02000e;
    --black200: #181D26;
    --gray100: #67666E;
    --gray200: #828282;
    --gray300: #A3A5A8;
    --white100: #8C92AB;
    --white200: #F7F7F8;
    --brand100: #F96D69;
    --brand200: #FE5493;
  }


  body {
    font-family: 'Pretendard-Regular';
    background-color: var(--black100);
  }

  a {
    cursor: pointer;
    text-decoration: none;
    color: inherit;
  }

  button {
  cursor: pointer;
  font-family: inherit;
}
`;

export default GlobalStyle;
