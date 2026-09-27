import type React from 'react';
/** Estructura de un nodo del árbol */
export interface TreeNodeData {
    id: string | number;
    name: string;
    type?: 'folder' | 'file';
    iconId?: string;
    children?: TreeNodeData[];
}
/** Props del Tree component */
export interface TreeProps {
    /** If true, removes all visual/preset styles — only structural CSS remains. */
    unstyled?: boolean;
    /** Additional CSS classes */
    className?: string;
}
/** Props del TreeProvider */
export interface TreeProviderProps {
    children: React.ReactNode;
    data: TreeNodeData[];
    onNodeSelect?: (node: TreeNodeData) => void;
    /** If true, all expandable nodes start expanded. Default: false. */
    defaultExpandAll?: boolean;
}
/** Valor del contexto del Tree */
export interface TreeContextValue {
    data: TreeNodeData[];
    expandedNodes: Set<string | number>;
    toggleNode: (nodeId: string | number) => void;
    handleToggleAll: () => void;
    handleNodeClick: (node: TreeNodeData) => void;
    isExpanded: boolean;
    totalNodes: number;
    isValid: boolean;
}
/** Props del componente TreeNode */
export interface TreeNodeProps {
    node: TreeNodeData;
    isChild?: boolean;
}
/** Mapa de iconos SVG */
export type IconMapType = Record<string, React.ReactElement>;
//# sourceMappingURL=Tree.types.d.ts.map