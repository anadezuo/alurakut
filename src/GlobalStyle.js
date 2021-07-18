import { createGlobalStyle } from "styled-components";
import { AlurakutStyles } from "./lib/AlurakutCommons";

const GlobalStyle = createGlobalStyle`

  //reset de padrão
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    }

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #D9E6F6; //fbdfff
    font-family: sans-serif;
  }

  #__next{
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  img {
     max-width: 100%;
     height: auto;
     display: block;
   }

   ${AlurakutStyles}
`;

export default GlobalStyle;