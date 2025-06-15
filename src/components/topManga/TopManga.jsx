import { useEffect, useState } from "react";
import "./TopManga.css";
import { useGlobalContext } from "../../context/useGlobalContext";
import Slider from "../slider/Slider";
import { Link } from "react-router-dom";

const year = new Date().getFullYear();

const TopManga = () => {
  const { TopManga, WindowSeize } = useGlobalContext();
  const [numberOfItems, setNumberOfItems] = useState(5);

  useEffect(() => {
    if (WindowSeize > 1100) {
      setNumberOfItems(5);
    } else if (WindowSeize > 850) {
      setNumberOfItems(4);
    } else if (WindowSeize > 650) {
      setNumberOfItems(3);
    } else if (WindowSeize > 460) {
      setNumberOfItems(2);
    } else {
      setNumberOfItems(1);
    }
  }, [WindowSeize]);
  return (
    <div className="top-manga">
      <div className="container">
        <div className="wrapper-title-button">
          <h1>Top Manga</h1>
          <Link className="button" to={`home/TopManga/${year}`} target="_blank">
            View All
          </Link>
        </div>
        <Slider animeArray={TopManga} numberOfSlides={numberOfItems} type={"manga"} />
      </div>
    </div>
  );
};

export default TopManga;
