import React from 'react';
import { useTreeContext } from './TreeContext';

const ExpandAllIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
    </svg>
);

const CollapseAllIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
        <path d="M200-440v-80h560v80H200Z" />
    </svg>
);

const TreeControls: React.FC = () => {
    const { handleToggleAll, isExpanded, totalNodes } = useTreeContext();

    const buttonClasses = 'w3f-tree-simple-btn w3f-text-primary';

    return (
        <div className="w3f-tree-controls w3f-flex w3f-items-center w3f-mb-2">
            <button
                className={buttonClasses}
                onClick={handleToggleAll}
                title={isExpanded ? 'Colapsar todo' : 'Expandir todo'}
            >
                {isExpanded
                    ? <CollapseAllIcon className="w3f-tree-simple-btn-icon" />
                    : <ExpandAllIcon className="w3f-tree-simple-btn-icon" />}
            </button>

            {totalNodes > 0 && (
                <span className="w3f-text-gray-600 w3f-ml-2">
                    <span className="w3f-text-sm">({totalNodes} nodos)</span>
                </span>
            )}
        </div>
    );
};

TreeControls.displayName = 'TreeControls';

export { TreeControls };
export default TreeControls;
