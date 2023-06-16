import SearchBar from "../SearchBar/SearchBar.jsx";
import style from "./Nav.module.css";
import {Link} from "react-router-dom";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Nav({onSearch, onLogout}) {
  
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  const addR = () => {
    onSearch(Math.floor(Math.random() * (826 - 1 + 1) + 1));
  };

  return (
    <div className={style.container}>
      <SearchBar onSearch={onSearch} />
      <button className={style.random} onClick={addR}>Add Random</button>
      <Link to="/about">
        <button className={style.random}>ABOUT</button>
      </Link>
      <Link to="/favorites">
        <button className={style.random}>FAVORITES</button>
      </Link>
      <Link to="/home">
        <button className={style.random}>HOME</button>
      </Link>
        <button className={style.random} onClick={handleLogout}>LOG OUT</button>
    </div>
  );
}
