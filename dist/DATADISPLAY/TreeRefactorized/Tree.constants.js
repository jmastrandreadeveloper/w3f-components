"use client";
import { jsx } from "react/jsx-runtime";
const folderClosedSvg = /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 -960 960 960", width: "24px", fill: "#5f6368", children: /* @__PURE__ */ jsx("path", { d: "M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Z" }) });
const folderOpenSvg = /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 -960 960 960", width: "24px", fill: "#5f6368", children: /* @__PURE__ */ jsx("path", { d: "M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640H447l-80-80H160v480l96-320h684L837-217q-8 26-29.5 41.5T760-160H160Zm84-80h516l72-240H316l-72 240Zm0 0 72-240-72 240Zm-84-400v-80 80Z" }) });
const fileSvg = /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 -960 960 960", width: "24px", fill: "#5f6368", children: /* @__PURE__ */ jsx("path", { d: "M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" }) });
const fileCodeSvg = /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 -960 960 960", width: "24px", fill: "#5f6368", children: /* @__PURE__ */ jsx("path", { d: "M320-240 80-480l240-240 57 57-184 184 183 183-56 56Zm320 0-57-57 184-184-183-183 56-56 240 240-240 240Z" }) });
const toggleCollapsedSvg = /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", height: "16px", viewBox: "0 -960 960 960", width: "16px", fill: "#5f6368", children: /* @__PURE__ */ jsx("path", { d: "m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" }) });
const toggleExpandedSvg = /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", height: "16px", viewBox: "0 -960 960 960", width: "16px", fill: "#5f6368", children: /* @__PURE__ */ jsx("path", { d: "M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" }) });
const TREE_DEFAULTS = {
  unstyled: false,
  className: ""
};
const TreeIconMap = {
  folderClosed: folderClosedSvg,
  folderOpen: folderOpenSvg,
  file: fileSvg,
  fileCode: fileCodeSvg
};
const ToggleIcons = {
  collapsed: toggleCollapsedSvg,
  expanded: toggleExpandedSvg
};
export {
  TREE_DEFAULTS,
  ToggleIcons,
  TreeIconMap
};
//# sourceMappingURL=Tree.constants.js.map
