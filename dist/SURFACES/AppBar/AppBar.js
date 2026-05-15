"use client";
import { jsx } from "react/jsx-runtime";
import { forwardRef } from "react";
import { APP_BAR_DEFAULTS, APP_BAR_CLASSES } from "./AppBar.constants";
import { buildAppBarClasses } from "./AppBar.utils";
const AppBar = forwardRef(({
  children,
  color = APP_BAR_DEFAULTS.color,
  position = APP_BAR_DEFAULTS.position,
  size = APP_BAR_DEFAULTS.size,
  elevated = APP_BAR_DEFAULTS.elevated,
  unstyled = APP_BAR_DEFAULTS.unstyled,
  className = APP_BAR_DEFAULTS.className
}, ref) => {
  const cls = buildAppBarClasses(color, position, size, elevated, className, unstyled);
  return /* @__PURE__ */ jsx("header", { ref, className: cls, children: /* @__PURE__ */ jsx("div", { className: APP_BAR_CLASSES.toolbar, children }) });
});
AppBar.displayName = "AppBar";
const AppBarLeading = ({
  children,
  className = ""
}) => /* @__PURE__ */ jsx("div", { className: [APP_BAR_CLASSES.leading, className].filter(Boolean).join(" "), children });
AppBarLeading.displayName = "AppBarLeading";
const AppBarTitle = ({
  children,
  className = ""
}) => /* @__PURE__ */ jsx("div", { className: [APP_BAR_CLASSES.title, className].filter(Boolean).join(" "), children });
AppBarTitle.displayName = "AppBarTitle";
const AppBarTrailing = ({
  children,
  className = ""
}) => /* @__PURE__ */ jsx("div", { className: [APP_BAR_CLASSES.trailing, className].filter(Boolean).join(" "), children });
AppBarTrailing.displayName = "AppBarTrailing";
var AppBar_default = AppBar;
export {
  AppBar,
  AppBarLeading,
  AppBarTitle,
  AppBarTrailing,
  AppBar_default as default
};
//# sourceMappingURL=AppBar.js.map
