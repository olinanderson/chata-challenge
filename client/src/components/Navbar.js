import React, { Fragment, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import PropTypes from "prop-types";

import { getCurrentlySelected } from "../actions/ingredients";

const Navbar = ({
  selectedArray,
  getCurrentlySelected,
  setLoading,
  currentlySelectedLoaded,
}) => {
  let activeStyle = {
    borderRight: "5px solid #348feb",
    backgroundColor: "#838383",
  };

  const ingredient = useLocation().pathname.slice(8);

  useEffect(() => {
    if (currentlySelectedLoaded) {
      setLoading(false);
    }
  }, [currentlySelectedLoaded, setLoading]);

  const handleOnClick = (e) => {
    if (ingredient !== e.target.innerText.replace(/ /g, "_")) {
      setLoading(true);
      getCurrentlySelected(e.target.innerText);
    }
  };

  let navbarList = selectedArray.map((element, index) => {
    return (
      <div className="navbar-element" key={index}>
        <NavLink
          onClick={handleOnClick}
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
            Ingredient Selector
          </NavLink>
          {/* <div className="navbar-selected"></div> */}
        </div>
        {navbarList}
      </div>
    </Fragment>
  );
};

Navbar.propTypes = {
  selectedArray: PropTypes.array.isRequired,
  getCurrentlySelected: PropTypes.func.isRequired,
  currentlySelectedLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  currentlySelectedLoaded: state.ingredients.currentlySelectedLoaded,
});

export default connect(mapStateToProps, { getCurrentlySelected })(Navbar);
