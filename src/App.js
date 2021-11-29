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

function App() {
  useEffect(() => {
    store.dispatch(initialRequests());
  }, []);

  // State
  const [selectedArray, setSelectedArray] = useState([
    { strIngredient: "Rum", drinksLoaded: false },
    { strIngredient: "Vodka", drinksLoaded: false },
    { strIngredient: "Tequila", drinksLoaded: false },
    { strIngredient: "Gin", drinksLoaded: false },
    { strIngredient: "Whiskey", drinksLoaded: false },
  ]);

  const [loading, setLoading] = useState(true);

  return (
    <Provider store={store}>
      <Router>
        <Navbar
          selectedArray={selectedArray}
          loading={loading}
          setLoading={setLoading}
        />
        <div className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={
                <Select
                  selectedArray={selectedArray}
                  setSelectedArray={setSelectedArray}
                />
              }
            />
            <Route
              path="/drinks/:ingredient"
              element={<Drinklist loading={loading} setLoading={setLoading} />}
            />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
