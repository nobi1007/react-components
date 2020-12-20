import React from "react";
import "./App.scss";
import FlexibleMenuBar from "./components/FlexibleMenuBar";
import FlexibleMenuBarDirectons from "./components/FlexibleMenuBarDirectons";

function App() {
  return (
    <div className="App">
      <FlexibleMenuBar eachItemWidth={40} eachItemPadding={4} />
      <FlexibleMenuBarDirectons />
    </div>
  );
}

export default App;
