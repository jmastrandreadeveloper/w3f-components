import { useState, useCallback, useMemo } from 'react';
import type { TreeNodeData } from './Tree.types';
import { countNodes, collectAllExpandableNodeIds } from './Tree.utils';

/**
 * Hook para gestionar el estado de expansión de un árbol.
 */
export const useTree = (data: TreeNodeData[]) => {
    const [expandedNodes, setExpandedNodes] = useState<Set<string | number>>(new Set());

    const isValid = useMemo(
        () => data && Array.isArray(data) && data.length > 0,
        [data]
    );

    const totalNodes = useMemo(
        () => isValid ? countNodes(data) : 0,
        [isValid, data]
    );

    const allExpandableNodeIds = useMemo(
        () => isValid ? collectAllExpandableNodeIds(data) : new Set<string | number>(),
        [isValid, data]
    );

    const isExpanded = useMemo(() => {
        if (!isValid) return false;
        return expandedNodes.size === allExpandableNodeIds.size;
    }, [expandedNodes, allExpandableNodeIds, isValid]);

    const toggleNode = useCallback((nodeId: string | number) => {
        setExpandedNodes(prev => {
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
        setExpandedNodes(new Set());
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
        isValid,
    };
};
