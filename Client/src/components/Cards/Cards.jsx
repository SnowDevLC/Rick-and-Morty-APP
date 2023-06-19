import Card from '../Card/Card';
import style from './Cards.module.css'
import React, { useEffect, useRef } from "react";

export default function Cards({characters, onClose}) {

  const trackerRef = useRef(null);
  const trackerSize = useRef(0);
  const trackerX = useRef(0);
  const trackerY = useRef(0);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const speed = 0.05;
  let isVisible = useRef(false);

  useEffect(() => {
    const tracker = trackerRef.current;
    trackerSize.current = tracker.offsetWidth;

    const handleMouseMove = (e) => {
      if (!isVisible.current) {
        isVisible.current = true;
        tracker.style.opacity = 1;
        updatePosition();
      }
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    const updatePosition = () => {
      const distanceX = mouseX.current - (trackerX.current + trackerSize.current / 2);
      const distanceY = mouseY.current - (trackerY.current + trackerSize.current / 2);

      trackerX.current += (distanceX * speed) + (-5);
      trackerY.current += (distanceY * speed) + 3;

      tracker.style.transform = `translate(${trackerX.current}px, ${trackerY.current}px)`;

      requestAnimationFrame(updatePosition);
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

   return (
      <div className={style.container}>
        <div className={style.nave} ref={trackerRef}></div>
        {characters?.map((personaje) => (
          <Card className={style.card} key={personaje.id} props={personaje} onClose={onClose} />
        ))}
      </div>
    );
}