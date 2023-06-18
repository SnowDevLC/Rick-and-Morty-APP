import { Nav, Cards } from "./components";
import { About, Detail, Favorites, Error, Form } from "./views";
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeFav } from "./redux/actions.js";
import { URL_BASE } from "./utils/consts";
import axios from "axios";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [access, setAccess] = useState(false);
  const [characters, setCharacters] = useState([]);

  const login = (userData) => {
    const { email, password } = userData;
    axios(`${URL_BASE}/login/?email=${email}&password=${password}`).then(({ data }) => {
      const { access } = data;
      setAccess(access);
      access && navigate("/home");
    });
  };

  const logout = () => {
    setCharacters([]);
    setAccess(false);
  };

  useEffect(() => {
    !access && navigate("/");
  }, [access, navigate]);

  const searchHandler = (id) => {
    if (characters.some((character) => character.id === id)) {
      window.alert("¡Este personaje ya ha sido agregado!");
      return;
    } else {
      fetch(`${URL_BASE}/character/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
          } else {
            window.alert("¡No hay personajes con este ID!");
          }
        });
    }
  };

  const closeHandler = (id) => {
    setCharacters((oldChars) =>
      oldChars.filter((character) => character.id !== id)
    );
    dispatch(removeFav(id));
  };

  return (
    <div className="App">
      {location.pathname !== "/" && (
        <Nav onSearch={searchHandler} onLogout={logout} />
      )}
      <Routes>
        <Route path="/" element={<Form onLogin={login} />} />
        <Route
          path="/home"
          element={<Cards characters={characters} onClose={closeHandler} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route
          path="/favorites"
          element={<Favorites onClose={closeHandler} />}
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
