import React, { forwardRef } from 'react';
import Button from '../../INPUTS/Button/Button';
import type { WindowProps } from './Window.types';
import { WINDOW_DEFAULTS, WINDOW_CLASSES, RESIZE_DIRECTIONS } from './Window.constants';
import { useWindowState } from './Window.hooks';
import {
    buildWindowClasses,
    buildWindowBodyClasses,
    buildWindowFooterClasses,
    buildWindowStyle,
} from './Window.utils';

// ─── SVG icons ────────────────────────────────────────────────────────────────

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
 * Window — Ventana estilo OS con arrastre, redimensionamiento,
 * minimizar, maximizar y cerrar.
 *
 * @example
 * <Window title="Mi ventana" osStyle="macos" draggable resizable>
 *   <p>Contenido aquí</p>
 * </Window>
 */
export const Window = forwardRef<HTMLDivElement, WindowProps>(({
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
    className = WINDOW_DEFAULTS.className,
    bodyClassName = WINDOW_DEFAULTS.bodyClassName,
    footerClassName = WINDOW_DEFAULTS.footerClassName,
    style,
    initialPosition = null,
    initialSize = null,
    footerAlign = WINDOW_DEFAULTS.footerAlign,
    open = WINDOW_DEFAULTS.open,
    noPadding = WINDOW_DEFAULTS.noPadding,
    unstyled = WINDOW_DEFAULTS.unstyled,
}, ref) => {
    const {
        isOpen, isMinimized, isMaximized, isFocused, isDragging, isResizing,
        zIndex, position, dimensions, windowRef,
        handleDragStart, handleResizeStart,
        handleClose, handleMinimize, handleMaximize, handleWindowClick,
    } = useWindowState(
        open, draggable, resizable,
        onClose, onMinimize, onMaximize, onFocus,
        initialPosition, initialSize,
    );

    if (!isOpen) return null;

    const windowCls = buildWindowClasses(
        osStyle, size, modal,
        isMaximized, isMinimized, isFocused, isDragging, isResizing,
        className, unstyled,
    );
    const bodyCls = buildWindowBodyClasses(noPadding, bodyClassName);
    const footerCls = buildWindowFooterClasses(footerAlign, footerClassName);
    const windowStyle = buildWindowStyle(style, position, dimensions, isMaximized, zIndex);

    // ─── Control buttons ────────────────────────────────────────────────────

    const renderMacosButtons = () => (
        <div className={WINDOW_CLASSES.titlebarLeft}>
            {closable && (
                <button className={`${WINDOW_CLASSES.controlBtn} ${WINDOW_CLASSES.controlClose}`}
                    onClick={handleClose} aria-label="Cerrar" title="Cerrar" type="button">
                    <span>×</span>
                </button>
            )}
            {minimizable && (
                <button className={`${WINDOW_CLASSES.controlBtn} ${WINDOW_CLASSES.controlMinimize}`}
                    onClick={handleMinimize} aria-label="Minimizar" title="Minimizar" type="button">
                    <span>−</span>
                </button>
            )}
            {maximizable && (
                <button className={`${WINDOW_CLASSES.controlBtn} ${WINDOW_CLASSES.controlMaximize}`}
                    onClick={handleMaximize} aria-label={isMaximized ? 'Restaurar' : 'Maximizar'}
                    title={isMaximized ? 'Restaurar' : 'Maximizar'} type="button">
                    <span>+</span>
                </button>
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
            </div>
            <div className={WINDOW_CLASSES.titlebarRight}>
                {minimizable && (
                    <button className={`${WINDOW_CLASSES.controlBtn} ${WINDOW_CLASSES.controlMinimize}`}
                        onClick={handleMinimize} aria-label="Minimizar" title="Minimizar" type="button">
                        <MinimizeIcon />
                    </button>
                )}
                {maximizable && (
                    <button className={`${WINDOW_CLASSES.controlBtn} ${WINDOW_CLASSES.controlMaximize}`}
                        onClick={handleMaximize} aria-label={isMaximized ? 'Restaurar' : 'Maximizar'}
                        title={isMaximized ? 'Restaurar' : 'Maximizar'} type="button">
                        {isMaximized ? <RestoreIcon /> : <MaximizeIcon />}
                    </button>
                )}
                {closable && (
                    <button className={`${WINDOW_CLASSES.controlBtn} ${WINDOW_CLASSES.controlClose}`}
                        onClick={handleClose} aria-label="Cerrar" title="Cerrar" type="button">
                        <CloseIcon />
                    </button>
                )}
            </div>
        </>
    );

    // ─── Resize handles ─────────────────────────────────────────────────────

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

    // ─── Footer ─────────────────────────────────────────────────────────────

    const renderFooter = () => {
        if (!footer && (!buttons || buttons.length === 0)) return null;
        return (
            <div className={footerCls}>
                {footer ?? buttons.map(({ key, text, children: btnChildren, ...rest }, index) => (
                    <Button key={key as string ?? `window-btn-${index}`} {...rest}>
                        {text ?? btnChildren}
                    </Button>
                ))}
            </div>
        );
    };

    // ─── JSX ────────────────────────────────────────────────────────────────

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

            <div className={bodyCls}>{children}</div>

            {renderFooter()}
            {renderResizeHandles()}
        </div>
    );

    if (modal) {
        return <div className={WINDOW_CLASSES.overlay}>{windowContent}</div>;
    }

    return windowContent;
});

Window.displayName = 'Window';

export default Window;
