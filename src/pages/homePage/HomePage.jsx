import React from "react";
import "./homePage.css";

import Header from "../../components/header/Header";
import SliderHero from "../../components/sliderHero/SliderHero";
import AiringSection from "../../components/sliderAIringAnime/airingSection";
import TopAnime from "../../components/topAnime/TopAnime";
import TopManga from "../../components/topManga/TopManga";
import AnimeNews from "../../components/animeNews/AnimeNews";
import Footer from "../../components/footer/Footer";

const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <SliderHero />
      <AiringSection />
      <TopAnime />
      <TopManga />
    </div>
  );
};

export default HomePage;
/* <AnimeNews />
 */
