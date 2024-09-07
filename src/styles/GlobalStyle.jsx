// GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
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
    font-family: 'Pretendard';
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

body::-webkit-scrollbar {
    width: 8px;  
}

body::-webkit-scrollbar-thumb {
    height: 20%;
    background: var(--brand200); 
    
    border-radius: 10px;
}

body::-webkit-scrollbar-track {
    background: var(--black200)
  }
`;

export default GlobalStyle;
