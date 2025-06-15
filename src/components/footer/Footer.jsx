import { Link } from "react-router-dom";
import "./footer.css";

const year = new Date().getFullYear();

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="top">
          <Link to={"/"} className="logo">
            AnimeDZ
          </Link>
          <div className="links">
            <Link to={`/home/TopAnime/${year}`} target="_blank">
              Top Anime
            </Link>
            <Link to={`/home/TopManga/${year}`} target="_blank">
              Top Manga
            </Link>
            <Link to={`/home/Airing%20Now/${year}`} target="_blank">
              Airing Anime
            </Link>
          </div>
        </div>
        <div className="bottom">
          <div className="terms">
            <span>Privacy Policy </span>
            <span className="border">Terms Of Use </span>
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
