import axios from "axios";
import { alcoholicIngredients } from "../assets/alcoholicIngredients";

import {
  GET_ALCOHOLIC_INGREDIENTS,
  GET_ALCOHOLIC_INGREDIENTS_FAIL,
  GET_CURRENTLY_SELECTED,
  GET_CURRENTLY_SELECTED_FAIL,
} from "./types";

export const getAlcoholicIngredients = () => async (dispatch) => {
  try {
    let payload = alcoholicIngredients;

    // The following code is used to get an initial list of
    // ingredients and filter out the alcoholic ones. I only
    //  ran it once initially to get the array of alcoholic
    // ingredients, since 100 get requests takes a long time
    //  every single render...

    // let res = await axios.get(
    //   "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list"
    // );

    // let payload = [];

    // if (res.data.drinks) {
    //   for (let i = 0; i < res.data.drinks.length; i++) {
    //     let currentIngredient =
    //       await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${res.data.drinks[i].strIngredient1}
    //             `);

    //     if (currentIngredient.data.ingredients[0].strAlcohol === "Yes") {
    //       payload.push(currentIngredient.data.ingredients[0].strIngredient);
    //     }
    //   }
    // }

    // console.log(payload);

    dispatch({ payload: payload, type: GET_ALCOHOLIC_INGREDIENTS });
  } catch (error) {
    console.log(error);

    dispatch({
      type: GET_ALCOHOLIC_INGREDIENTS_FAIL,
    });
  }
};

export const getCurrentlySelected = (currentlySelected) => async (dispatch) => {
  try {
    let payload = currentlySelected;

    for (let i = 0; i < currentlySelected.length; i++) {
      if (!currentlySelected[i].drinksLoaded) {
        let res = await axios.get(
          `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${currentlySelected[i].strIngredient}`
        );
        payload[i] = {
          ...currentlySelected[i],
          drinksLoaded: true,
          drinks: res.data.drinks,
        };
      }
    }
    dispatch({
      payload: payload,
      type: GET_CURRENTLY_SELECTED,
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: GET_CURRENTLY_SELECTED_FAIL,
    });
  }
};
