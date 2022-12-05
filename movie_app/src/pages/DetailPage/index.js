import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import "./DetailPage.css";
import styled from "styled-components";

const DetailPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [settingVideoButton, setSettingVideoButton] = useState(true);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(`/movie/${movieId}`, {
        params: { append_to_response: "videos" },
      });
      console.log(request.data);
      setMovie(request.data);
    }
    fetchData();
  }, [movieId]);
  console.log(movie);
  useEffect(() => {
    if (movie.videos?.results[0] === undefined) {
      setSettingVideoButton(false);
    } else {
      setSettingVideoButton(true);
    }
  }, [movie]);

  if (!movie) return <div>...loading</div>;

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
      <section>
        <img
          className="detail__poster-img"
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          alt="poster"
        />
        <div className="detail-container">
          <div className="detail_top">
            <h2 className="title">
              {movie.original_title}({movie.title})
            </h2>
            {settingVideoButton ? (
              <button className="button" onClick={() => setIsClicked(true)}>
                Play
              </button>
            ) : undefined}
            {/* <button className="button">video</button> */}
          </div>
          <dl className="detail_middle">
            <div className="popularity_block">
              <dt>평점:</dt>
              <dd>{movie.popularity}</dd>
            </div>
            <div className="runtime_block">
              <dt>(runtime: </dt>
              <dd>{movie.runtime}분)</dd>
            </div>
          </dl>

          <p className="tagline">"{movie.tagline}"</p>
          <p className="description">{movie.overview}</p>
        </div>
      </section>
    );
  }
};
export default DetailPage;
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
