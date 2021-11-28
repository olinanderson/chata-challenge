import React, { Fragment, useState, useEffect } from "react";

import { connect } from "react-redux";

import PropTypes from "prop-types";

import Spinner from "./Spinner/Spinner";
import { getCurrentlySelected } from "../actions/ingredients";

const Select = ({
  getCurrentlySelected,
  alcoholicIngredients,
  alcoholicIngredientsLoaded,
  currentlySelectedResponsive,
  setCurrentlySelectedResponsive,
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
    if (currentlySelectedResponsive.length >= 5) {
      let alreadyActive = false;
      for (let i = 0; i < currentlySelectedResponsive.length; i++) {
        if (
          currentlySelectedResponsive[i].strIngredient === e.target.innerText
        ) {
          alreadyActive = true;
        }
      }

      if (alreadyActive) {
        let newCurrentlySelected;
        if (currentlySelectedResponsive.length !== 5) {
          newCurrentlySelected = currentlySelectedResponsive.filter(
            (value, index, arr) => {
              return value.strIngredient !== e.target.innerText;
            }
          );
        } else {
          newCurrentlySelected = currentlySelectedResponsive;
        }
        getCurrentlySelected([...newCurrentlySelected]);
        setCurrentlySelectedResponsive([...newCurrentlySelected]);
      } else {
        getCurrentlySelected([
          ...currentlySelectedResponsive,
          {
            strIngredient: e.target.innerText,
            drinksLoaded: false,
          },
        ]);
        setCurrentlySelectedResponsive([
          ...currentlySelectedResponsive,
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
    for (let i = 0; i < currentlySelectedResponsive.length; i++) {
      if (currentlySelectedResponsive[i].strIngredient === element) {
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
      <p className="title">
        Choose 5 or more different alcohol ingredients (eg. rum, vodka, gin,
        etc.)
      </p>
      {list}
    </Fragment>
  );
};

Select.propTypes = {
  getCurrentlySelected: PropTypes.func.isRequired,
  alcoholicIngredients: PropTypes.array.isRequired,
  alcoholicIngredientsLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  alcoholicIngredientsLoaded: state.ingredients.alcoholicIngredientsLoaded,
  alcoholicIngredients: state.ingredients.alcoholicIngredients,
});

export default connect(mapStateToProps, { getCurrentlySelected })(Select);
