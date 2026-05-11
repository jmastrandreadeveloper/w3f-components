import React, { useCallback } from 'react';
import { useTreeContext } from './TreeContext';
import { hasChildren } from './Tree.utils';
import { ToggleIcons, TreeIconMap } from './Tree.constants';
import type { TreeNodeProps } from './Tree.types';

const TreeNode: React.FC<TreeNodeProps> = React.memo(({ node, isChild = false }) => {
    const { expandedNodes, toggleNode, handleNodeClick } = useTreeContext();

    const isExpanded = expandedNodes.has(node.id);
    const nodeHasChildren = hasChildren(node);

    const iconKey = nodeHasChildren
        ? (isExpanded ? 'folderOpen' : 'folderClosed')
        : (node.iconId === 'fileCode' ? 'fileCode' : 'file');
    const nodeIconSvg = TreeIconMap[iconKey] || TreeIconMap.file;

    const onNodeClick = useCallback(() => {
        handleNodeClick(node);
        if (nodeHasChildren) {
            toggleNode(node.id);
        }
    }, [node, handleNodeClick, nodeHasChildren, toggleNode]);

    const itemClasses = 'w3f-tree-item';
    let nodeClasses = 'w3f-tree-node w3f-flex w3f-items-center w3f-p-1 w3f-rounded w3f-cursor-pointer';
    if (isChild) nodeClasses += ' w3f-pl-4';

    const toggleClasses = `w3f-tree-toggle w3f-mr-1 ${isExpanded ? 'expanded' : ''}`;
    const submenuClasses = `w3f-tree-submenu w3f-pl-2 ${isExpanded ? '' : 'w3f-hidden'}`;

    return (
        <li className={itemClasses}>
            <div className={nodeClasses} onClick={onNodeClick}>
                <span className={toggleClasses}>
                    {nodeHasChildren && (isExpanded ? ToggleIcons.expanded : ToggleIcons.collapsed)}
                </span>

                <span className="w3f-tree-icon w3f-mr-1">
                    {nodeIconSvg}
                </span>

                <span className={nodeHasChildren ? 'w3f-text-gray-800 w3f-font-medium' : 'w3f-text-gray-700'}>
                    {node.name}
                </span>
            </div>

            {nodeHasChildren && (
                <ul className={submenuClasses}>
                    <div className="w3f-tree-submenu-inner">
                        {node.children!.map((childNode) => (
                            <TreeNode
                                key={childNode.id || childNode.name}
                                node={childNode}
                                isChild={true}
                            />
                        ))}
                    </div>
                </ul>
            )}
        </li>
    );
});

TreeNode.displayName = 'TreeNode';

export { TreeNode };
export default TreeNode;
