import React, { useEffect, useState } from "react";
import "./characters.css";
import { Link, useParams } from "react-router-dom";

const Characters = () => {
  const { id_anime, name, id_charcater } = useParams();
  const [characterPicture, setCharacterPicture] = useState([]);
  const [indexPic, setIndexPic] = useState(0);

  const getAnimePictures = async (id) => {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/characters/${id}/pictures`);
      const data = await response.json();
      if (!response.ok) {
        console.error("Request failed with status:", response.status);
        return;
      }
      setCharacterPicture(data.data);
      console.log(data.data);
    } catch (error) {
      console.error("Error Fetching Data : ", error);
    }
  };

  useEffect(() => {
    getAnimePictures(id_charcater);
  }, [id_charcater]);

  return (
    <div className="characters">
      <Link to={`/anime/${id_anime}`} className="back">
        <i className="fa-solid fa-arrow-left "></i> Go Back
      </Link>
      <div className="container">
        <h1>{name}</h1>
        <div className="single-image">
          <img src={characterPicture[indexPic]?.jpg.image_url} alt={name} />
        </div>
        <h1>More Pictures</h1>
        <div className="pictures">
          {characterPicture.map((el, index) => {
            return (
              <div className="picture" key={index} onClick={() => setIndexPic(index)}>
                <img src={el?.jpg.image_url} alt={name} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Characters;
