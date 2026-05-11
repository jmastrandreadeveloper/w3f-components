import React, { forwardRef } from 'react';
import Button from '../../INPUTS/Button/Button';
import type { WindowGridProps } from './WindowGrid.types';
import { WINDOW_GRID_DEFAULTS, WINDOW_GRID_CLASSES } from './WindowGrid.constants';
import { useWindowState } from '../Window/Window.hooks';
import { useResponsiveGrid } from './WindowGrid.hooks';
import { buildGridStyle, buildWindowGridClasses } from './WindowGrid.utils';
import {
    buildWindowClasses,
    buildWindowBodyClasses,
    buildWindowFooterClasses,
    buildWindowStyle,
} from '../Window/Window.utils';
import { WINDOW_DEFAULTS, WINDOW_CLASSES, RESIZE_DIRECTIONS } from '../Window/Window.constants';

// ─── SVG icons (shared with Window) ─────────────────────────────────────────

const MinimizeIcon = () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
        <rect x="2" y="5" width="8" height="2" />
    </svg>
);
const MaximizeIcon = () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
        <rect x="2" y="2" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
);
const RestoreIcon = () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
        <path d="M3,3 L3,9 L9,9 L9,3 Z M4,4 L8,4 L8,8 L4,8 Z M5,1 L11,1 L11,7 L10,7 L10,2 L5,2 Z" />
    </svg>
);
const CloseIcon = () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
        <path d="M2,2 L10,10 M10,2 L2,10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * WindowGrid — Ventana estilo OS con grid responsivo interno.
 * Combina todas las funcionalidades de Window con un grid CSS
 * que se reorganiza automáticamente según el ancho de la ventana.
 *
 * @example
 * <WindowGrid title="Dashboard" autoResponsive responsiveColumns={{ xs: 1, md: 2, lg: 3 }}>
 *   <Card>...</Card>
 *   <Card>...</Card>
 * </WindowGrid>
 */
export const WindowGrid = forwardRef<HTMLDivElement, WindowGridProps>(({
    // Window props
    title = WINDOW_DEFAULTS.title,
    icon,
    children,
    footer,
    buttons = [],
    osStyle = WINDOW_DEFAULTS.osStyle,
    size = WINDOW_DEFAULTS.size,
    modal = WINDOW_DEFAULTS.modal,
    draggable = WINDOW_DEFAULTS.draggable,
    resizable = WINDOW_DEFAULTS.resizable,
    minimizable = WINDOW_DEFAULTS.minimizable,
    maximizable = WINDOW_DEFAULTS.maximizable,
    closable = WINDOW_DEFAULTS.closable,
    onClose,
    onMinimize,
    onMaximize,
    onFocus,
    onResize,
    className = WINDOW_DEFAULTS.className,
    bodyClassName = WINDOW_DEFAULTS.bodyClassName,
    footerClassName = WINDOW_DEFAULTS.footerClassName,
    style,
    initialPosition = null,
    initialSize = null,
    footerAlign = WINDOW_DEFAULTS.footerAlign,
    open = WINDOW_DEFAULTS.open,
    noPadding = WINDOW_DEFAULTS.noPadding,

    // Grid props
    gridTemplateColumns,
    gridTemplateRows,
    gridTemplateAreas,
    gap = WINDOW_GRID_DEFAULTS.gap,
    rowGap,
    columnGap,
    autoColumns,
    autoRows,
    autoFlow,
    justifyContent,
    alignContent,
    justifyItems,
    alignItems,

    // Responsive
    responsiveBreakpoints = WINDOW_GRID_DEFAULTS.responsiveBreakpoints,
    responsiveColumns = WINDOW_GRID_DEFAULTS.responsiveColumns,
    autoResponsive = WINDOW_GRID_DEFAULTS.autoResponsive,
    unstyled = WINDOW_GRID_DEFAULTS.unstyled,
}, ref) => {
    const {
        isOpen, isMinimized, isMaximized, isFocused, isDragging, isResizing,
        position, dimensions, windowRef,
        handleDragStart, handleResizeStart,
        handleClose, handleMinimize, handleMaximize, handleWindowClick,
    } = useWindowState(
        open, draggable, resizable,
        onClose, onMinimize, onMaximize, onFocus,
        initialPosition, initialSize,
    );

    const { gridColumns, currentBreakpoint, bodyRef } = useResponsiveGrid(
        autoResponsive,
        responsiveBreakpoints,
        responsiveColumns,
        gridTemplateColumns,
        [dimensions, isMaximized],
    );

    if (!isOpen) return null;

    const windowCls = buildWindowGridClasses(
        buildWindowClasses(osStyle, size, modal, isMaximized, isMinimized, isFocused, isDragging, isResizing, className),
        WINDOW_GRID_CLASSES.gridBase,
        unstyled,
    );

    const bodyCls = [
        buildWindowBodyClasses(noPadding, bodyClassName),
        WINDOW_GRID_CLASSES.gridBody,
    ].join(' ');

    const footerCls = buildWindowFooterClasses(footerAlign, footerClassName);
    const windowStyle = buildWindowStyle(style, position, dimensions, isMaximized);

    const gridStyle = buildGridStyle(
        { gridTemplateColumns, gridTemplateRows, gridTemplateAreas, gap, rowGap, columnGap, autoColumns, autoRows, autoFlow, justifyContent, alignContent, justifyItems, alignItems },
        gridColumns,
        autoResponsive,
    );

    // ─── Control buttons ────────────────────────────────────────────────────

    const renderMacosButtons = () => (
        <div className={WINDOW_CLASSES.titlebarLeft}>
            {closable && (
                <Button className={`${WINDOW_CLASSES.controlBtn} ${WINDOW_CLASSES.controlClose}`}
                    onClick={handleClose} aria-label="Cerrar" variant="text" size="sm"><span>×</span></Button>
            )}
            {minimizable && (
                <Button className={`${WINDOW_CLASSES.controlBtn} ${WINDOW_CLASSES.controlMinimize}`}
                    onClick={handleMinimize} aria-label="Minimizar" variant="text" size="sm"><span>−</span></Button>
            )}
            {maximizable && (
                <Button className={`${WINDOW_CLASSES.controlBtn} ${WINDOW_CLASSES.controlMaximize}`}
                    onClick={handleMaximize} aria-label={isMaximized ? 'Restaurar' : 'Maximizar'} variant="text" size="sm"><span>+</span></Button>
            )}
            {icon && <div className={WINDOW_CLASSES.icon}>{icon}</div>}
            <h2 className={WINDOW_CLASSES.title}>{title}</h2>
        </div>
    );

    const renderWindowsButtons = () => (
        <>
            <div className={WINDOW_CLASSES.titlebarLeft}>
                {icon && <div className={WINDOW_CLASSES.icon}>{icon}</div>}
                <h2 className={WINDOW_CLASSES.title}>{title}</h2>
                {autoResponsive && (
                    <span style={{ fontSize: '0.75rem', opacity: 0.6, marginLeft: '8px' }}>
                        ({currentBreakpoint})
                    </span>
                )}
            </div>
            <div className={WINDOW_CLASSES.titlebarRight}>
                {minimizable && (
                    <Button className={`${WINDOW_CLASSES.controlBtn} ${WINDOW_CLASSES.controlMinimize}`}
                        onClick={handleMinimize} aria-label="Minimizar" variant="text" size="sm"><MinimizeIcon /></Button>
                )}
                {maximizable && (
                    <Button className={`${WINDOW_CLASSES.controlBtn} ${WINDOW_CLASSES.controlMaximize}`}
                        onClick={handleMaximize} aria-label={isMaximized ? 'Restaurar' : 'Maximizar'} variant="text" size="sm">
                        {isMaximized ? <RestoreIcon /> : <MaximizeIcon />}
                    </Button>
                )}
                {closable && (
                    <Button className={`${WINDOW_CLASSES.controlBtn} ${WINDOW_CLASSES.controlClose}`}
                        onClick={handleClose} aria-label="Cerrar" variant="text" size="sm"><CloseIcon /></Button>
                )}
            </div>
        </>
    );

    const renderResizeHandles = () => {
        if (!resizable || isMaximized) return null;
        return RESIZE_DIRECTIONS.map((dir) => (
            <div
                key={dir}
                className={`${WINDOW_CLASSES.resizeHandle} ${WINDOW_CLASSES.resizeHandle}--${dir}`}
                onMouseDown={(e) => handleResizeStart(e, dir)}
            />
        ));
    };

    const renderFooter = () => {
        if (!footer && (!buttons || buttons.length === 0)) return null;
        return (
            <div className={footerCls}>
                {footer ?? buttons.map(({ key, text, children: btnChildren, ...rest }, index) => (
                    <Button key={key as string ?? `wg-btn-${index}`} {...rest}>
                        {text ?? btnChildren}
                    </Button>
                ))}
            </div>
        );
    };

    const windowContent = (
        <div ref={(node) => {
            (windowRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }} className={windowCls} style={windowStyle} onClick={handleWindowClick}>
            <div
                className={`${WINDOW_CLASSES.titlebar} ${isDragging ? WINDOW_CLASSES.titlebarDragging : ''}`}
                onMouseDown={handleDragStart}
            >
                {osStyle === 'macos' ? renderMacosButtons() : renderWindowsButtons()}
            </div>

            <div ref={bodyRef} className={bodyCls}>
                <div style={gridStyle}>{children}</div>
            </div>

            {renderFooter()}
            {renderResizeHandles()}
        </div>
    );

    if (modal) return <div className={WINDOW_CLASSES.overlay}>{windowContent}</div>;
    return windowContent;
});

WindowGrid.displayName = 'WindowGrid';

export default WindowGrid;
