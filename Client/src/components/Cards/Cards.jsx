import Card from '../Card/Card';
import style from './Cards.module.css'

export default function Cards({characters, onClose}) {

   return (
      <div className={style.container}>
        {characters?.map((personaje) => (
          <Card className={style.card} key={personaje.id} props={personaje} onClose={onClose} />
        ))}
      </div>
    );
}