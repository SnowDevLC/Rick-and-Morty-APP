import useCharacter from "../../hooks/useCharacter";
import style from "./Detail.module.css";

export default function Detail() {
  const character = useCharacter();

  return (
    <div className={`${style.container} ${style.spinIn}`}>
      {character.name ? (
        <>
          <div className={style.text}>
            <h1>{character.name}</h1>
            <h2>STATUS ⇒ {character.status}</h2>
            <h2>SPECIE ⇒ {character.species}</h2>
            <h2>GENDER ⇒ {character.gender}</h2>
            <h2>ORIGIN ⇒ {character.origin.name}</h2>
          </div>
          <div className={style.image}>
            <img src={character.image} alt="" />
          </div>
        </>
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
}
