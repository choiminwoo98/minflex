import { AnimatePresence, motion, useScroll, Variants } from "framer-motion";
import React, { useEffect } from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  IGetMoviesResult,
  getMovies,
  IMovie,
  getMovieDetail,
  IGetMovieDetailsResult,
  getMovieCredit,
  IGetMovieCredit,
  ITvShows,
  getTvShows,
  ITvShowsDetail,
  getTvDetail,
  getTvCredit,
  IGetTvCredit,
} from "../api";
import { makeImagePath, Types, TypeShows } from "../utils";

const Row1 = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
  margin-left: 15px;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  width: 100%;
  font-size: 66px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
const BigMovie = styled(motion.div)`
  position: absolute;
  z-index: 4;
  width: 50vw;
  height: 100vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
  background-color: ${(props) => props.theme.black.veryDark};
`;
const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
  display: flex;
`;
const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 36px;
  left: 0;
  top: 300px;
  position: absolute;
`;
const BigInfo = styled.div`
  display: flex;
  flex-direction: row;
`;

const BigOverview = styled.div`
  padding: 10px;
  margin-bottom: 30px;
  flex: 2;
  color: ${(props) => props.theme.white.lighter};
`;
const BigMany = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-bottom: 30px;
  flex: 1;
  color: ${(props) => props.theme.white.lighter};
`;
const BigGenre = styled.div`
  color: ${(props) => props.theme.white.lighter};
  margin-bottom: 10px;
`;
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 3;
`;
const Slider = styled.div`
  position: relative;
  height: 200px;
  top: -100px;
  margin-bottom: 80px;
`;
const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.ligther};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;
const LeftButton = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  width: 5vh;
  height: 100%;
  left: 0;

  z-index: 2;
`;
const RightButton = styled(motion.div)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  width: 5vh;
  height: 100%;
  right: 0;
  z-index: 2;
`;
const ButtonVariants: Variants = {
  initial: {
    opacity: 0,
  },
  hover: {
    opacity: 1,
  },
};
const rowVariants: Variants = {
  hidden: (isNext: boolean) => {
    return {
      x: isNext ? window.innerWidth + 5 : -window.innerWidth - 5,
    };
  },
  visible: {
    x: 0,
  },
  exit: (isNext: boolean) => {
    return {
      x: isNext ? -window.innerWidth - 5 : window.innerWidth + 5,
    };
  },
};
const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,

    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};
const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};
export const offset = 6;
export function Row({ type }: { type: Types }) {
  const { data, isLoading } = useQuery<IGetMoviesResult>(["movies", type], () =>
    getMovies(type)
  );

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const navigate = useNavigate();
  const bigMovieMatch = useMatch(`/movies/${type}/:movieId`);

  const { scrollY } = useScroll();

  const [isNext, setNext] = useState(true);
  const decreaseIndex = () => {
    if (data) {
      if (leaving) return;
      setNext(false);
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;

      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  const incraseIndex = () => {
    if (data) {
      if (leaving) return;
      setNext(true);
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;

      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const onBoxClicked = ({
    movieId,
    category,
  }: {
    movieId: number;
    category: string;
  }) => {
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
    navigate(`/movies/${category}/${movieId}`);
  };
  const onOverlayClick = () => {
    document.getElementsByTagName("body")[0].style.overflowY = "auto";
    navigate(-1);
  };
  const clickMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find(
      (movie) => String(movie.id) === bigMovieMatch.params.movieId
    );
  const { data: movieDetail, isLoading: isdetailLoading } =
    useQuery<IGetMovieDetailsResult>(
      [bigMovieMatch?.params.movieId, "detail"],
      () => getMovieDetail(bigMovieMatch?.params.movieId)
    );
  const { data: movieCredit, isLoading: iscreditLoading } =
    useQuery<IGetMovieCredit>([bigMovieMatch?.params.movieId, "credit"], () =>
      getMovieCredit(bigMovieMatch?.params.movieId)
    );

  return (
    <>
      <Slider>
        <AnimatePresence
          initial={false}
          onExitComplete={toggleLeaving}
          custom={isNext}
        >
          <h2
            style={{
              marginBottom: "20px",
              fontSize: "25px",
              fontWeight: "900",
            }}
          >
            {type}
          </h2>
          <Row1
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 1 }}
            key={index + type}
            custom={isNext}
          >
            {data?.results
              .slice(offset * index, offset * index + offset)
              .map((movie) => (
                <Box
                  layoutId={movie.id + type}
                  key={movie.id + type}
                  whileHover="hover"
                  initial="normal"
                  variants={boxVariants}
                  onClick={() =>
                    onBoxClicked({ movieId: movie.id, category: type })
                  }
                  transition={{ type: "tween" }}
                  bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                >
                  <Info variants={infoVariants}>
                    <h4>{movie.title}</h4>
                  </Info>
                </Box>
              ))}
          </Row1>
        </AnimatePresence>

        <LeftButton
          onClick={decreaseIndex}
          variants={ButtonVariants}
          initial="initial"
          whileHover="hover"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="#fff"
              d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"
            />
          </svg>
        </LeftButton>
        <RightButton
          onClick={incraseIndex}
          variants={ButtonVariants}
          initial="initial"
          whileHover="hover"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="#fff"
              d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"
            />
          </svg>
        </RightButton>
      </Slider>
      <AnimatePresence>
        {bigMovieMatch ? (
          <>
            <Overlay
              onClick={onOverlayClick}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            <BigMovie
              layoutId={bigMovieMatch.params.movieId + type}
              style={{ top: scrollY.get() + 40 }}
            >
              {clickMovie && (
                <>
                  <BigCover
                    style={{
                      backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                        clickMovie.backdrop_path,
                        "w500"
                      )})`,
                    }}
                  >
                    <BigTitle>{clickMovie.title}</BigTitle>
                  </BigCover>

                  <BigInfo>
                    <BigOverview>
                      <div style={{ display: "flex", marginBottom: "10px" }}>
                        {movieDetail?.release_date} &nbsp;{" "}
                        <div style={{ opacity: 0.3 }}>상영시간:</div>
                        &nbsp;
                        {Math.floor(
                          Number(movieDetail?.runtime) / 60
                        )} 시간 {Number(movieDetail?.runtime) % 60} 분 &nbsp;
                        <div style={{ opacity: 0.3 }}>평점: &nbsp;</div>❤️
                        {movieDetail?.vote_average}
                      </div>
                      <div
                        style={{
                          marginBottom: "10px",
                          fontWeight: "bold",
                          fontSize: "20px",
                        }}
                      >
                        {movieDetail?.tagline}
                      </div>
                      {clickMovie.overview}{" "}
                    </BigOverview>
                    <BigMany>
                      <BigGenre>
                        <span style={{ opacity: 0.3, fontSize: "14px" }}>
                          장르:{" "}
                        </span>
                        {movieDetail?.genres.map((data) => (
                          <Link key={data.id} to={window.location.pathname}>
                            {data.name + ",  "}
                          </Link>
                        ))}
                      </BigGenre>
                      <BigGenre>
                        <span style={{ opacity: 0.3, fontSize: "14px" }}>
                          배우:{" "}
                        </span>
                        {movieCredit?.cast.slice(0, 5).map((data) => (
                          <Link key={data.id} to={window.location.pathname}>
                            {data.name + ", "}
                          </Link>
                        ))}{" "}
                        <Link
                          to={window.location.pathname}
                          style={{ opacity: 0.3, fontSize: "12px" }}
                        >
                          +더보기
                        </Link>
                      </BigGenre>
                    </BigMany>
                  </BigInfo>
                </>
              )}
            </BigMovie>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export function Row2({ type }: { type: TypeShows }) {
  const { data, isLoading } = useQuery<ITvShows>(["tvs", type], () =>
    getTvShows(type)
  );

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const navigate = useNavigate();
  const bigTvMatch = useMatch(`/tv/tvs/${type}/:tvId`);
  const { scrollY } = useScroll();

  const [isNext, setNext] = useState(true);
  const decreaseIndex = () => {
    if (data) {
      if (leaving) return;
      setNext(false);
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;

      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  const incraseIndex = () => {
    if (data) {
      if (leaving) return;
      setNext(true);
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;

      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const onBoxClicked = ({
    tvId,
    category,
  }: {
    tvId: number;
    category: string;
  }) => {
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
    navigate(`/tv/tvs/${category}/${tvId}`);
  };
  const onOverlayClick = () => {
    document.getElementsByTagName("body")[0].style.overflowY = "auto";
    navigate(-1);
  };
  const clickTv =
    bigTvMatch?.params.tvId &&
    data?.results.find((tv) => String(tv.id) === bigTvMatch.params.tvId);

  const { data: clickedTvDetail, isLoading: isLoadingDetail } =
    useQuery<ITvShowsDetail>([bigTvMatch?.params.tvId, "detail"], () =>
      getTvDetail(bigTvMatch?.params.tvId)
    );
  const { data: clickedTvCredit, isLoading: isLoadingCredit } =
    useQuery<IGetTvCredit>([bigTvMatch?.params.tvId, "credit"], () =>
      getTvCredit(bigTvMatch?.params.tvId)
    );

  return (
    <>
      <Slider>
        <AnimatePresence
          initial={false}
          onExitComplete={toggleLeaving}
          custom={isNext}
        >
          <h2
            style={{
              marginBottom: "20px",
              fontSize: "25px",
              fontWeight: "900",
            }}
          >
            {type}
          </h2>
          <Row1
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 1 }}
            key={index + type}
            custom={isNext}
          >
            {data?.results
              .slice(offset * index, offset * index + offset)
              .map((tv) => (
                <Box
                  layoutId={tv.id + type}
                  key={tv.id + type}
                  whileHover="hover"
                  initial="normal"
                  variants={boxVariants}
                  onClick={() => onBoxClicked({ tvId: tv.id, category: type })}
                  transition={{ type: "tween" }}
                  bgphoto={makeImagePath(tv.backdrop_path, "w500")}
                >
                  <Info variants={infoVariants}>
                    <h4>{tv.name}</h4>
                  </Info>
                </Box>
              ))}
          </Row1>
        </AnimatePresence>

        <LeftButton
          onClick={decreaseIndex}
          variants={ButtonVariants}
          initial="initial"
          whileHover="hover"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="#fff"
              d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"
            />
          </svg>
        </LeftButton>
        <RightButton
          onClick={incraseIndex}
          variants={ButtonVariants}
          initial="initial"
          whileHover="hover"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="#fff"
              d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"
            />
          </svg>
        </RightButton>
      </Slider>
      <AnimatePresence>
        {bigTvMatch ? (
          <>
            <Overlay
              onClick={onOverlayClick}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            <BigMovie
              layoutId={bigTvMatch.params.tvId + type}
              style={{ top: scrollY.get() + 40 }}
            >
              {clickTv && (
                <>
                  <BigCover
                    style={{
                      backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                        clickTv.backdrop_path,
                        "w500"
                      )})`,
                    }}
                  >
                    <BigTitle>{clickTv.name}</BigTitle>
                  </BigCover>

                  <BigInfo>
                    <BigOverview>
                      <div style={{ display: "flex", marginBottom: "10px" }}>
                        {clickedTvDetail?.first_air_date} &nbsp; 에피소드{" "}
                        {clickedTvDetail?.number_of_episodes}개/ 총{" "}
                        {clickedTvDetail?.number_of_seasons}시즌&nbsp;
                        <div style={{ opacity: 0.3 }}>평점: &nbsp;</div>❤️{" "}
                        {" " + clickedTvDetail?.vote_average}
                      </div>
                      <div
                        style={{
                          marginBottom: "10px",
                          fontWeight: "bold",
                          fontSize: "20px",
                        }}
                      ></div>
                      {clickedTvDetail?.overview ? (
                        <div style={{ opacity: 0.7 }}>
                          {clickedTvDetail?.overview}
                        </div>
                      ) : (
                        <div style={{ opacity: 0.7 }}>
                          데이터가 없어서.. Lorem Ipsum is simply dummy text of
                          the printing and typesetting industry. Lorem Ipsum has
                          been the industry's standard dummy text ever since the
                          1500s, when an unknown printer took a galley of type
                          and scrambled it to make a type specimen book. It has
                          survived not only five centuries, but also the leap
                          into electronic typesetting, remaining essentially
                          unchanged. It was popularised in the 1960s with the
                          release of Letraset sheets containing Lorem Ipsum
                          passages, and more recently with desktop publishing
                          software like Aldus PageMaker including versions of
                          Lorem Ipsum.
                        </div>
                      )}
                    </BigOverview>
                    <BigMany>
                      <BigGenre>
                        <span style={{ opacity: 0.3, fontSize: "14px" }}>
                          장르:{" "}
                        </span>
                        {clickedTvDetail?.genres.map((data) => (
                          <Link key={data.id} to={window.location.pathname}>
                            {data.name + ",  "}
                          </Link>
                        ))}
                      </BigGenre>
                      <BigGenre>
                        <span style={{ opacity: 0.3, fontSize: "14px" }}>
                          배우:{" "}
                        </span>
                        {clickedTvCredit?.cast.slice(0, 5).map((data) => (
                          <Link key={data.id} to={window.location.pathname}>
                            {data.name + ", "}
                          </Link>
                        ))}{" "}
                        <Link
                          to={window.location.pathname}
                          style={{ opacity: 0.3, fontSize: "12px" }}
                        >
                          +더보기
                        </Link>
                      </BigGenre>
                      <BigGenre>
                        <div style={{ opacity: 0.3 }}>
                          에피소드 회차당 시간: &nbsp;
                        </div>{" "}
                        {"  "}
                        {clickedTvDetail?.episode_run_time ? (
                          clickedTvDetail?.episode_run_time
                        ) : (
                          <div>??</div>
                        )}{" "}
                        분 &nbsp;{" "}
                      </BigGenre>
                    </BigMany>
                  </BigInfo>
                </>
              )}
            </BigMovie>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
