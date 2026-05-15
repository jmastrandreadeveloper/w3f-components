"use client";
import { jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useCallback, useMemo } from "react";
import { countNodes, collectAllExpandableNodeIds } from "./Tree.utils";
const TreeContext = createContext(void 0);
const useTreeContext = () => {
  const context = useContext(TreeContext);
  if (!context) {
    throw new Error("useTreeContext debe ser usado dentro de un TreeProvider");
  }
  return context;
};
const TreeProvider = ({ children, data, onNodeSelect }) => {
  const [expandedNodes, setExpandedNodes] = useState(/* @__PURE__ */ new Set());
  const isValid = useMemo(() => data && Array.isArray(data) && data.length > 0, [data]);
  const totalNodes = useMemo(() => isValid ? countNodes(data) : 0, [isValid, data]);
  const allExpandableNodeIds = useMemo(
    () => isValid ? collectAllExpandableNodeIds(data) : /* @__PURE__ */ new Set(),
    [isValid, data]
  );
  const isExpanded = useMemo(() => {
    if (!isValid || allExpandableNodeIds.size === 0) return false;
    return expandedNodes.size === allExpandableNodeIds.size;
  }, [expandedNodes, allExpandableNodeIds, isValid]);
  const toggleNode = useCallback((nodeId) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  }, []);
  const expandAll = useCallback(() => {
    setExpandedNodes(allExpandableNodeIds);
  }, [allExpandableNodeIds]);
  const collapseAll = useCallback(() => {
    setExpandedNodes(/* @__PURE__ */ new Set());
  }, []);
  const handleToggleAll = useCallback(() => {
    if (isExpanded) {
      collapseAll();
    } else {
      expandAll();
    }
  }, [isExpanded, collapseAll, expandAll]);
  const handleNodeClick = useCallback((node) => {
    if (onNodeSelect) {
      onNodeSelect(node);
    }
  }, [onNodeSelect]);
  const value = {
    data,
    expandedNodes,
    toggleNode,
    handleToggleAll,
    handleNodeClick,
    isExpanded,
    totalNodes,
    isValid
  };
  return /* @__PURE__ */ jsx(TreeContext.Provider, { value, children });
};
TreeProvider.displayName = "TreeProvider";
var TreeContext_default = TreeProvider;
export {
  TreeProvider,
  TreeContext_default as default,
  useTreeContext
};
//# sourceMappingURL=TreeContext.js.map
