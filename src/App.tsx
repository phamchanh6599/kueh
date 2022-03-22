import "./App.scss";
import React from "react";

import Home from "./pages/Home";
import { HomeProvider } from "./context/HomeContext";

function App() {
  return (
    <HomeProvider>
      <div className="App">
        <Home />
      </div>
    </HomeProvider>
  );
}

export default App;
