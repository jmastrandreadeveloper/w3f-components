"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { forwardRef } from "react";
import { Tree } from "../../DATADISPLAY/TreeRefactorized/Tree";
import { TreeProvider } from "../../DATADISPLAY/TreeRefactorized/TreeContext";
import { SIDENAV_DEFAULTS, SIDENAV_CLASSES } from "./Sidenav.constants";
import { buildSidenavContainerClasses } from "./Sidenav.utils";
const LoadingIcon = () => /* @__PURE__ */ jsx(
  "svg",
  {
    className: SIDENAV_CLASSES.alertIcon,
    xmlns: "http://www.w3.org/2000/svg",
    height: "24px",
    viewBox: "0 -960 960 960",
    width: "24px",
    fill: "currentColor",
    children: /* @__PURE__ */ jsx("path", { d: "M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-40-82v-78q-33 0-56.5-23.5T360-320v-40L168-552q-3 18-5.5 36t-2.5 36q0 121 79.5 212T440-162Zm276-102q20-22 36-47.5t26.5-53q10.5-27.5 16-56.5t5.5-59q0-98-54.5-179T600-776v16q0 33-23.5 56.5T520-680h-80v80q0 17-11.5 28.5T400-560h-80v80h240q17 0 28.5 11.5T600-440v120h40q26 0 47 15.5t29 40.5Z" })
  }
);
const ErrorIcon = () => /* @__PURE__ */ jsx(
  "svg",
  {
    className: SIDENAV_CLASSES.alertIcon,
    xmlns: "http://www.w3.org/2000/svg",
    height: "24px",
    viewBox: "0 -960 960 960",
    width: "24px",
    fill: "currentColor",
    children: /* @__PURE__ */ jsx("path", { d: "M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" })
  }
);
const WarningIcon = () => /* @__PURE__ */ jsx(
  "svg",
  {
    className: SIDENAV_CLASSES.alertIcon,
    xmlns: "http://www.w3.org/2000/svg",
    height: "24px",
    viewBox: "0 -960 960 960",
    width: "24px",
    fill: "currentColor",
    children: /* @__PURE__ */ jsx("path", { d: "m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T400-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z" })
  }
);
const Sidenav = forwardRef(({
  treeData,
  loading = SIDENAV_DEFAULTS.loading,
  error = SIDENAV_DEFAULTS.error,
  onNodeSelect,
  variant = SIDENAV_DEFAULTS.variant,
  unstyled = SIDENAV_DEFAULTS.unstyled,
  className = SIDENAV_DEFAULTS.className
}, ref) => {
  const containerCls = buildSidenavContainerClasses(variant, className, unstyled);
  if (loading) {
    return /* @__PURE__ */ jsx("div", { ref, className: containerCls, children: /* @__PURE__ */ jsxs("div", { className: `${SIDENAV_CLASSES.alert} ${SIDENAV_CLASSES.alertLoading}`, children: [
      /* @__PURE__ */ jsx(LoadingIcon, {}),
      /* @__PURE__ */ jsx("span", { children: "Cargando navegaci\xF3n..." })
    ] }) });
  }
  if (error) {
    return /* @__PURE__ */ jsx("div", { ref, className: containerCls, children: /* @__PURE__ */ jsxs("div", { className: `${SIDENAV_CLASSES.alert} ${SIDENAV_CLASSES.alertError}`, children: [
      /* @__PURE__ */ jsx(ErrorIcon, {}),
      /* @__PURE__ */ jsxs("span", { children: [
        "Error: ",
        error
      ] })
    ] }) });
  }
  if (!treeData || !Array.isArray(treeData) || treeData.length === 0) {
    return /* @__PURE__ */ jsx("div", { ref, className: containerCls, children: /* @__PURE__ */ jsxs("div", { className: `${SIDENAV_CLASSES.alert} ${SIDENAV_CLASSES.alertError}`, children: [
      /* @__PURE__ */ jsx(WarningIcon, {}),
      /* @__PURE__ */ jsx("span", { children: "No hay datos para mostrar" })
    ] }) });
  }
  return /* @__PURE__ */ jsx("div", { ref, className: containerCls, children: /* @__PURE__ */ jsx(TreeProvider, { data: treeData, onNodeSelect, children: /* @__PURE__ */ jsx(Tree, {}) }) });
});
Sidenav.displayName = "Sidenav";
var Sidenav_default = Sidenav;
export {
  Sidenav,
  Sidenav_default as default
};
//# sourceMappingURL=Sidenav.js.map
