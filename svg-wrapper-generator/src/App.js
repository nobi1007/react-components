import React, { PureComponent } from "react";

import SVGWrapper from "./components/SVGWrapper";

import "./App.scss";
import svg from "./sampleSvg.svg";

class App extends PureComponent {
  render() {
    return (
      <div className="App" autoSave={"true"}>
        <header
          className="App-header"
          style={{
            backgroundColor: "#181818",
            border: "solid 1px",
            borderRadius: "30px",
            overflowY: "hidden",
          }}
        >
          <div style={{ height: "20%", width: "20%" }} className="wrapper-div">
            <SVGWrapper
              svgFile={svg}
              className="App-logo"
              style={{
                backgroundColor: "red",
                border: "solid 1px",
                borderRadius: "10px",
              }}
            />
          </div>

          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
