import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

// Redux
import { Provider } from "react-redux";
import store from "./store";

// Components
import Select from "./components/Select";
import Navbar from "./components/Navbar";

import { initialRequests } from "./actions/initial";

function App() {
  useEffect(() => {
    store.dispatch(initialRequests());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Select />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
