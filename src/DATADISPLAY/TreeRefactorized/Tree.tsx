import React from 'react';
import type { TreeProps } from './Tree.types';
import { TREE_DEFAULTS } from './Tree.constants';
import { useTreeContext } from './TreeContext';
import { TreeControls } from './TreeControls';
import { TreeNode } from './TreeNode';
import { buildTreeClasses } from './Tree.utils';

/**
 * Componente Tree - Árbol de archivos/carpetas.
 * Debe usarse dentro de un TreeProvider.
 */
const Tree: React.FC<TreeProps> = ({
    unstyled = TREE_DEFAULTS.unstyled,
    className = TREE_DEFAULTS.className,
}) => {
    const { data, isValid } = useTreeContext();

    const alertClasses = 'w3f-bg-warning-light w3f-text-warning p-3 w3f-rounded w3f-flex w3f-items-center w3f-gap-2';

    if (!isValid) {
        return (
            <div className={alertClasses}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                    <path d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T440-320q-17 0-28.5 11.5T480-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z" />
                </svg>
                <span>No hay datos para mostrar en el árbol</span>
            </div>
        );
    }

    const containerClasses = buildTreeClasses(unstyled, className);

    return (
        <div className={containerClasses}>
            <TreeControls />
            <div className="w3f-tree-main">
                <ul className="w3f-tree-list">
                    {data.map((node) => (
                        <TreeNode
                            key={node.id || node.name}
                            node={node}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};

Tree.displayName = 'Tree';

export { Tree };
export default Tree;
