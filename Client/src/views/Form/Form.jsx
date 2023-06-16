import style from "./Form.module.css";
import React from "react";
import validar from "../../utils/validacion/validation.js";

export default function Form({onLogin}) {
  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = React.useState({
    email: "",
    password: "",
  });

  const [send, setSend] = React.useState(false);
  React.useEffect(() => {
    let value = (Object.keys(errors).length) === 0;
    setSend(value);
  }, [errors] );

  function handleChange(event) {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });

    setErrors(
      validar({
        ...userData,
        [event.target.name]: event.target.value,
      })
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(Object.keys(errors).length === 0){
      onLogin(userData);
      setErrors({});
    }
  };

  return (
    <form className={style.container} onSubmit={handleSubmit}>
      <label>EMAIL</label>
      <input
        className={errors.email && style.warning}
        type="text"
        placeholder="Ingresa tu correo"
        value={userData.email}
        name="email"
        onChange={handleChange}
      />
      {errors.email && <p className={style.danger}>{errors.email}</p>}
      <label>PASSWORD</label>
      <input
        className={errors.password && style.warning}
        type="password"
        placeholder="Ingresa tu password"
        value={userData.password}
        name="password"
        onChange={handleChange}
      />
      {errors.password && <p className={style.danger}>{errors.password}</p>}
      <button disabled={!send} type="submit">
        Submit
      </button>
    </form>
  );
}
