import type { TreeNodeData } from './Tree.types';
/**
 * Hook para gestionar el estado de expansión de un árbol.
 */
export declare const useTree: (data: TreeNodeData[]) => {
    expandedNodes: Set<string | number>;
    toggleNode: (nodeId: string | number) => void;
    handleToggleAll: () => void;
    isExpanded: boolean;
    totalNodes: number;
    isValid: boolean;
};
//# sourceMappingURL=Tree.hooks.d.ts.map