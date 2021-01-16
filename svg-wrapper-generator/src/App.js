import React, { PureComponent } from "react";

import "./App.scss";

import { removeNewlineCharacters, getWrapperComponent } from "./utils/utility";
import { attributeNameMapping } from "./utils/exportSvgElements";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fileData: "",
      wrapperCompObject: {},
      domObject: {},
      RootComponent: <></>,
    };
    // for providing unique key to each element
    this.randomKey = -1;
  }

  computeSubTrees = (rootNode) => {
    const nodeName = rootNode.nodeName;
    const attributes = rootNode.attributes;
    let attributeNames = Object.keys(attributes);
    let actualAttributes = {};
    attributeNames.forEach((eachAttributeName, inx) => {
      actualAttributes[
        attributeNameMapping[attributes[eachAttributeName].nodeName]
      ] = attributes[eachAttributeName].value;
    });
    let actualChildNodes = [];

    rootNode.childNodes.forEach((eachChild) => {
      // for ignoring dom objects been created beacuse of space or newline characters
      if (eachChild.nodeName !== "#text") {
        actualChildNodes.push(eachChild);
      }
    });
    this.randomKey += 1;
    let nodeObject = {
      key: this.randomKey,
      nodeName: nodeName,
      attributes: actualAttributes,
      childNodes: [],
    };
    if (actualChildNodes.length === 0) {
      return nodeObject;
    } else {
      actualChildNodes.forEach((eachChild, inx) => {
        const currentChildNode = { ...this.computeSubTrees(eachChild) };
        actualChildNodes[inx] = { ...currentChildNode };
      });
      nodeObject.childNodes = [...actualChildNodes];

      return nodeObject;
    }
  };

  performConversion() {
    const { wrapperCompObject } = this.state;
    const rootObject = this.computeSubTrees(wrapperCompObject.childNodes[0]);
    this.setState({
      domObject: rootObject,
      RootComponent: (props) => {
        return getWrapperComponent(rootObject, props);
      },
    });
  }

  componentDidMount() {
    const { svgFile } = this.props;
    fetch(svgFile)
      .then((res) => res.text())
      .then((resText) => {
        let updatedCompWrapperObject = { ...this.state.wrapperCompObject };
        if (resText.length > 0) {
          updatedCompWrapperObject = new DOMParser().parseFromString(
            removeNewlineCharacters(resText),
            `application/xml`
          );
        }
        this.setState(
          {
            fileData: resText,
            wrapperCompObject: updatedCompWrapperObject,
          },
          () => {
            this.performConversion();
          }
        );
      });
  }

  render() {
    const { RootComponent, domObject } = this.state;

    // passing all props to root component instead of that svgFile props.
    let allProps = { ...this.props };
    delete allProps.svgFile;

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
            {Object.values(domObject).length > 0 && (
              <RootComponent {...allProps} />
            )}
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

App.defaultProps = {
  svgFile: "",
};

export default App;
