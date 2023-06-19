import styles from "./About.module.css";
import htmlImg from "../../assets/forAbout/html.png";
import cssImg from "../../assets/forAbout/css.svg";
import javascriptImg from "../../assets/forAbout/javascript.png";
import reactImg from "../../assets/forAbout/react.png";
import redux from "../../assets/forAbout/redux.png";

export default function About() {
  const techSkills = [
    { tech: "Html", image: htmlImg },
    { tech: "Css", image: cssImg },
    { tech: "JavaScript", image: javascriptImg },
    { tech: "React", image: reactImg },
    { tech: "Redux", image: redux },
  ];

  return (
    <div className={styles.divBienvenido}>
      <h1 className={styles.title}>
        About!
      </h1>
      <h3 className={styles.subtitle}>Luis Canales</h3>
      <ul className={styles.unorderedList}>
        {techSkills.map((skill) => (
          <li className={styles.listItem} key={skill}>
            {skill.tech}
            <img src={skill.image} alt={skill.tech} />
          </li>
        ))}
      </ul>
    </div>
  );
}
