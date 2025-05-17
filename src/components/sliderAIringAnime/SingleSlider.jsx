import React, { useEffect, useState } from "react";
import useGlobalContext from "../../context/useGlobalContext";
import Slider from "../slider/Slider";

const SingleSlider = ({ whichSeason }) => {
  const { AiringNow, AiringSeason, WindowSeize } = useGlobalContext();
  const [numberOfItems, setNumberOfItems] = useState(3);

  useEffect(() => {
    if (WindowSeize > 900 && WindowSeize < 1200) {
      setNumberOfItems(4);
    } else if (WindowSeize > 400 && WindowSeize < 680) {
      setNumberOfItems(2);
    } else if (WindowSeize < 400) {
      setNumberOfItems(1);
    } else {
      setNumberOfItems(3);
    }
  }, [WindowSeize]);

  return (
    <>
      {whichSeason !== "Airing Now" ? (
        <Slider
          animeArray={AiringSeason}
          keyElement={whichSeason}
          numberOfSlides={numberOfItems}
          type={"anime"}
        />
      ) : (
        <Slider
          animeArray={AiringNow}
          keyElement={whichSeason}
          numberOfSlides={numberOfItems}
          type={"anime"}
        />
      )}

      <div className="custom-pagination"></div>
    </>
  );
};

export default SingleSlider;

/*

<Swiper
          key={whichSeason}
          slidesPerView={numberOfItems}
          spaceBetween={10}
          freeMode={true}
          pagination={{
            el: ".custom-pagination",
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper">
          {AiringSeason.map((item, index) => (
            <SwiperSlide key={index}>
              <img src={item.images.jpg.image_url} alt="" />
              <div className="bottom">
                <div className="type">
                  {item.genres.map((genre) => {
                    return genre.name + " ";
                  })}
                </div>
                <h4 className="title" alt={item.title_english}>
                  {item.title_english ? item.title_english : item.title}
                </h4>
                <div className="score">
                  <i className="fa-solid fa-clock clock"></i>

                  {Object.values(item.aired.prop.from).map((el, index) => {
                    let releaseDate;
                    if (index < 2) {
                      releaseDate = el >= 10 ? el + "/" : "0" + el + "/";
                    } else {
                      releaseDate = el;
                    }

                    return releaseDate;
                  })}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>*/

/*
         <Swiper
          key={whichSeason}
          slidesPerView={numberOfItems}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            el: ".custom-pagination",
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper">
          {AiringNow.map((item, index) => (
            <SwiperSlide key={index}>
              <img src={item.images.jpg.image_url} alt="" />
              <div className="bottom">
                <div className="type">
                  {item.genres.map((genre) => {
                    return genre.name + " ";
                  })}
                </div>
                <h4 className="title" alt={item.title_english}>
                  {item.title_english ? item.title_english : item.title}
                </h4>
                <div className="score">
                  {item.score}
                  <i className="fa-solid fa-star"></i>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>*/
