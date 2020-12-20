import React from "react";
import "./App.scss";
import FlexibleMenuBar from "./components/FlexibleMenuBar";

function App() {
  return (
    <div className="App">
      <FlexibleMenuBar eachItemWidth={40} eachItemPadding={4} />
    </div>
  );
}

export default App;
