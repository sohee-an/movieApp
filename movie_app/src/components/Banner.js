import React, { useState, useEffect, useCallback } from "react";
import "./Banner.css";
import styled from "styled-components";
import axios from "../api/axios";
import requests from "../api/requests";

const Banner = () => {
  const [movie, setMovie] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [settingVideoButton, setSettingVideoButton] = useState(true);

  useEffect(() => {
    //랜덤으로 무비 정보 가져오기
    fetchData();
  }, []);

  const fetchData = async () => {
    const request = await axios.get(requests.fetchNowPlaying);

    const movieId =
      request.data.results[
        Math.floor(Math.random() * request.data.results.length)
      ].id;

    //movie 디테일 내용
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: "videos" },
    });
    setMovie(movieDetail);
  };

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  useEffect(() => {
    if (movie.videos?.results[0] === undefined) {
      setSettingVideoButton(false);
    } else {
      setSettingVideoButton(true);
    }
  }, [movie]);

  console.log(movie);
  console.log(movie.videos?.results[0]);

  if (isClicked) {
    return (
      <Container>
        <HomeContainer>
          <Iframe
            width="640"
            height="360"
            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}
          ?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
            title=""
            frameBorder="0"
            allow="autoplay; fullscreen"
          ></Iframe>
        </HomeContainer>
      </Container>
    );
  } else {
    return (
      <header
        className="banner"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        <div className="banner_contents">
          <h1 className="banner_title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className="banner_buttons">
            {settingVideoButton ? (
              <button
                className="banner_button_play"
                onClick={() => setIsClicked(true)}
              >
                Play
              </button>
            ) : undefined}
            <button className="banner_button_info">More Information</button>
          </div>
          <h1 className="banner_description">
            {truncate(movie?.overview, 100)}
          </h1>
        </div>
        <div className="banner_fadeBottom"></div>
      </header>
    );
  }
};

export default Banner;
const Container = styled.div`
display:flex;
justify-content:center;
align-items:center;
width:100%
height:100vh;
`;
const HomeContainer = styled.div`
  width: 100%;
  height: 100vw;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }
`;
