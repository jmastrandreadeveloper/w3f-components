"use client";
import { jsx } from "react/jsx-runtime";
import { PANEL_DEFAULTS } from "./Panel.constants";
import { buildPanelClassNames } from "./Panel.utils";
const Panel = ({
  children,
  color,
  card,
  round,
  padding = PANEL_DEFAULTS.padding,
  border,
  className,
  ...rest
}) => {
  const classNames = buildPanelClassNames({
    color,
    card,
    round,
    padding,
    border,
    className
  });
  return /* @__PURE__ */ jsx("div", { className: classNames, style: color ? { backgroundColor: color } : void 0, ...rest, children });
};
Panel.displayName = "Panel";
var Panel_default = Panel;
export {
  Panel,
  Panel_default as default
};
//# sourceMappingURL=Panel.js.map
