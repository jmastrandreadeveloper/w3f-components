"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import "./GridWithDividers.css";
import { GRID_DIVIDER_DEFAULTS } from "./GridWithDividers.constants";
import useGridDividers from "./GridWithDividers.hooks";
import gridDividerUtils from "./GridWithDividers.utils";
import { Grid } from "../Grid/Grid";
import { GridAreaItem } from "../Grid/Grid";
import { Divider } from "./Divider";
const normalizeAreas = (areas) => {
  if (!areas) return void 0;
  return areas.trim().split("\n").map((row) => row.trim().replace(/^["']|["']$/g, "")).join("\n");
};
const GridWithDividers = ({
  templateColumns,
  templateRows,
  templateAreas,
  gap = GRID_DIVIDER_DEFAULTS.gap,
  dividers = [],
  children,
  style = {}
}) => {
  const dividerStates = useGridDividers(dividers);
  let adjustedTemplateColumns = templateColumns;
  let adjustedTemplateRows = templateRows;
  dividers.forEach((config, index) => {
    const state = dividerStates[index];
    const targetIndex = config.orientation === "vertical" ? config.columnIndex : config.rowIndex;
    const targetTpl = config.orientation === "vertical" ? adjustedTemplateColumns : adjustedTemplateRows;
    if (targetIndex !== void 0 && targetTpl) {
      const newTpl = gridDividerUtils.replaceTemplateSize(targetTpl, targetIndex, state.size);
      if (config.orientation === "vertical") {
        adjustedTemplateColumns = newTpl;
      } else {
        adjustedTemplateRows = newTpl;
      }
    }
  });
  const mapChildrenAndAddDividers = (childNodes) => {
    return React.Children.map(childNodes, (child) => {
      if (!child || !React.isValidElement(child)) return child;
      const childProps = child.props;
      const gridArea = childProps.gridArea || childProps.style?.gridArea;
      const childStyle = childProps.style || {};
      const applicableDividers = dividers.map((config, index) => ({ config, index })).filter(({ config }) => config.between && config.between[0] === gridArea);
      if (applicableDividers.length === 0) return child;
      const { gridArea: _areaProp, style: childRestyle, ...restProps } = childProps;
      const childWithoutGridArea = React.cloneElement(child, {
        ...restProps,
        gridArea: void 0,
        style: {
          ...childRestyle,
          gridArea: void 0,
          overflow: void 0,
          overflowX: void 0,
          overflowY: void 0,
          position: void 0,
          width: "100%",
          height: "100%"
        }
      });
      return /* @__PURE__ */ jsxs(
        GridAreaItem,
        {
          gridArea,
          className: "w3f-grid-divider-wrapper",
          style: {
            position: "relative",
            overflow: childStyle.overflow || "visible",
            overflowX: childStyle.overflowX,
            overflowY: childStyle.overflowY
          },
          children: [
            childWithoutGridArea,
            applicableDividers.map(({ config, index }) => {
              const state = dividerStates[index];
              const orientation = config.orientation || "vertical";
              const position = config.position || (orientation === "vertical" ? "right" : "bottom");
              const inverted = position === "left" || position === "top";
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
                  onMouseDown: (e) => state.handleMouseDown(e, inverted),
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
      templateAreas: normalizeAreas(templateAreas),
      gap,
      style,
      children: mapChildrenAndAddDividers(children)
    }
  );
};
GridWithDividers.displayName = "GridWithDividers";
var GridWithDividers_default = GridWithDividers;
export {
  GridWithDividers,
  GridWithDividers_default as default
};
//# sourceMappingURL=GridWithDividers.js.map
