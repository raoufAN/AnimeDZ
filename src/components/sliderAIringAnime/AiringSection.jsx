import { useEffect, useRef, useState } from "react";
import "./airingSection.css";
import { useGlobalContext } from "../../context/useGlobalContext";
import SingleSlider from "./SingleSlider";
import { Link } from "react-router-dom";

import SingleItemList from "./singleItemList";

const listOfSeasons = ["Airing Now", "Spring", "Summer", "Fall", "Winter"];
const year = new Date().getFullYear();
const month = new Date().getMonth();

const AiringSection = () => {
  const [whichSeason, setWhichSeason] = useState("Airing Now");
  const [whichYear, setWhichYear] = useState(year);

  const { getAiringSeason } = useGlobalContext();

  const titleRef = useRef();
  const handleSaisonClick = (saison) => {
    Array.from(titleRef.current.childNodes).map((item) => {
      item.classList.remove("active");
      if (item.innerHTML === saison) {
        setWhichSeason(saison);
        item.classList.add("active");
      }
    });
  };

  useEffect(() => {
    if (whichSeason !== "Airing Now") {
      if (month > 2 && whichSeason === "Winter") {
        getAiringSeason(year + 1, whichSeason.toLowerCase(), 1);
        setWhichYear(year + 1);
      } else if (month > 5 && whichSeason === "Spring") {
        getAiringSeason(year + 1, whichSeason.toLowerCase(), 1);
        setWhichYear(year + 1);
      } else if (month > 8 && whichSeason === "Summer") {
        getAiringSeason(year + 1, whichSeason.toLowerCase(), 1);
        setWhichYear(year + 1);
      } else if (month > 11 && whichSeason === "Fall") {
        getAiringSeason(year + 1, whichSeason.toLowerCase(), 1);
        setWhichYear(year + 1);
      } else {
        getAiringSeason(year, whichSeason.toLowerCase(), 1);
        setWhichYear(year);
      }
    }
  }, [whichSeason, getAiringSeason]);

  return (
    <div className="SliderAiringAnime">
      <div className="container">
        <div className="slider">
          <div className="titles-list" ref={titleRef}>
            {listOfSeasons.map((item, index) => {
              return (
                <span
                  key={index}
                  className={item === "Airing Now" ? "active" : ""}
                  onClick={() => handleSaisonClick(item)}>
                  {item}
                </span>
              );
            })}
            <Link className="button" to={`home/${whichSeason}/${whichYear}`} target="_blank">
              View All
            </Link>
          </div>
          <div className="sliderList">
            <SingleSlider whichSeason={whichSeason} AiringSeason />
          </div>
        </div>
        <div className="list">
          <div className="title">
            <h4>Recent Episodes</h4>
          </div>
          <div className="list-new-airing">
            <SingleItemList />
          </div>
          <Link to={`recentEp`} target="_blank">
            <span className="button"> View All</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AiringSection;
