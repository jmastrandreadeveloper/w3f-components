import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { TreeProviderProps, TreeContextValue, TreeNodeData } from './Tree.types';
import { countNodes, collectAllExpandableNodeIds } from './Tree.utils';

const TreeContext = createContext<TreeContextValue | undefined>(undefined);

export const useTreeContext = (): TreeContextValue => {
    const context = useContext(TreeContext);
    if (!context) {
        throw new Error('useTreeContext debe ser usado dentro de un TreeProvider');
    }
    return context;
};

const TreeProvider: React.FC<TreeProviderProps> = ({ children, data, onNodeSelect }) => {
    const [expandedNodes, setExpandedNodes] = useState<Set<string | number>>(new Set());

    const isValid = useMemo(() => data && Array.isArray(data) && data.length > 0, [data]);
    const totalNodes = useMemo(() => isValid ? countNodes(data) : 0, [isValid, data]);

    const allExpandableNodeIds = useMemo(
        () => isValid ? collectAllExpandableNodeIds(data) : new Set<string | number>(),
        [isValid, data]
    );

    const isExpanded = useMemo(() => {
        if (!isValid || allExpandableNodeIds.size === 0) return false;
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

    const handleNodeClick = useCallback((node: TreeNodeData) => {
        if (onNodeSelect) {
            onNodeSelect(node);
        }
    }, [onNodeSelect]);

    const value: TreeContextValue = {
        data,
        expandedNodes,
        toggleNode,
        handleToggleAll,
        handleNodeClick,
        isExpanded,
        totalNodes,
        isValid,
    };

    return (
        <TreeContext.Provider value={value}>
            {children}
        </TreeContext.Provider>
    );
};

TreeProvider.displayName = 'TreeProvider';

export { TreeProvider };
export default TreeProvider;
