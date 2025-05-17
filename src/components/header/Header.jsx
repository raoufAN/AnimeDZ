import Search from "../search/Search";
import "./header.css";
import React from "react";

const Header = () => {
  return (
    <div className="header">
      <div className="container header-container">
        <h2 className="logo">AnimeDZ</h2>
        <div className="right-header">
          <Search />
          <i className="fa-solid fa-bookmark favorite"></i>
        </div>
      </div>
    </div>
  );
};

export default Header;
