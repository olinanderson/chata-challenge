import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Spinner from "./Spinner/Spinner";

const Drink = ({ drinkData, drinkDataLoaded }) => {
  if (!drinkDataLoaded) {
    return <Spinner />;
  }

  const listDrinkIngredients = () => {
    let drinkIngredients = [];
    if (drinkData !== null) {
      for (let i = 1; i < 16; i++) {
        let strIngredientKey = ("strIngredient" + i).toString();
        let strMeasureKey = ("strMeasure" + i).toString();
        if (
          drinkData[strIngredientKey] !== null &&
          drinkData[strMeasureKey] !== null &&
          drinkData[strIngredientKey] !== "" &&
          drinkData[strMeasureKey] !== ""
        ) {
          drinkIngredients.push(
            <div key={i}>
              <p>
                {drinkData[strMeasureKey]} {drinkData[strIngredientKey]}
              </p>
            </div>
          );
        } else if (
          drinkData[strIngredientKey] !== null &&
          drinkData[strIngredientKey] !== ""
        ) {
          drinkIngredients.push(
            <div key={i}>
              <p>{drinkData[strIngredientKey]}</p>
            </div>
          );
        }
      }
    }

    return drinkIngredients;
  };

  return (
    <Fragment>
      <div className="drink-recipe">
        <div className="left-column">
          <h2>Instructions:</h2>
          <p>{drinkData.strInstructions}</p>
        </div>
        <div className="right-column">
          <h2>Ingredients:</h2>
          {listDrinkIngredients()}
        </div>
      </div>
    </Fragment>
  );
};

Drink.propTypes = {
  drinkData: PropTypes.object,
  drinkDataLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  drinkData: state.drinks.drinkData,
  drinkDataLoaded: state.drinks.drinkDataLoaded,
});

export default connect(mapStateToProps, {})(Drink);
