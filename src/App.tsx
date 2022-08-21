import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { ReactQueryDevtools } from "react-query/devtools";
import { theme } from "./theme";
import { useState } from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { motion } from "framer-motion";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";
import Header from "./Components/Header";
const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  font-weight: 300;
  font-family: 'Source Sans Pro', sans-serif;
  color:${(props) => props.theme.white.darker};
  line-height: 1.2;  
  background-color: black;

}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-weight: 300;
  font-family: 'Source Sans Pro', sans-serif;
  color:${(props) => props.theme.white.darker};
  line-height: 1.2;
  background-color: black;
  overflow-x: hidden;
  &::-webkit-scrollbar{
    display: none;
  }
}
a {
  text-decoration:none;
  color:inherit;
}
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="tv" element={<Tv />}>
            <Route path="tvs/:category/:tvId" element={<Tv />} />
          </Route>
          <Route path="search" element={<Search />}>
            <Route path=":tvId" element={<Search />} />
            <Route path=":movieId" element={<Search />} />
          </Route>
          <Route path="/" element={<Home />}>
            <Route path="/movies/:category/:movieId" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
