"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import React, { useCallback } from "react";
import { useTreeContext } from "./TreeContext";
import { hasChildren } from "./Tree.utils";
import { ToggleIcons, TreeIconMap } from "./Tree.constants";
const TreeNode = React.memo(({ node, isChild = false }) => {
  const { expandedNodes, toggleNode, handleNodeClick } = useTreeContext();
  const isExpanded = expandedNodes.has(node.id);
  const nodeHasChildren = hasChildren(node);
  const iconKey = nodeHasChildren ? isExpanded ? "folderOpen" : "folderClosed" : node.iconId === "fileCode" ? "fileCode" : "file";
  const nodeIconSvg = TreeIconMap[iconKey] || TreeIconMap.file;
  const onNodeClick = useCallback(() => {
    handleNodeClick(node);
    if (nodeHasChildren) {
      toggleNode(node.id);
    }
  }, [node, handleNodeClick, nodeHasChildren, toggleNode]);
  const itemClasses = "w3f-tree-item";
  let nodeClasses = "w3f-tree-node w3f-flex w3f-items-center w3f-p-1 w3f-rounded w3f-cursor-pointer";
  if (isChild) nodeClasses += " w3f-pl-4";
  const toggleClasses = `w3f-tree-toggle w3f-mr-1 ${isExpanded ? "expanded" : ""}`;
  const submenuClasses = `w3f-tree-submenu w3f-pl-2 ${isExpanded ? "" : "w3f-hidden"}`;
  return /* @__PURE__ */ jsxs("li", { className: itemClasses, children: [
    /* @__PURE__ */ jsxs("div", { className: nodeClasses, onClick: onNodeClick, children: [
      /* @__PURE__ */ jsx("span", { className: toggleClasses, children: nodeHasChildren && (isExpanded ? ToggleIcons.expanded : ToggleIcons.collapsed) }),
      /* @__PURE__ */ jsx("span", { className: "w3f-tree-icon w3f-mr-1", children: nodeIconSvg }),
      /* @__PURE__ */ jsx("span", { className: nodeHasChildren ? "w3f-text-gray-800 w3f-font-medium" : "w3f-text-gray-700", children: node.name })
    ] }),
    nodeHasChildren && /* @__PURE__ */ jsx("ul", { className: submenuClasses, children: /* @__PURE__ */ jsx("div", { className: "w3f-tree-submenu-inner", children: node.children.map((childNode) => /* @__PURE__ */ jsx(
      TreeNode,
      {
        node: childNode,
        isChild: true
      },
      childNode.id || childNode.name
    )) }) })
  ] });
});
TreeNode.displayName = "TreeNode";
var TreeNode_default = TreeNode;
export {
  TreeNode,
  TreeNode_default as default
};
//# sourceMappingURL=TreeNode.js.map
