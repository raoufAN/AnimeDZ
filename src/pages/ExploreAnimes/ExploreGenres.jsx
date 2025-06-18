import "./exploreAnime.css";
import { useGlobalContext } from "../../context/useGlobalContext";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useRef } from "react";
import Footer from "../../components/footer/Footer";

const ExploreGenres = () => {
  const { name, id_genre } = useParams();
  const [currentPage, setCurrentPages] = useState(1);
  let { GenresPages, AnimeGenres, getAnimeGenres, handleFavorite, heart } = useGlobalContext();
  const topRef = useRef(null);

  useEffect(() => {
    getAnimeGenres(id_genre, currentPage);
  });

  return (
    <div className="explore-anime" ref={topRef}>
      <div className="container">
        <h1>Genre : {name}</h1>
        <div className="boxes">
          {AnimeGenres?.length > 0 ? (
            AnimeGenres.filter((item, index, self) => {
              return index === self.findIndex((t) => t.title === item.title);
            }).map((item, index) => (
              <div className="box" key={index}>
                <div className="image-wrapper">
                  <div className="overlay-image"></div>
                  <img src={item?.images?.jpg?.image_url} alt={item?.title} loading="lazy" />
                </div>
                <div className="bottom-wrapper">
                  <div className="type">{item.genres.map((genre) => genre.name).join(", ")}</div>
                  <Link to={`/anime/${item.mal_id}`} target="_blank">
                    <h4 className="title" alt={item.title_english}>
                      {item.title_english || item.title}
                    </h4>
                  </Link>
                  <div className="score-heart">
                    <div className="score">
                      {item.score !== null ? (
                        <>
                          {item.score}
                          <i className="fa-solid fa-star"></i>
                        </>
                      ) : (
                        item?.aired?.string?.split("t")[0]
                      )}
                    </div>
                    <i
                      key={heart}
                      className={`fa-solid fa-heart heart ${
                        heart.length > 0
                          ? heart.some((el) => el.id === item.mal_id)
                            ? "red"
                            : ""
                          : ""
                      }`}
                      onClick={() => {
                        handleFavorite(
                          item.mal_id,
                          "anime",
                          item.title_english ? item.title_english : item.titl
                        );
                      }}></i>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="loading">Loading... 👯‍♂️ </p>
          )}
        </div>
        <div className="pagination-box">
          <Stack spacing={2}>
            <Pagination
              count={GenresPages}
              onChange={(event, value) => {
                setCurrentPages(value);
                topRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
              variant="outlined"
              color="primary"
            />
          </Stack>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ExploreGenres;
