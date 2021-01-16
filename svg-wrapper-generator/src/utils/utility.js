import { getCompByName } from "./exportSvgElements";

export const removeNewlineCharacters = (inpString) => {
  let tempString = "";
  const noSpaceList = inpString.split(/\r?\n|\r/g);
  noSpaceList.forEach((element) => {
    if (element.length > 0) {
      tempString += element.trim() + " ";
    }
  });
  return tempString;
};

export const getWrapperComponent = (rootNode, parentProps) => {
  const nodeAttributes = { ...rootNode.attributes };
  const nodeName = rootNode.nodeName;
  const NodeComponent = getCompByName(nodeName);

  if (rootNode.childNodes.length === 0) {
    return <NodeComponent {...nodeAttributes} />;
  } else {
    const SiblingComponents = [];
    rootNode.childNodes.forEach((eachChild, inx) => {
      const EachChildComp = getWrapperComponent(eachChild, {});
      SiblingComponents.push(EachChildComp);
    });
    return (
      <NodeComponent {...nodeAttributes} {...parentProps}>
        {SiblingComponents}
      </NodeComponent>
    );
  }
};
