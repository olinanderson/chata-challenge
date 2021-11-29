import React, { Fragment, useState } from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";

import Drink from "./Drink";
import Spinner from "./Spinner/Spinner";

import { getDrinkData } from "../actions/drinks";

const Drinklist = ({
  currentlySelected,
  currentlySelectedLoaded,
  loading,
  getDrinkData,
}) => {
  const [showDrinkId, setShowDrinkId] = useState(0);
  const [drinkLoading, setDrinkLoading] = useState(false);

  // Getting the drink index from the URL
  if (loading) {
    return <Spinner />;
  }

  if (currentlySelected === null && currentlySelectedLoaded) {
    return <h1>Sorry, there was an error. :(</h1>;
  }

  const handleOnClick = (e) => {
    if (e.currentTarget.id !== showDrinkId) {
      setDrinkLoading(true);
      setShowDrinkId(e.currentTarget.id);
      getDrinkData(e.currentTarget.id);
    }
  };

  const checkShowDrink = (id) => {
    if (id === showDrinkId) {
      return <Drink drinkLoading={drinkLoading} />;
    }
  };

  let drinksListArray = currentlySelected.drinks.map((element, index) => {
    return (
      <div
        className={`drink-element ${
          element.idDrink === showDrinkId ? "active" : ""
        }`}
        id={element.idDrink}
        onClick={(e) => handleOnClick(e)}
        key={index}
      >
        <div className="top-card-drink">
          <img
            src={element.strDrinkThumb}
            placeholder={element.strDrink}
            alt={element.strDrink}
          />
          <h2>{element.strDrink}</h2>
        </div>
        {checkShowDrink(element.idDrink)}
      </div>
    );
  });

  return (
    <Fragment>
      <p className="title">
        The following list contains cocktails that are made with{" "}
        {currentlySelected.ingredient.toLowerCase()}.
      </p>
      {drinksListArray}
    </Fragment>
  );
};

Drinklist.propTypes = {
  loading: PropTypes.bool.isRequired,
  currentlySelected: PropTypes.object,
  currentlySelectedLoaded: PropTypes.bool.isRequired,
  getDrinkData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentlySelected: state.ingredients.currentlySelected,
  currentlySelectedLoaded: state.ingredients.currentlySelectedLoaded,
});

export default connect(mapStateToProps, { getDrinkData })(Drinklist);
