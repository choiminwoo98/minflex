import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { getMovies, getTvShows, IGetMoviesResult, ITvShows } from "../api";
import { makeImagePath, Types, TypeShows } from "../utils";
import { useState } from "react";
import { useMatch, useNavigate, useRoutes } from "react-router-dom";
import { Row, Row2 } from "../Components/Row";

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

export default function Tv() {
  const { data, isLoading } = useQuery<ITvShows>(["tvs", "on_the_air"], () =>
    getTvShows(TypeShows.on_the_air)
  );
  const bannerIndex = 0;
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgphoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].name}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>

          <Row2 type={TypeShows.airing_today} />
          <Row2 type={TypeShows.on_the_air} />
          <Row2 type={TypeShows.popular} />
          <Row2 type={TypeShows.top_rated} />
        </>
      )}
    </Wrapper>
  );
}
