import type { TreeNodeData } from './Tree.types';
/**
 * Build CSS classes for the Tree container.
 */
export declare const buildTreeClasses: (unstyled?: boolean, className?: string) => string;
/**
 * Verifica si un nodo tiene hijos.
 */
export declare const hasChildren: (node: TreeNodeData) => boolean;
/**
 * Devuelve el icono apropiado para el nodo (versión emoji legacy).
 */
export declare const getNodeIcon: (node: TreeNodeData, isExpanded: boolean) => string;
/**
 * Cuenta recursivamente todos los nodos.
 */
export declare const countNodes: (nodes: TreeNodeData[]) => number;
/**
 * Colecta todos los IDs de nodos que son expandibles (tienen hijos).
 */
export declare const collectAllExpandableNodeIds: (nodes: TreeNodeData[]) => Set<string | number>;
//# sourceMappingURL=Tree.utils.d.ts.map