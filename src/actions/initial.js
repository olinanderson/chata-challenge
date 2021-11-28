import { getAlcoholicIngredients, getCurrentlySelected } from "./ingredients";

export const initialRequests = () => (dispatch) => {
  dispatch(getAlcoholicIngredients());
  dispatch(
    getCurrentlySelected([
      { strIngredient: "Rum", drinksLoaded: false },
      { strIngredient: "Vodka", drinksLoaded: false },
      { strIngredient: "Tequila", drinksLoaded: false },
      { strIngredient: "Gin", drinksLoaded: false },
      { strIngredient: "Whiskey", drinksLoaded: false },
    ])
  );
};
