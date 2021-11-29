import {
  GET_DRINK_DATA,
  GET_DRINK_DATA_FAIL,
  GET_DRINK_DATA_RESET,
} from "../actions/types";

const initialState = { drinkData: null, drinkDataLoaded: false };

export default function drinks(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_DRINK_DATA:
      return {
        ...state,
        drinkData: payload,
        drinkDataLoaded: true,
      };
    case GET_DRINK_DATA_FAIL:
      return {
        ...state,
        drinkData: null,
        drinkDataLoaded: true,
      };
    case GET_DRINK_DATA_RESET:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}
