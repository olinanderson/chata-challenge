import { combineReducers } from "redux";
import ingredients from "./ingredients";
import drinks from "./drinks";

export default combineReducers({
  ingredients,
  drinks,
});
