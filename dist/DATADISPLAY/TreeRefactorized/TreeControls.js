"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { useTreeContext } from "./TreeContext";
const ExpandAllIcon = (props) => /* @__PURE__ */ jsx("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 -960 960 960", width: "24px", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" }) });
const CollapseAllIcon = (props) => /* @__PURE__ */ jsx("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 -960 960 960", width: "24px", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M200-440v-80h560v80H200Z" }) });
const TreeControls = () => {
  const { handleToggleAll, isExpanded, totalNodes } = useTreeContext();
  const buttonClasses = "w3f-tree-simple-btn w3f-text-primary";
  return /* @__PURE__ */ jsxs("div", { className: "w3f-tree-controls w3f-flex w3f-items-center w3f-mb-2", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        className: buttonClasses,
        onClick: handleToggleAll,
        title: isExpanded ? "Colapsar todo" : "Expandir todo",
        children: isExpanded ? /* @__PURE__ */ jsx(CollapseAllIcon, { className: "w3f-tree-simple-btn-icon" }) : /* @__PURE__ */ jsx(ExpandAllIcon, { className: "w3f-tree-simple-btn-icon" })
      }
    ),
    totalNodes > 0 && /* @__PURE__ */ jsx("span", { className: "w3f-text-gray-600 w3f-ml-2", children: /* @__PURE__ */ jsxs("span", { className: "w3f-text-sm", children: [
      "(",
      totalNodes,
      " nodos)"
    ] }) })
  ] });
};
TreeControls.displayName = "TreeControls";
var TreeControls_default = TreeControls;
export {
  TreeControls,
  TreeControls_default as default
};
//# sourceMappingURL=TreeControls.js.map
