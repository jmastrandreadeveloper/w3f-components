import type { DividerPosition } from './GridWithDividers.types';

/**
 * Estilos para los divisores.
 */
const gridDividerStyles = {
    dividerVertical: (isDragging: boolean, position: DividerPosition = 'right'): React.CSSProperties => ({
        position: 'absolute',
        top: 0,
        bottom: 0,
        [position]: '-2px',
        width: '4px',
        backgroundColor: isDragging ? '#2563eb' : '#d1d5db',
        cursor: 'col-resize',
        transition: 'background-color 0.2s',
        zIndex: 9,
    }),

    dividerVerticalHandle: {
        position: 'absolute' as const,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '4px',
        height: '48px',
        backgroundColor: '#9ca3af',
        borderRadius: '9999px',
    } as React.CSSProperties,

    dividerHorizontal: (isDragging: boolean, position: DividerPosition = 'bottom'): React.CSSProperties => ({
        position: 'absolute',
        left: 0,
        right: 0,
        [position]: '-2px',
        height: '4px',
        backgroundColor: isDragging ? '#2563eb' : '#d1d5db',
        cursor: 'row-resize',
        transition: 'background-color 0.2s',
        zIndex: 9,
    }),

    dividerHorizontalHandle: {
        position: 'absolute' as const,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: '4px',
        width: '48px',
        backgroundColor: '#9ca3af',
        borderRadius: '9999px',
    } as React.CSSProperties,
};

export default gridDividerStyles;
