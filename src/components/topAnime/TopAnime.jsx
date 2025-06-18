import { useEffect, useState } from "react";
import "./topAnime.css";
import { useGlobalContext } from "../../context/useGlobalContext";
import Slider from "../slider/Slider";
import { Link } from "react-router-dom";

const year = new Date().getFullYear();

const TopAnime = () => {
  const { TopAnime, WindowSeize } = useGlobalContext();
  const [numberOfItems, setNumberOfItems] = useState(5);

  useEffect(() => {
    if (WindowSeize > 1100) {
      setNumberOfItems(5);
    } else if (WindowSeize > 850) {
      setNumberOfItems(4);
    } else if (WindowSeize > 650) {
      setNumberOfItems(3);
    } else if (WindowSeize > 400) {
      setNumberOfItems(2);
    } else {
      setNumberOfItems(1);
    }
  }, [WindowSeize]);

  return (
    <div className="top-anime">
      <div className="container">
        <div className="wrapper-title-button">
          <h1>Top Anime</h1>
          <Link className="button" to={`home/TopAnime/${year}`} target="_blank">
            View All
          </Link>
        </div>
        <Slider animeArray={TopAnime} numberOfSlides={numberOfItems} type={"anime"} />
      </div>
    </div>
  );
};

export default TopAnime;
