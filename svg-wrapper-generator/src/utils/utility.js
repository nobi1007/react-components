export const removeWhiteSpaces = (inpString) => {
  let tempString = "";
  const noSpaceList = inpString.split(/\r?\n|\r/g);
  noSpaceList.forEach((element) => {
    if (element.length > 0) {
      tempString += element.trim() + " ";
    }
  });
  return tempString;
};

export const convertPropsToString = (props) => {
  let opString = "";
  console.log("input props", props);
  const keys = Object.keys(props);
  keys.forEach((eachKey, inx) => {
    opString += ` ${eachKey}="${props[eachKey]}"`;
  });
  return opString;
};

export const insertPropsToFileString = (inpString, vals) => {
  console.log("input- -- props", vals);
  const toInsertString = convertPropsToString(vals);
  const startIndex = inpString.indexOf("<svg");
  const opString =
    inpString.substring(0, startIndex + 4) +
    toInsertString +
    inpString.substring(startIndex + 4, inpString.length);
  console.log("op-string", opString);
  return opString;
};
