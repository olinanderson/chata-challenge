import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import PropTypes from "prop-types";

import Spinner from "./Spinner/Spinner";
import ImageLoad from "./ImageLoad";

const Drinklist = ({ currentlySelected }) => {
  // Getting the drink index from the URL
  let drinkIndex = useParams().drinkIndex;

  var notReady =
    drinkIndex > currentlySelected.length - 1 || // if drinkindex hasn't updated in state yet
    !currentlySelected[drinkIndex].drinksLoaded; // if drinks aren't loaded

  const [drinksListArray, setDrinksListArray] = useState([]);

  useEffect(() => {
    if (!notReady)
      setDrinksListArray(
        currentlySelected[drinkIndex].drinks.map((element, index) => {
          return (
            <div className="drink-element" key={index}>
              <img src={element.strDrinkThumb} placeholder={element.strDrink} />

              <p>{element.strDrink}</p>
            </div>
          );
        })
      );
  }, [drinkIndex, currentlySelected]);

  if (notReady) {
    return <Spinner />;
  }

  return <Fragment>{drinksListArray}</Fragment>;
};

Drinklist.propTypes = {
  currentlySelected: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  currentlySelected: state.ingredients.currentlySelected,
});

export default connect(mapStateToProps, {})(Drinklist);
