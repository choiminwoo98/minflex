import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  getSearchKey,
  getSearchMovie,
  getSearchTv,
  IGetMoviesResult,
  IGetSearchKey,
  ITvShows,
} from "../api";
import { Row } from "../Components/Row";
import { MovieSearch, TvSearch } from "../Components/SearchRow";
import { Types } from "../utils";

const Wrapper = styled.div`
  margin-top: 80px;
  margin-left: 50px;
  margin-right: 50px;
  display: flex;
  flex-direction: column;
`;
const RelatedText = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

  align-items: flex-start;
  position: relative;
  height: 160px;
  margin-left: 5px;
  margin-right: 4%;
  word-break: break-all;
`;
const RelatedTextUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const RelatedTextLi = styled.li`
  font-size: 15px;
  flex: 0;
  margin-top: 2px;
  flex-wrap: wrap;
  white-space: nowrap;
  list-style: none;
  border-right: 1px solid grey;
  padding-right: 5px;
  padding-left: 5px;
  cursor: pointer;
  &:last-child {
    border: none;
  }
  &:hover {
    color: red;
  }
`;
const Button = styled.button`
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 50px;
  outline: none;
  border: none;
  border-radius: 4px;
  color: black;
  font-weight: bold;
  cursor: pointer;
  font-size: 16px;
  background: #ffffff;
  &:hover {
    background: #909090;
  }
  &:active {
    background: #606060;
  }
`;
export default function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const [movie, isMovie] = useState(true);
  const onButtonClick = () => {
    isMovie((prev) => !prev);
    refetch();
  };

  const keyword = new URLSearchParams(location.search).get("keyword");

  const {
    data: keyData,
    isLoading: keyLoading,
    refetch,
  } = useQuery<IGetSearchKey>(["search", "key"], () => getSearchKey(keyword!));

  return (
    <Wrapper>
      <RelatedText>
        <div style={{ whiteSpace: "nowrap", color: "grey" }}>
          {" "}
          다음과 관련된 콘텐츠:{" "}
        </div>
        &nbsp;&nbsp;
        <RelatedTextUl>
          {keyData?.results.slice(0, 10).map((data) => (
            <RelatedTextLi
              key={data.id}
              onClick={() => {
                navigate(
                  `/search?keyword=${data.name ? data.name : data.title}`
                );
                refetch();
              }}
            >
              {data.name ? data.name : data.title}{" "}
            </RelatedTextLi>
          ))}
        </RelatedTextUl>
        <Button onClick={onButtonClick}>검색 변경</Button>
      </RelatedText>

      {movie ? (
        <MovieSearch keyword={keyword} />
      ) : (
        <TvSearch keyword={keyword} />
      )}
    </Wrapper>
  );
}
