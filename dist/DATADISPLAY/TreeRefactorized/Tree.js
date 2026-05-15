"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { TREE_DEFAULTS } from "./Tree.constants";
import { useTreeContext } from "./TreeContext";
import { TreeControls } from "./TreeControls";
import { TreeNode } from "./TreeNode";
import { buildTreeClasses } from "./Tree.utils";
const Tree = ({
  unstyled = TREE_DEFAULTS.unstyled,
  className = TREE_DEFAULTS.className
}) => {
  const { data, isValid } = useTreeContext();
  const alertClasses = "w3f-bg-warning-light w3f-text-warning p-3 w3f-rounded w3f-flex w3f-items-center w3f-gap-2";
  if (!isValid) {
    return /* @__PURE__ */ jsxs("div", { className: alertClasses, children: [
      /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 -960 960 960", width: "24px", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T440-320q-17 0-28.5 11.5T480-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z" }) }),
      /* @__PURE__ */ jsx("span", { children: "No hay datos para mostrar en el \xE1rbol" })
    ] });
  }
  const containerClasses = buildTreeClasses(unstyled, className);
  return /* @__PURE__ */ jsxs("div", { className: containerClasses, children: [
    /* @__PURE__ */ jsx(TreeControls, {}),
    /* @__PURE__ */ jsx("div", { className: "w3f-tree-main", children: /* @__PURE__ */ jsx("ul", { className: "w3f-tree-list", children: data.map((node) => /* @__PURE__ */ jsx(
      TreeNode,
      {
        node
      },
      node.id || node.name
    )) }) })
  ] });
};
Tree.displayName = "Tree";
var Tree_default = Tree;
export {
  Tree,
  Tree_default as default
};
//# sourceMappingURL=Tree.js.map
