import React from "react";

import { SizeMe } from "react-sizeme";
import { Popup } from "semantic-ui-react";

import "./FlexibleMenuBar.scss";

export const allDataList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
export const leftConstData = ["a", "b"];
export const rightConstData = ["z"];
export const sepData = "...";

const FlexibleMenuBar = (props) => {
  const dataList = [...allDataList];
  const extraDataList = [];

  const { eachItemWidth, eachItemPadding } = props;

  const totalOccupiedWidth = parseInt(
    leftConstData.length * eachItemWidth +
      rightConstData.length * eachItemWidth +
      2 * (leftConstData.length + rightConstData.length + 1) * eachItemPadding
  );

  const menuItemStyle = {
    minWidth: `${eachItemWidth}px`,
    minHeight: `${eachItemWidth}px`,
    margin: `${eachItemPadding}px`,
  };
  const eachBoxWidth = parseInt(
    eachItemWidth + 2 * eachItemPadding + (eachItemPadding / 2 + 1)
  );
  const totalBoxes = allDataList.length;

  const handleMenuItemClick = (item) => {
    alert(`you clicked ${item}`);
  };

  const createMenubarItems = (dataList) => {
    const menuBarItemsList = [];
    dataList.forEach((item, inx) => {
      if (item === sepData) {
        menuBarItemsList.push(
          <Popup
            key={inx}
            style={menuItemStyle}
            content={<>{createMenubarItems(allDataList)}</>}
            on="click"
            popper={{ id: "popper-container", style: { zIndex: 2000 } }}
            position="top left"
            trigger={
              <div key={inx} className="menubar-item" style={menuItemStyle}>
                {item}
              </div>
            }
          />
        );
      } else {
        menuBarItemsList.push(
          <div
            key={inx}
            className="menubar-item"
            onClick={() => handleMenuItemClick(item)}
            style={menuItemStyle}
          >
            {item}
          </div>
        );
      }
    });
    return menuBarItemsList;
  };

  const getDataListByWidth = (width) => {
    if (width) {
      const totalLeftWidth = width - totalOccupiedWidth;
      const tbck = parseInt(totalLeftWidth / eachBoxWidth);
      const lenDiff = tbck - dataList.length;
      if (totalLeftWidth > 0) {
        if (tbck >= totalBoxes) {
          if (dataList[dataList.length - 1] === sepData) {
            dataList.pop();
          }

          dataList.push(...extraDataList.splice(0, extraDataList.length));
        } else {
          if (lenDiff !== 0) {
            if (lenDiff > 0) {
              if (dataList[dataList.length - 1] === sepData) {
                dataList.pop();
              }

              dataList.push(...extraDataList.splice(0, lenDiff));
              dataList.push(sepData);
            } else {
              const tempLenDiff = -lenDiff;
              if (dataList[dataList.length - 1] === sepData) {
                dataList.pop();
              }
              extraDataList.splice(
                0,
                0,
                ...dataList.splice(
                  dataList.length - tempLenDiff - 1,
                  tempLenDiff + 1
                )
              );
              dataList.push(sepData);
            }
          }
        }
      }
    }
    return dataList;
  };

  return (
    <div className="flexible-menubar-container">
      <h2>Flexible Menu Bar</h2>
      <SizeMe>
        {({ size }) => (
          <div className="flexible-menubar-main">
            <div className="left-const-data">
              {createMenubarItems(leftConstData)}
            </div>
            <div className="center-var-data">
              {createMenubarItems(getDataListByWidth(parseInt(size.width)))}
            </div>
            <div className="right-const-data">
              {createMenubarItems(rightConstData)}
            </div>
          </div>
        )}
      </SizeMe>
    </div>
  );
};

export default FlexibleMenuBar;
