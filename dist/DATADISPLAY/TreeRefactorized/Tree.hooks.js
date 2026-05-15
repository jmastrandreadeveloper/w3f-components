import { useState, useCallback, useMemo } from "react";
import { countNodes, collectAllExpandableNodeIds } from "./Tree.utils";
const useTree = (data) => {
  const [expandedNodes, setExpandedNodes] = useState(/* @__PURE__ */ new Set());
  const isValid = useMemo(
    () => data && Array.isArray(data) && data.length > 0,
    [data]
  );
  const totalNodes = useMemo(
    () => isValid ? countNodes(data) : 0,
    [isValid, data]
  );
  const allExpandableNodeIds = useMemo(
    () => isValid ? collectAllExpandableNodeIds(data) : /* @__PURE__ */ new Set(),
    [isValid, data]
  );
  const isExpanded = useMemo(() => {
    if (!isValid) return false;
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
  return {
    expandedNodes,
    toggleNode,
    handleToggleAll,
    isExpanded,
    totalNodes,
    isValid
  };
};
export {
  useTree
};
//# sourceMappingURL=Tree.hooks.js.map
