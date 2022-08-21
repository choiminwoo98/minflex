import { Types, TypeShows } from "./utils";

const API_KEY = "b8d61f0d814a30ae352f5f147d33663a";
const BASE_PATH = "https://api.themoviedb.org/3";
export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}
export interface IGetMoviesResult {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}
export interface IGetMovieDetailsResult {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: [
    {
      id: number;
      logo_path: string;
      name: string;
      origin_country: string;
    }
  ];
  production_countries: [
    {
      iso_3166_1: string;
      name: string;
    }
  ];
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export interface IGetMovieCredit {
  id: number;
  cast: [
    {
      id: number;
      name: string;
      original_name: string;
      character: string;
      profile_path: string;
    }
  ];
  crew: [
    {
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      profile_path: string;
    }
  ];
}

interface ITvShow {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}
export interface ITvShows {
  page: number;
  results: ITvShow[];
  total_pages: number;
}
export interface ITvShowsDetail {
  adult: boolean;
  backdrop_path: string;
  episode_run_time: [number];
  first_air_date: string;
  last_air_date: string;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: [string];
  networks: [
    {
      name: string;
      id: number;
      logo_path: string;
      origin_country: string;
    }
  ];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: [string];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;

  vote_average: number;
  vote_count: number;
}

export interface IGetTvCredit {
  id: number;
  cast: [
    {
      id: number;
      name: string;
      original_name: string;
      character: string;
      profile_path: string;
    }
  ];
  crew: [
    {
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      profile_path: string;
    }
  ];
}

interface ISearchResult {
  id: number;
  name?: string;
  title?: string;
}

export interface IGetSearchKey {
  page: number;
  results: ISearchResult[];
  total_pages: number;
  total_results: number;
}

export async function getMovies(type: Types) {
  const response = await fetch(
    `${BASE_PATH}/movie/${type}?api_key=${API_KEY}&language=ko&page=1`
  );
  return await response.json();
}

export async function getMovieDetail(movieId: string | undefined) {
  const response = await fetch(
    `${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}&language=ko`
  );
  return await response.json();
}

export async function getMovieCredit(movieId: string | undefined) {
  return await (
    await fetch(
      `${BASE_PATH}/movie/${movieId}/credits?api_key=${API_KEY}&language=ko`
    )
  ).json();
}

export async function getTvShows(type: TypeShows) {
  const response = await fetch(
    `${BASE_PATH}/tv/${type}?api_key=${API_KEY}&language=en-US&page=1`
  );
  return await response.json();
}

export async function getTvDetail(tvId: string | undefined) {
  const response = await fetch(
    `${BASE_PATH}/tv/${tvId}?api_key=${API_KEY}&language=ko`
  );
  return await response.json();
}
export async function getTvCredit(id: string | undefined) {
  return await (
    await fetch(`${BASE_PATH}/tv/${id}/credits?api_key=${API_KEY}&language=ko`)
  ).json();
}
export async function getSearchKey(keyword: string | undefined) {
  return await (
    await fetch(
      `${BASE_PATH}/search/multi?api_key=${API_KEY}&language=ko&query=${keyword}&page=1&include_adult=false&region=KR`
    )
  ).json();
}

export async function getSearchMovie(keyword: string | null) {
  return await (
    await fetch(
      `${BASE_PATH}/search/movie?api_key=${API_KEY}&language=ko&query=${keyword}&page=1&include_adult=false&region=KR`
    )
  ).json();
}
export async function getSearchTv(keyword: string | null) {
  return await (
    await fetch(
      `${BASE_PATH}/search/tv?api_key=${API_KEY}&language=ko&&page=1&query=${keyword}&include_adult=false`
    )
  ).json();
}
