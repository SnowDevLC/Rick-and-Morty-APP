import SearchBar from "../SearchBar/SearchBar.jsx";
import style from "./Nav.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import imageLogo from "../../assets/logo.png";

export default function Nav({ onSearch, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  const addR = () => {
    onSearch(Math.floor(Math.random() * (826 - 1 + 1) + 1));
  };

  return (
    <div className={style.container}>
      <div className={style.buttonsNav}>
        <button className={style.random} onClick={handleLogout}>
          LOG OUT
        </button>
        <Link to="/about">
          <button className={style.random}>ABOUT</button>
        </Link>
        <Link to="/home">
          <button className={style.random}>HOME</button>
        </Link>
        <Link to="/favorites">
          <button className={style.random}>FAVORITES</button>
        </Link>
      </div>
      <div className={style.image}>
        <img src={imageLogo} alt="logo" />
      </div>
      {location.pathname === "/home" && (
        <div className={style.add}>
          <SearchBar onSearch={onSearch} />
          <button className={style.random} onClick={addR}>
            ADD RANDOM
          </button>
        </div> 
      )}
    </div>
  );
}
