import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import "./slider.css";
import { Link } from "react-router-dom";

const Slider = ({ animeArray, numberOfSlides, keyElement, type }) => {
  return (
    <Swiper
      slidesPerView={numberOfSlides}
      key={keyElement ?? ""}
      spaceBetween={15}
      freeMode={true}
      pagination={{
        clickable: true,
      }}
      modules={[FreeMode, Pagination]}
      className="mySwiper solo">
      {animeArray
        .filter((el, index, self) => {
          return index === self.findIndex((t) => t.title === el.title);
        })
        .map((item, index) => (
          <SwiperSlide key={index}>
            <div className="image-wrapper">
              <img src={item.images.jpg.image_url} alt={item?.title} loading="lazy" />
            </div>
            <div className="bottom-wrapper">
              <div className="type">
                {item.genres.map((genre) => {
                  return genre.name + " ";
                })}
              </div>
              <Link to={`/${type}/${item.mal_id}`} target="_blank">
                <h4 className="title" alt={item.title_english}>
                  {item.title_english ? item.title_english : item.title}
                </h4>
              </Link>

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
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default Slider;
