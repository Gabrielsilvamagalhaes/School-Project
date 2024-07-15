import styled, { createGlobalStyle } from 'styled-components'
import * as colors from '../config/colors'

import 'react-toastify/ReactToastify.css'

export default createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
}

body {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  background-color: ${colors.primaryDarkColor};
  color: ${colors.primaryColor};
}

//Toastify configurations
body .Toastify .Toastify__toast-container .Toastify__toast--success {
  /* background-color: ${colors.sucessColor}; */
  /* color: #000; */
}

/* body .Toastify__progress-bar--success {
   background-color: #000; 
} */

.Toastify__close-button:hover,
.Toastify__close-button:focus {
  border: none;
}

html, body, #root {
  height: 100%;
}

button {
  cursor: pointer;
  background-color: ${colors.primaryColor};
  border: none;
  color: #fff;
  padding: 10px 20px;
  border: 1px solid transparent;
  border-radius: 5px;
  font-weight: 700;
  transition: 0.3s;
}

button:hover {
  border-radius: 5px;
  border: 1px solid violet;
}

a {
  text-decoration: none;
  color: ${colors.primaryColor};
}

ul {
  list-style: none;
}
`

export const Container = styled.div`
  max-width: 500px;
  background: white;
  margin: 10rem auto;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`
