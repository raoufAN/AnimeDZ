import React from "react";
import "./exploreAnime.css";
import useGlobalContext from "../../context/useGlobalContext";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useRef } from "react";

const ExplorePage = () => {
  let animeArray = [];
  let {
    Pages,
    getAiringSeason,
    AiringSeason,
    AiringNow,
    Airing,
    getTopAnime,
    TopAnime,
    getTopManga,
    TopManga,
  } = useGlobalContext();
  const { explore, year } = useParams();
  const [currentPage, setCurrentPages] = useState(1);
  const topRef = useRef(null);

  useEffect(() => {
    if (explore === "Airing Now") {
      Airing(currentPage);
    } else if (explore === "TopAnime") {
      getTopAnime(currentPage);
    } else if (explore === "TopManga") {
      getTopManga(currentPage);
    } else {
      getAiringSeason(year, explore, currentPage);
    }
  }, [
    currentPage,
    getAiringSeason,
    explore,
    year,
    Airing,
    AiringNow,
    AiringSeason,
    getTopAnime,
    TopAnime,
    getTopManga,
    TopManga,
  ]);

  if (explore === "Airing Now") animeArray = AiringNow;
  else if (explore === "TopAnime") animeArray = TopAnime;
  else if (explore === "TopManga") animeArray = TopManga;
  else animeArray = AiringSeason;

  return (
    <div className="explore-anime" ref={topRef}>
      <div className="container">
        <h1>{explore} Anime</h1>
        <div className="boxes">
          {animeArray?.length > 0 ? (
            animeArray
              .filter((item, index, self) => {
                return index === self.findIndex((t) => t.title === item.title);
              })
              .map((item, index) => (
                <div className="box" key={index}>
                  <div className="image-wrapper">
                    <img src={item?.images?.jpg?.image_url} alt={item?.title} loading="lazy" />
                  </div>
                  <div className="bottom-wrapper">
                    <div className="type">{item.genres.map((genre) => genre.name).join(", ")}</div>
                    <Link to={`/anime/${item.mal_id}`} target="_blank">
                      <h4 className="title" alt={item.title_english}>
                        {item.title_english || item.title}
                      </h4>
                    </Link>
                    <div className="score">
                      {item.score !== null ? (
                        <>
                          {item.score} <i className="fa-solid fa-star"></i>
                        </>
                      ) : (
                        item?.aired?.string?.split("t")[0]
                      )}
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="pagination-box">
          <Stack spacing={2}>
            <Pagination
              count={Pages}
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
    </div>
  );
};

export default ExplorePage;
