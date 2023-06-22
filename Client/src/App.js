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
  const [access, setAccess] = useState(() => {
    const storedAccess = localStorage.getItem("access");
    return storedAccess ? JSON.parse(storedAccess) : false;
  });
  const [characters, setCharacters] = useState(() => {
    const storedCharacters = localStorage.getItem("characters");
    return storedCharacters ? JSON.parse(storedCharacters) : [];
  });

  const login = async (userData) => {
    try {
      const { email, password } = userData;
      const { access } = (await axios(`${URL_BASE}/login/?email=${email}&password=${password}`)).data;
      if (access) {
        setAccess(true);
        localStorage.setItem("access", JSON.stringify(true));
        navigate("/home");
      }
    } catch (error) {
      window.alert("¡Email o Contraseña incorrectos!");
    }
  };

  const logout = () => {
    setCharacters([]);
    setAccess(false);
    localStorage.removeItem("access");
    localStorage.removeItem("characters");
    navigate("/");
  };

  useEffect(() => {
    localStorage.setItem("access", JSON.stringify(access));
  }, [access]);

  useEffect(() => {
    localStorage.setItem("characters", JSON.stringify(characters));
  }, [characters]);

  useEffect(() => {
    if (!access) {
      navigate("/");
    }
  }, [access, navigate]);
  

  const searchHandler = async (id) => {
    try {
      if (characters.some((character) => character.id === id)) {
        window.alert("¡Este personaje ya ha sido agregado!");
        return;
      } else {
        const data = (await axios(`${URL_BASE}/character/${id}`)).data;
        if (data.name) {
          setCharacters((oldChars) => [...oldChars, data]);
        }
      }
    } catch (error) {
      window.alert("¡No hay personajes con este ID!");
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
