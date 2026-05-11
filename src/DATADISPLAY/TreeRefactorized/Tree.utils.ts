import type { TreeNodeData } from './Tree.types';

/**
 * Build CSS classes for the Tree container.
 */
export const buildTreeClasses = (
    unstyled?: boolean,
    className?: string,
): string => {
    const base = 'w3f-tree';
    if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(' ');
    return [base, 'w3f-border w3f-border-gray-300 w3f-rounded w3f-p-2', className].filter(Boolean).join(' ');
};

/**
 * Verifica si un nodo tiene hijos.
 */
export const hasChildren = (node: TreeNodeData): boolean =>
    !!(node.children && Array.isArray(node.children) && node.children.length > 0);

/**
 * Devuelve el icono apropiado para el nodo (versión emoji legacy).
 */
export const getNodeIcon = (node: TreeNodeData, isExpanded: boolean): string => {
    if (hasChildren(node)) {
        return isExpanded ? '📂' : '📁';
    }
    return '📄';
};

/**
 * Cuenta recursivamente todos los nodos.
 */
export const countNodes = (nodes: TreeNodeData[]): number => {
    let count = nodes.length;
    nodes.forEach(node => {
        if (hasChildren(node)) {
            count += countNodes(node.children!);
        }
    });
    return count;
};

/**
 * Colecta todos los IDs de nodos que son expandibles (tienen hijos).
 */
export const collectAllExpandableNodeIds = (nodes: TreeNodeData[]): Set<string | number> => {
    const ids = new Set<string | number>();
    const stack = [...nodes];
    while (stack.length > 0) {
        const node = stack.pop()!;
        if (node.id && hasChildren(node)) {
            ids.add(node.id);
        }
        if (hasChildren(node)) {
            stack.push(...node.children!);
        }
    }
    return ids;
};
