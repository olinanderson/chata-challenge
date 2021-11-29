import { getAlcoholicIngredients } from "./ingredients";

export const initialRequests = () => (dispatch) => {
  dispatch(getAlcoholicIngredients());
};
