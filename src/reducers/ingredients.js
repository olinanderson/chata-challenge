import {
  GET_ALCOHOLIC_INGREDIENTS,
  GET_ALCOHOLIC_INGREDIENTS_FAIL,
  GET_CURRENTLY_SELECTED,
  GET_CURRENTLY_SELECTED_FAIL,
} from "../actions/types";

const initialState = {
  alcoholicIngredientsLoaded: false,
  alcoholicIngredients: [],
  currentlySelected: [
    { strIngredient: "Rum", drinksLoaded: false },
    { strIngredient: "Vodka", drinksLoaded: false },
    { strIngredient: "Tequila", drinksLoaded: false },
    { strIngredient: "Gin", drinksLoaded: false },
    { strIngredient: "Whiskey", drinksLoaded: false },
  ],
};

export default function ingredients(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALCOHOLIC_INGREDIENTS:
      return {
        ...state,
        alcoholicIngredients: payload,
        alcoholicIngredientsLoaded: true,
      };
    case GET_ALCOHOLIC_INGREDIENTS_FAIL:
      return {
        ...state,
        alcoholicIngredientsLoaded: false,
      };
    case GET_CURRENTLY_SELECTED:
      return {
        ...state,
        currentlySelected: payload,
      };
    case GET_CURRENTLY_SELECTED_FAIL:
      return {
        ...state,
        currentlySelected: initialState.currentlySelected,
      };
    default:
      return state;
  }
}
