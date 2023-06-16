
const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const validar = (userData) => {
  let errors = {};

  if (!regexEmail.test(userData.email)) {
    errors.email = "Email invalido";
  }
  if (!userData.email) {
    errors.email = "Email requerido";
  }
  if (userData.email.length > 35) {
    errors.email = "No puede tener mas de 35 caracteres";
  }

  if (!/\d/.test(userData.password)) {
    errors.password = "Al menos un numero";
  }
  if (userData.password.length < 6 || userData.password.length > 10) {
    errors.password = "Entre 6 y 10 caracteres";
  }
  
  return errors;
};

export default validar;
