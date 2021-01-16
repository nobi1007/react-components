import React, { PureComponent } from "react";

import { getCompByName } from "./utils/exportSvgElements";

import "./App.scss";

import { insertPropsToFileString, removeWhiteSpaces } from "./utils/utility";

class App extends PureComponent {
  constructor(props) {
    super(props);
    console.log("this", this.props);
    this.state = {
      fileData: "",
      wrapperCompObject: {},
      domObject: {},
      RootComponent: null,
    };
    this.randomKey = -1;
    this.nodeInfoObject = {};
    this.ComponentRoot = null;
  }

  computeSubTrees = (rootNode) => {
    const nodeName = rootNode.nodeName;
    const attributes = rootNode.attributes;
    let attributeNames = Object.keys(attributes);
    let actualAttributes = {};
    attributeNames.forEach((eachAttributeName, inx) => {
      actualAttributes[attributes[eachAttributeName].nodeName] =
        attributes[eachAttributeName].value;
    });
    let actualChildNodes = [];
    rootNode.childNodes.forEach((eachChild) => {
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
      this.nodeInfoObject[nodeObject.key] = { ...nodeObject };
      return nodeObject;
    } else {
      actualChildNodes.forEach((eachChild, inx) => {
        const currentChildNode = { ...this.computeSubTrees(eachChild) };
        actualChildNodes[inx] = { ...currentChildNode };
      });
      nodeObject.childNodes = [...actualChildNodes];
      this.nodeInfoObject[nodeObject.key] = { ...nodeObject };
      return nodeObject;
    }
  };

  getWrapperComponent = (rootNode) => {
    const nodeAttributes = { ...rootNode.attributes };
    const nodeName = rootNode.nodeName;
    const NodeComponent = getCompByName(nodeName);

    if (rootNode.childNodes.length === 0) {
      return <NodeComponent {...nodeAttributes} />;
    } else {
      const SiblingComponents = [];
      rootNode.childNodes.forEach((eachChild, inx) => {
        const EachChildComp = this.getWrapperComponent(eachChild);
        SiblingComponents.push(EachChildComp);
      });
      return (
        <NodeComponent {...nodeAttributes}>{SiblingComponents}</NodeComponent>
      );
    }
  };

  performConversion = () => {
    const { wrapperCompObject } = this.state;
    const rootObject = this.computeSubTrees(wrapperCompObject.childNodes[0]);
    this.setState({
      domObject: rootObject,
      RootComponent: this.getWrapperComponent(rootObject),
    });
  };

  componentDidMount() {
    const { svgFile } = this.props;
    let allProps = { ...this.props };
    delete allProps.svgFile;
    fetch(svgFile)
      .then((res) => res.text())
      .then((resText) => {
        console.log("file rendered", resText);
        let updatedCompWrapperObject = { ...this.state.wrapperCompObject };
        if (resText.length > 0) {
          updatedCompWrapperObject = new DOMParser().parseFromString(
            insertPropsToFileString(removeWhiteSpaces(resText), allProps),
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

    console.log("render again", domObject);

    return (
      <div className="App">
        <header className="App-header">
          <div style={{ height: "20%", width: "20%" }}>{RootComponent}</div>

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
