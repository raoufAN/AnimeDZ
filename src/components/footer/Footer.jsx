import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="top">
          <h2 className="logo">AnimeDZ</h2>
          <div className="links">
            <span>Top Anime</span>
            <span>Top Manga</span>
            <span>Airing Anime</span>
          </div>
        </div>
        <div className="bottom">
          <div className="terms">
            <span>Privacy Policy </span>
            <span className="bodrer">Terms Of Use </span>
            <span>Sitemap</span>
          </div>
          <h5>Copyright 2025 Anime Dz. All rights reserved</h5>
        </div>
      </div>
      <div className="overlay"></div>
    </div>
  );
};

export default Footer;
