import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import PropTypes from "prop-types";

const Navbar = ({ currentlySelected }) => {
  let activeStyle = {
    "border-right": "5px solid #348feb",
  };

  let navbarList = currentlySelected.map((element, index) => {
    return (
      <div className="navbar-element" key={index}>
        <NavLink
          // to={element.strIngredient}
          to={"drinks/" + element.strIngredient.replace(/ /g, "_")}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          {element.strIngredient}
        </NavLink>
        {/* <div className="navbar-selected"></div> */}
      </div>
    );
  });

  return (
    <Fragment>
      <div className="navbar">
        <div className="navbar-element">
          <NavLink
            to=""
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Select Alcohol Ingredients
          </NavLink>
          {/* <div className="navbar-selected"></div> */}
        </div>
        {navbarList}
      </div>
    </Fragment>
  );
};

Navbar.propTypes = {
  currentlySelected: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  currentlySelected: state.ingredients.currentlySelected,
});

export default connect(mapStateToProps, {})(Navbar);
