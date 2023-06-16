import { ADD_FAV, REMOVE_FAV, GET_CHARACTER_DETAIL, CLEAN_DETAIL, FILTER, ORDER } from "./actions";

const initialState = {
  myFavorites: [],
  allCharacters: [],
  characterDetail: {}
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAV:
      return {
        ...state,
        myFavorites: [...state.myFavorites, action.payload],
        allCharacters: [...state.allCharacters, action.payload],
      };
    case REMOVE_FAV:
      return {
        ...state,
        myFavorites: state.myFavorites.filter((character) => character.id !== parseInt(action.payload)),
        allCharacters: state.allCharacters.filter((character) => character.id !== parseInt(action.payload))
      };
    case GET_CHARACTER_DETAIL:
      return {
        ...state,
        characterDetail: action.payload
      };
    case CLEAN_DETAIL:
      return {
        ...state,
        characterDetail: {}
      };
    case FILTER:
      if (action.payload === "All") {
        return { ...state, myFavorites: state.allCharacters };
      } else {
        return {
          ...state,
          myFavorites: state.allCharacters.filter(
            (character) => character.gender === action.payload
          ),
        };
      }
    case ORDER:
      let orderedCharacters = [...state.myFavorites];
      if (action.payload === "A") {
        orderedCharacters.sort((a, b) => a.id - b.id); // Orden ascendente por id
      } else if (action.payload === "D") {
        orderedCharacters.sort((a, b) => b.id - a.id); // Orden descendente por id
      }
      return {
        ...state,
        myFavorites: orderedCharacters,
      };
    default:
      return state;
  }
};

export default rootReducer;
