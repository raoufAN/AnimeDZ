import "./sliderHero.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";
import dataSlider from "../../dataSilder/dataSlider";
import ItemInSlider from "./ItemInSlider";

const SliderHero = () => {
  return (
    <div className="heroSlider">
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {dataSlider.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <ItemInSlider data={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default SliderHero;
