import {
  GET_ALCOHOLIC_INGREDIENTS,
  GET_ALCOHOLIC_INGREDIENTS_FAIL,
  GET_CURRENTLY_SELECTED,
  GET_CURRENTLY_SELECTED_FAIL,
  RESET_CURRENTLY_SELECTED,
} from "../actions/types";

const initialState = {
  alcoholicIngredientsLoaded: false,
  alcoholicIngredients: [],
  currentlySelected: null,
  currentlySelectedLoaded: false,
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
        currentlySelectedLoaded: true,
      };
    case GET_CURRENTLY_SELECTED_FAIL:
      return {
        ...state,
        currentlySelected: initialState.currentlySelected,
        currentlySelectedLoaded: true,
      };
    case RESET_CURRENTLY_SELECTED:
      return {
        ...state,
        currentlySelected: initialState.currentlySelected,
        currentlySelectedLoaded: false,
      };
    default:
      return state;
  }
}
