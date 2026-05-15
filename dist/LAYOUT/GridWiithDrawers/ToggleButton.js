"use client";
import { jsx } from "react/jsx-runtime";
import { GRID_DRAWER_CLASSES } from "./GridWithDrawer.constants";
const ToggleButton = ({
  isDrawerOpen,
  onToggle,
  className = ""
}) => {
  return /* @__PURE__ */ jsx("div", { className: `${GRID_DRAWER_CLASSES.toggleContainer} ${className}`, children: /* @__PURE__ */ jsx(
    "button",
    {
      className: GRID_DRAWER_CLASSES.toggleBtn,
      onClick: onToggle,
      type: "button",
      title: isDrawerOpen ? "Colapsar panel" : "Expandir panel",
      children: isDrawerOpen ? "\xAB" : "\xBB"
    }
  ) });
};
ToggleButton.displayName = "ToggleButton";
var ToggleButton_default = ToggleButton;
export {
  ToggleButton,
  ToggleButton_default as default
};
//# sourceMappingURL=ToggleButton.js.map
