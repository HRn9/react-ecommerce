import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    width: 100%;
    font-family: system-ui, -apple-system, sans-serif;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Плавные переходы для всех элементов */
  * {
    transition: background-color 0.2s ease-in-out, 
                border-color 0.2s ease-in-out,
                color 0.2s ease-in-out,
                transform 0.2s ease-in-out;
  }

  /* Убираем loading экран после загрузки React */
  .loading {
    display: none;
  }
`;

export default GlobalStyles; 