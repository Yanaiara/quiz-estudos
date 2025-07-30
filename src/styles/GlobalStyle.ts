import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Segoe UI', sans-serif;
  }

  body {
    margin: 0;
    padding: 0;
    background: #fdfdfd;
    color: #333;
  }

  button {
    font-family: inherit;
  }
`;

export default GlobalStyle;
