import { useState } from "react";
import Search from "../search/Search";
import "./header.css";
import Favorite from "../favorite/Favorite";

const Header = () => {
  const [showFav, setShowFav] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  return (
    <div className="header">
      <div className="container header-container">
        <h2 className="logo">AnimeDZ</h2>
        <div className="right-header">
          <Search
            setIsSearching={setIsSearching}
            isSearching={isSearching}
            setShowFav={setShowFav}
          />
          <div
            className="favorirte-wrapper"
            onClick={() => {
              setShowFav(!showFav);
              setIsSearching(false);
            }}>
            <i className="fa-solid fa-bookmark favorite"></i>
            {showFav && <Favorite />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
