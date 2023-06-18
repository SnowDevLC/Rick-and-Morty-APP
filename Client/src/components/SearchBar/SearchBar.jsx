import style from "./SearchBar.module.css";
import {useState} from "react";

export default function SearchBar({ onSearch }) {
  const [id, setId] = useState("");

  const handleChange = (event) => {
    setId(event.target.value);
  };

  const addHandle = () => {
    onSearch(parseInt(id));
    setId("");
  };

  return (
    <div className={style.container}>
      <input 
        type="search" 
        value={id} 
        onChange={handleChange} 
        placeholder="Search Character by ID"  
      />
      <button onClick={addHandle}>ADD</button>
    </div>
  );
}
