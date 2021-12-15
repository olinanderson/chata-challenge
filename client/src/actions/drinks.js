import axios from "axios";

import {
  GET_DRINK_DATA,
  GET_DRINK_DATA_FAIL,
  GET_DRINK_DATA_RESET,
} from "./types";

export const getDrinkData = (idDrink) => async (dispatch) => {
  try {
    dispatch({ type: GET_DRINK_DATA_RESET });

    let res = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`
    );

    dispatch({
      payload: res.data.drinks[0],
      type: GET_DRINK_DATA,
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: GET_DRINK_DATA_FAIL,
    });
  }
};
