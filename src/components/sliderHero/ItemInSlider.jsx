import React, { useEffect, useState } from "react";
import "./sliderHero.css";
import { Link } from "react-router-dom";

const ItemInSlider = ({ data }) => {
  const [Windowseize, setWindowSeize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowSeize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="itemSlider"
      style={{
        backgroundImage: `url(${Windowseize > 700 ? data.backImage : data.posterImage}`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <div className="container">
        <div className="left-page">
          <h1 className="title">{data.title}</h1>
          <p className="desc">
            {data.description.length > 500 ? data.description.slice(0, 500) : data.description}....
          </p>
          <div className="buttons">
            <span className="trailer">
              <a href={data.trailer} target="_blank" rel="noopener noreferrer">
                Watch Trailer
              </a>
            </span>
            <span className="see-details">
              <Link to={`/anime/${data.id}`} target="_blank">
                See More Details
              </Link>
            </span>
          </div>
        </div>
        <div className={Windowseize > 700 ? "right-page" : "right-page hide"}>
          <div className="poster">
            <img src={data.posterImage} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemInSlider;
