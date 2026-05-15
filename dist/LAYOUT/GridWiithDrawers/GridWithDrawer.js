"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { GRID_DRAWER_DEFAULTS } from "./GridWithDrawer.constants";
import { buildDrawerWrapperClasses } from "./GridWithDrawer.utils";
import useGridDividers from "../GridWithDividers/GridWithDividers.hooks";
import gridDividerUtils from "../GridWithDividers/GridWithDividers.utils";
import { Divider } from "../GridWithDividers/Divider";
import { Grid, GridAreaItem } from "../Grid/Grid";
import { ToggleButton } from "./ToggleButton";
const GridWithDrawer = ({
  templateColumns,
  templateRows,
  templateAreas,
  drawerAreaName,
  gap = GRID_DRAWER_DEFAULTS.gap,
  dividers = [],
  children,
  style = {}
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const dividerStates = useGridDividers(dividers);
  let adjustedTemplateColumns = templateColumns;
  let adjustedTemplateRows = templateRows;
  dividers.forEach((config, index) => {
    const state = dividerStates[index];
    const targetTemplate = config.orientation === "vertical" ? adjustedTemplateColumns : adjustedTemplateRows;
    const targetIndex = config.orientation === "vertical" ? config.columnIndex : config.rowIndex;
    if (targetIndex !== void 0 && targetTemplate) {
      let newSize = state.size;
      if (index === GRID_DRAWER_DEFAULTS.drawerIndex) {
        newSize = isDrawerOpen ? state.size : GRID_DRAWER_DEFAULTS.collapsedSize;
      }
      const newTemplate = gridDividerUtils.replaceTemplateSize(targetTemplate, targetIndex, newSize);
      if (config.orientation === "vertical") {
        adjustedTemplateColumns = newTemplate;
      } else {
        adjustedTemplateRows = newTemplate;
      }
    }
  });
  const mapChildrenAndAddDividers = (childNodes) => {
    return React.Children.map(childNodes, (child) => {
      if (!React.isValidElement(child)) return child;
      const childProps = child.props;
      const gridArea = childProps.gridArea || childProps.style?.gridArea;
      const isDrawerArea = gridArea === drawerAreaName;
      const childStyle = childProps.style || {};
      const { overflow, overflowX, overflowY } = childStyle;
      const childContent = React.cloneElement(child, {
        ...childProps,
        gridArea: void 0,
        style: {
          ...childStyle,
          gridArea: void 0,
          overflow: void 0,
          overflowX: void 0,
          overflowY: void 0,
          position: void 0,
          width: "100%",
          height: "100%"
        }
      });
      const wrapperClasses = buildDrawerWrapperClasses(isDrawerArea, isDrawerOpen);
      const applicableDividers = dividers.map((config, index) => ({ config, index })).filter(
        ({ config }) => config.between && config.between[0] === gridArea || config.area === gridArea
      );
      return /* @__PURE__ */ jsxs(
        GridAreaItem,
        {
          gridArea,
          className: wrapperClasses,
          style: {
            position: "relative",
            overflow: isDrawerArea && !isDrawerOpen ? "hidden" : overflow || "visible",
            overflowX: isDrawerArea && !isDrawerOpen ? "hidden" : overflowX,
            overflowY: isDrawerArea && !isDrawerOpen ? "hidden" : overflowY
          },
          children: [
            isDrawerArea && /* @__PURE__ */ jsx(
              ToggleButton,
              {
                isDrawerOpen,
                onToggle: () => setIsDrawerOpen(!isDrawerOpen)
              }
            ),
            childContent,
            applicableDividers.map(({ config, index }) => {
              if (index === GRID_DRAWER_DEFAULTS.drawerIndex && !isDrawerOpen) return null;
              const state = dividerStates[index];
              const orientation = config.orientation || "vertical";
              const position = config.position || (orientation === "vertical" ? "right" : "bottom");
              const handleMouseDown = (e) => {
                const inverted = position === "left" || position === "top";
                state.handleMouseDown(e, inverted);
              };
              const dividerClass = [
                "w3f-divider",
                `w3f-divider-${orientation}`,
                `w3f-divider-${position}`,
                state.isDragging ? "is-dragging" : ""
              ].filter(Boolean).join(" ");
              return /* @__PURE__ */ jsx(
                Divider,
                {
                  className: dividerClass,
                  onMouseDown: handleMouseDown,
                  orientation,
                  isDragging: state.isDragging
                },
                `divider-${index}`
              );
            })
          ]
        }
      );
    });
  };
  return /* @__PURE__ */ jsx(
    Grid,
    {
      templateColumns: adjustedTemplateColumns,
      templateRows: adjustedTemplateRows,
      templateAreas,
      gap,
      style,
      children: mapChildrenAndAddDividers(children)
    }
  );
};
GridWithDrawer.displayName = "GridWithDrawer";
var GridWithDrawer_default = GridWithDrawer;
export {
  GridWithDrawer,
  GridWithDrawer_default as default
};
//# sourceMappingURL=GridWithDrawer.js.map
