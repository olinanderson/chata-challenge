import React, { Fragment, useState, useEffect } from "react";

import { connect } from "react-redux";

import PropTypes from "prop-types";

import Spinner from "./Spinner/Spinner";
import { getCurrentlySelected } from "../actions/ingredients";

const Select = ({
  getCurrentlySelected,
  currentlySelected,
  alcoholicIngredients,
  alcoholicIngredientsLoaded,
}) => {
  if (!alcoholicIngredientsLoaded) {
    return (
      <Fragment>
        <Spinner />;
      </Fragment>
    );
  }

  alcoholicIngredients.sort();

  const handleOnClick = (e) => {
    if (currentlySelected.length >= 5) {
      let alreadyActive = false;
      for (let i = 0; i < currentlySelected.length; i++) {
        if (currentlySelected[i].strIngredient === e.target.innerText) {
          alreadyActive = true;
        }
      }

      if (alreadyActive) {
        let newCurrentlySelected;
        if (currentlySelected.length !== 5) {
          newCurrentlySelected = currentlySelected.filter(
            (value, index, arr) => {
              return value.strIngredient !== e.target.innerText;
            }
          );
        } else {
          newCurrentlySelected = currentlySelected;
        }
        getCurrentlySelected([...newCurrentlySelected]);
      } else {
        getCurrentlySelected([
          ...currentlySelected,
          {
            strIngredient: e.target.innerText,
            drinksLoaded: false,
          },
        ]);
      }
    }
  };

  const list = alcoholicIngredients.map((element, index) => {
    // Checking if it is currently selected
    for (let i = 0; i < currentlySelected.length; i++) {
      if (currentlySelected[i].strIngredient === element) {
        return (
          <button
            className="active"
            key={index}
            onClick={(e) => handleOnClick(e)}
          >
            {element}
          </button>
        );
      }
    }

    return (
      <button key={index} onClick={(e) => handleOnClick(e)}>
        {element}
      </button>
    );
  });

  return (
    <Fragment>
      <div className="main-content">
        <p className="title">
          Choose 5 or more different alcohol ingredients (eg. rum, vodka, gin,
          etc.)
        </p>
        {list}
      </div>
    </Fragment>
  );
};

Select.propTypes = {
  getCurrentlySelected: PropTypes.func.isRequired,
  currentlySelected: PropTypes.array.isRequired,
  alcoholicIngredients: PropTypes.array.isRequired,
  alcoholicIngredientsLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  currentlySelected: state.ingredients.currentlySelected,
  alcoholicIngredientsLoaded: state.ingredients.alcoholicIngredientsLoaded,
  alcoholicIngredients: state.ingredients.alcoholicIngredients,
});

export default connect(mapStateToProps, { getCurrentlySelected })(Select);
