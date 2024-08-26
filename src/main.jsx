import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
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

  * {
    margin: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Pretendard-Regular';
  }

  a {
    cursor: pointer;
    text-decoration: none;
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }
`;

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <GlobalStyle />
        <App />
    </BrowserRouter>,
);
