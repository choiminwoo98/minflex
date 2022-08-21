import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath, Types } from "../utils";
import { useState } from "react";
import { useMatch, useNavigate, useRoutes } from "react-router-dom";
import { Row } from "../Components/Row";

const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px; ;
`;

const Overview = styled.p`
  font-size: 20px;
  width: 50%;
`;

// const Row = styled(motion.div)`
//   display: grid;
//   gap: 5px;
//   grid-template-columns: repeat(6, 1fr);
//   position: absolute;
//   width: 100%;
// `;

// const Box = styled(motion.div)<{ bgphoto: string }>`
//   background-color: white;
//   background-image: url(${(props) => props.bgphoto});
//   background-size: cover;
//   background-position: center center;
//   height: 200px;
//   font-size: 66px;
//   cursor: pointer;
//   &:first-child {
//     transform-origin: center left;
//   }
//   &:last-child {
//     transform-origin: center right;
//   }
// `;

export default function Home() {
  const { data: isplay, isLoading: isPlayLoading } = useQuery<IGetMoviesResult>(
    ["movies", Types.now_playing],
    () => getMovies(Types.now_playing)
  );

  return (
    <Wrapper>
      {isPlayLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgphoto={makeImagePath(isplay?.results[0].backdrop_path || "")}
          >
            <Title>{isplay?.results[0].title}</Title>
            <Overview>{isplay?.results[0].overview}</Overview>
          </Banner>

          <Row type={Types.now_playing} />
          <Row type={Types.popular} />
          <Row type={Types.top_rated} />
          <Row type={Types.upcoming} />
        </>
      )}
    </Wrapper>
  );
}
