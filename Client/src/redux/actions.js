import { URL_BASE } from "../utils/consts";
import axios from "axios";

export const ADD_FAV = "ADD_FAV";
export const REMOVE_FAV = "REMOVE_FAV";
export const GET_CHARACTER_DETAIL = "GET_CHARACTER_DETAIL";
export const CLEAN_DETAIL = "CLEAN_DETAL";
export const FILTER = "FILTER";
export const ORDER = "ORDER";

export const addFav = (character) => {
   return async (dispatch) => {
      try {
         const { data } = await axios.post(`${URL_BASE}/fav`, character);
         return dispatch({
            type: ADD_FAV,
            payload: data,
         });
      } catch (error) {
         console.error('Error en addFav:', error);
      }
   };
};

export const removeFav = (id) => {
   return async (dispatch) => {
      try{
         const { data } = await axios.delete(`${URL_BASE}/fav/${id}`);
         console.log("remove fav - data: ", data);
            return dispatch({
               type: REMOVE_FAV,
               payload: data,
         });
      } catch (error) {
         console.error('Error en removeFav:', error);
      }
   };
};

export const getCharacterDetail = (id) => {
  return function (dispatch) {
    fetch(`${URL_BASE}/character/${id}`)
      .then((response) => response.json())
      .then((data) => dispatch({ type: GET_CHARACTER_DETAIL, payload: data }));
  };
};

export const cleanDetail = () => {
  return { type: CLEAN_DETAIL };
};

export const filterCards = (gender) => {
  return { type: FILTER, payload: gender };
};

export const orderCards = (orden) => {
  return { type: ORDER, payload: orden };
};
