import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ currentlySelectedResponsive }) => {
  let activeStyle = {
    borderRight: "5px solid #348feb",
  };

  let navbarList = currentlySelectedResponsive.map((element, index) => {
    return (
      <div className="navbar-element" key={index}>
        <NavLink
          // to={element.strIngredient}
          to={"drinks/" + index}
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

export default Navbar;
