import React from 'react';
import type { ToggleButtonProps } from './GridWithDrawer.types';
import { GRID_DRAWER_CLASSES } from './GridWithDrawer.constants';

export type { ToggleButtonProps } from './GridWithDrawer.types';

/**
 * ToggleButton - Botón para colapsar/expandir el drawer.
 */
const ToggleButton: React.FC<ToggleButtonProps> = ({
    isDrawerOpen,
    onToggle,
    className = '',
}) => {
    return (
        <div className={`${GRID_DRAWER_CLASSES.toggleContainer} ${className}`}>
            <button
                className={GRID_DRAWER_CLASSES.toggleBtn}
                onClick={onToggle}
                type="button"
                title={isDrawerOpen ? 'Colapsar panel' : 'Expandir panel'}
            >
                {isDrawerOpen ? '«' : '»'}
            </button>
        </div>
    );
};

ToggleButton.displayName = 'ToggleButton';

export { ToggleButton };
export default ToggleButton;
