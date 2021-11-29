import React, { Fragment } from "react";

import { connect } from "react-redux";

import PropTypes from "prop-types";

import Spinner from "./Spinner/Spinner";

const Select = ({
  alcoholicIngredients,
  alcoholicIngredientsLoaded,
  selectedArray,
  setSelectedArray,
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
    if (selectedArray.length >= 5) {
      let alreadyActive = false;
      for (let i = 0; i < selectedArray.length; i++) {
        if (selectedArray[i].strIngredient === e.target.innerText) {
          alreadyActive = true;
        }
      }

      if (alreadyActive) {
        let newCurrentlySelected;
        if (selectedArray.length !== 5) {
          newCurrentlySelected = selectedArray.filter((value, index, arr) => {
            return value.strIngredient !== e.target.innerText;
          });
        } else {
          newCurrentlySelected = selectedArray;
        }
        setSelectedArray([...newCurrentlySelected]);
      } else {
        setSelectedArray([
          ...selectedArray,
          {
            strIngredient: e.target.innerText,
            drinksLoaded: false,
          },
        ]);
      }
    }
  };

  const createList = (startIndex, endIndex) => {
    return alcoholicIngredients
      .slice(startIndex, endIndex)
      .map((element, index) => {
        // Checking if it is currently selected
        for (let i = 0; i < selectedArray.length; i++) {
          if (selectedArray[i].strIngredient === element) {
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
  };

  var firstList = createList(0, 16);
  var secondList = createList(16, 32);
  var thirdList = createList(32, 48);

  return (
    <Fragment>
      <p className="title">
        Choose 5 or more different alcohol ingredients (eg. rum, vodka, gin,
        etc.)
      </p>
      <div className="container">
        <div className="button-column">
          <p>A-C</p>
          {firstList}
        </div>
        <div className="button-column">
          <p>C-P</p>
          {secondList}
        </div>
        <div className="button-column">
          <p>P-Z</p>

          {thirdList}
        </div>
      </div>
    </Fragment>
  );
};

Select.propTypes = {
  alcoholicIngredients: PropTypes.array.isRequired,
  alcoholicIngredientsLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  alcoholicIngredientsLoaded: state.ingredients.alcoholicIngredientsLoaded,
  alcoholicIngredients: state.ingredients.alcoholicIngredients,
});

export default connect(mapStateToProps, {})(Select);
