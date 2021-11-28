import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

// Redux
import { Provider } from "react-redux";
import store from "./store";

// Components
import Select from "./components/Select";
import Navbar from "./components/Navbar";
import Drinklist from "./components/Drinklist";

import { initialRequests } from "./actions/initial";
import ingredients from "./reducers/ingredients";

function App() {
  useEffect(() => {
    store.dispatch(initialRequests());
  }, []);

  // Setting a more responsive current items
  const [currentlySelectedResponsive, setCurrentlySelectedResponsive] =
    useState(store.getState(ingredients).ingredients.currentlySelected);

  return (
    <Provider store={store}>
      <Router>
        <Navbar currentlySelectedResponsive={currentlySelectedResponsive} />
        <div className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={
                <Select
                  currentlySelectedResponsive={currentlySelectedResponsive}
                  setCurrentlySelectedResponsive={
                    setCurrentlySelectedResponsive
                  }
                />
              }
            />
            <Route path="/drinks/:drinkIndex" element={<Drinklist />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
