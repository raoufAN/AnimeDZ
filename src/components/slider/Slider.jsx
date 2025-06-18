import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/scrollbar"; // ✅ Required for scrollbar drag to appear

import { FreeMode, Scrollbar } from "swiper/modules";
import "./slider.css";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/useGlobalContext";

const Slider = ({ animeArray, numberOfSlides, keyElement, type }) => {
  const { handleFavorite, heart } = useGlobalContext();
  return (
    <Swiper
      slidesPerView={numberOfSlides}
      key={keyElement ?? ""}
      spaceBetween={15}
      freeMode={true}
      scrollbar={{
        draggable: true,
      }}
      modules={[FreeMode, Scrollbar]}
      className="mySwiper solo">
      {animeArray
        .filter((el, index, self) => {
          return index === self.findIndex((t) => t.title === el.title);
        })
        .map((item, index) => (
          <SwiperSlide key={index}>
            <div className="image-wrapper">
              <div className="overlay-image"></div>

              <img src={item.images.jpg.image_url} alt={item?.title} loading="lazy" />
            </div>
            <div className="bottom-wrapper">
              <div className="type">
                {item.genres.map((genre) => {
                  return genre.name + " ";
                })}
              </div>
              <Link to={`${type}/${item.mal_id}`} target="_blank">
                <h4 className="title" alt={item.title_english}>
                  {item.title_english ? item.title_english : item.title}
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
                    heart.length > 0 ? (heart.some((el) => el.id === item.mal_id) ? "red" : "") : ""
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
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default Slider;
