const buildTreeClasses = (unstyled, className) => {
  const base = "w3f-tree";
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  return [base, "w3f-border w3f-border-gray-300 w3f-rounded w3f-p-2", className].filter(Boolean).join(" ");
};
const hasChildren = (node) => !!(node.children && Array.isArray(node.children) && node.children.length > 0);
const getNodeIcon = (node, isExpanded) => {
  if (hasChildren(node)) {
    return isExpanded ? "\u{1F4C2}" : "\u{1F4C1}";
  }
  return "\u{1F4C4}";
};
const countNodes = (nodes) => {
  let count = nodes.length;
  nodes.forEach((node) => {
    if (hasChildren(node)) {
      count += countNodes(node.children);
    }
  });
  return count;
};
const collectAllExpandableNodeIds = (nodes) => {
  const ids = /* @__PURE__ */ new Set();
  const stack = [...nodes];
  while (stack.length > 0) {
    const node = stack.pop();
    if (node.id && hasChildren(node)) {
      ids.add(node.id);
    }
    if (hasChildren(node)) {
      stack.push(...node.children);
    }
  }
  return ids;
};
export {
  buildTreeClasses,
  collectAllExpandableNodeIds,
  countNodes,
  getNodeIcon,
  hasChildren
};
//# sourceMappingURL=Tree.utils.js.map
