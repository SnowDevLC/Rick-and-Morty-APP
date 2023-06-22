import styles from "./Favorites.module.css";
import { Cards } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { filterCards, orderCards } from "../../redux/actions";
import { useState } from "react";

export default function Favorites({ onClose }) {
  const [aux, setAux] = useState(false);

  const dispatch = useDispatch();

  const myFavorites = useSelector((state) => state.myFavorites);

  const handleOrder = (e) => {
    dispatch(orderCards(e.target.value));
    setAux(true);
  };

  const handleFilter = (e) => {
    dispatch(filterCards(e.target.value));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Favorites</h1>
      <div className={styles.content}>
        <aside className={styles.filters}>
          <select onChange={handleOrder}>
            <option value="A">Ascendente</option>
            <option value="D">Descendente</option>
          </select>
          <select onChange={handleFilter}>
            <option value="All">All Characters</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Genderless">Genderless</option>
            <option value="unknown">unknown</option>
          </select>
        </aside>
        <div className={styles.cards}>
          <Cards characters={myFavorites} onClose={onClose} />
        </div>
      </div>
    </div>
  );
}
