import "./exploreAnime.css";
import { useGlobalContext } from "../../context/useGlobalContext";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useRef } from "react";
import Footer from "../../components/footer/Footer";

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
    handleFavorite,
    heart,
  } = useGlobalContext();
  const { explore, year } = useParams();
  const [currentPage, setCurrentPages] = useState(1);
  const [type, setType] = useState(null);

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
  }, [currentPage, explore, year]);

  if (explore === "Airing Now") animeArray = AiringNow;
  else if (explore === "TopAnime") animeArray = TopAnime;
  else if (explore === "TopManga") animeArray = TopManga;
  else animeArray = AiringSeason;

  useEffect(() => {
    if (explore === "TopManga") setType("manga");
    else setType("anime");
  }, [explore]);

  return (
    <div className="explore-anime" ref={topRef}>
      <div className="container">
        <h1>{explore.replace(/([a-z])([A-Z])/g, "$1 $2")} </h1>
        <div className="boxes">
          {animeArray?.length > 0 ? (
            animeArray
              .filter((item, index, self) => {
                return index === self.findIndex((t) => t.title === item.title);
              })
              .map((item, index) => (
                <div className="box" key={index}>
                  <div className="image-wrapper">
                    <div className="overlay-image"></div>
                    <img src={item?.images?.jpg?.image_url} alt={item?.title} loading="lazy" />
                  </div>
                  <div className="bottom-wrapper">
                    <div className="type">{item.genres.map((genre) => genre.name).join(", ")}</div>
                    <Link
                      to={`/${explore === "TopManga" ? "manga" : "anime"}/${item.mal_id}`}
                      target="_blank">
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
                            type,
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
      <Footer />
    </div>
  );
};

export default ExplorePage;
