import style from "./Card.module.css";
import { Link } from "react-router-dom";
import { addFav, removeFav } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function Card({ props, onClose }) {
  const [isFav, setIsFav] = useState(false);

  const myFavorites = useSelector((state) => state.myFavorites);

  const dispatch = useDispatch();
 
  const closeHandle = () => {
    onClose(props.id);
  };

  const handleFavorite = () => {
    if (isFav) {
      setIsFav(false);
      dispatch(removeFav(props.id));
    } else {
      setIsFav(true);
      dispatch(addFav(props));
    }
  };

  useEffect(() => {
    myFavorites.forEach((fav) => {
       if (fav.id === props.id) {
          setIsFav(true);
       }
    });
 }, [myFavorites, props.id]);

  return (
    <div className={style.card}>
        {isFav ? (
          <button className={style.fav} onClick={handleFavorite}>❤️</button>
        ) : (
          <button className={style.fav} onClick={handleFavorite}>🤍</button>
        )}
        <img src={props.image} alt="" />
        <button className={style.delete} onClick={closeHandle}>X</button>
        <Link to={`/detail/${props.id}`} className={style.link}>
          <h2>{props.name}</h2>
        </Link>
    </div>
  );
}
