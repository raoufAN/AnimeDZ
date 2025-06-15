import { useRef, useState } from "react";
import "./Genres.css";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/useGlobalContext";

const Genres = () => {
  const { Genres } = useGlobalContext();
  const [seeAll, setSeeAll] = useState(false);
  const wrapperRef = useRef(null);

  return (
    <div className="genres" ref={wrapperRef}>
      <div className="container">
        <h1>Anime Genres</h1>
        <div className="wrapper">
          {(seeAll ? Genres : Genres?.slice(0, 16))?.map((el, index) => (
            <Link
              key={index}
              className="genre"
              to={`genre/${el.name}/${el.mal_id}`}
              target="_blank">
              <p>{el.name}</p>

              <span>{el.count}</span>
            </Link>
          ))}
        </div>
        <div
          className="button"
          onClick={() =>
            setSeeAll((prev) => {
              const newState = !prev;

              // If collapsing, scroll the wrapper into view
              if (!newState && wrapperRef.current) {
                wrapperRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
              }

              return newState;
            })
          }>
          {seeAll ? "See Less" : "See All"}
        </div>
      </div>
    </div>
  );
};

export default Genres;
