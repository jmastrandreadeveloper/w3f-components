import React, { forwardRef, useRef, useCallback } from 'react';
import { X } from 'lucide-react';
import type { DrawerProps } from './Drawer.types';
import { DRAWER_DEFAULTS, DRAWER_CLASSES } from './Drawer.constants';
import { buildDrawerClasses, buildDrawerSizeStyle } from './Drawer.utils';
import {
    useDrawerAnimation,
    useDrawerEscKey,
    useDrawerBodyScroll,
    useDrawerFocusTrap,
} from './Drawer.hooks';

/**
 * Drawer Component - W3F Framework
 *
 * Panel lateral/superior/inferior deslizable. Soporta variantes temporal,
 * persistente y permanente. Compatible con contenido anidado, Form y LiveForm.
 *
 * @example
 * // Temporal (modal)
 * <Drawer open={open} onClose={() => setOpen(false)}>
 *   <p>Contenido del drawer</p>
 * </Drawer>
 *
 * @example
 * // Con formulario integrado
 * <Drawer open={open} onClose={handleClose} anchor="right" width={400}>
 *   <Form initialValues={{ name: '' }} onSubmit={handleSubmit}>
 *     <Input name="name" label="Nombre" />
 *     <Button type="submit">Guardar</Button>
 *   </Form>
 * </Drawer>
 */
const Drawer = forwardRef<HTMLDivElement, DrawerProps>(({
    open = DRAWER_DEFAULTS.open,
    onClose,
    anchor = DRAWER_DEFAULTS.anchor,
    variant = DRAWER_DEFAULTS.variant,
    width = DRAWER_DEFAULTS.width,
    height = DRAWER_DEFAULTS.height,
    showBackdrop = DRAWER_DEFAULTS.showBackdrop,
    showCloseButton = DRAWER_DEFAULTS.showCloseButton,
    closeOnBackdropClick = DRAWER_DEFAULTS.closeOnBackdropClick,
    closeOnEsc = DRAWER_DEFAULTS.closeOnEsc,
    color = DRAWER_DEFAULTS.color,
    unstyled = DRAWER_DEFAULTS.unstyled,
    className = DRAWER_DEFAULTS.className,
    children,
    ...props
}, ref) => {
    const drawerRef = useRef<HTMLElement>(null);

    const { mounted, visible } = useDrawerAnimation(open, variant);

    useDrawerEscKey(open, closeOnEsc, variant, onClose as any);
    useDrawerBodyScroll(open, variant);
    useDrawerFocusTrap(open, variant, drawerRef);

    const handleBackdropClick = useCallback(
        (e: React.MouseEvent) => {
            if (closeOnBackdropClick && onClose) onClose(e as any, 'backdropClick');
        },
        [closeOnBackdropClick, onClose],
    );

    const handleCloseButton = useCallback(
        (e: React.MouseEvent) => {
            if (onClose) onClose(e as any, 'closeButton');
        },
        [onClose],
    );

    const drawerCls = buildDrawerClasses(anchor, variant, color, visible, open, className, unstyled);
    const sizeStyle = buildDrawerSizeStyle(anchor, width, height);

    // Permanente: siempre visible, sin backdrop
    if (variant === 'permanent') {
        return (
            <aside className={drawerCls} style={sizeStyle} ref={(node) => {
                (drawerRef as React.MutableRefObject<HTMLElement | null>).current = node;
                if (typeof ref === 'function') ref(node);
                else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node as unknown as HTMLDivElement;
            }} {...props}>
                <div className={DRAWER_CLASSES.content}>{children}</div>
            </aside>
        );
    }

    // Persistente: sin backdrop, desplaza el contenido
    if (variant === 'persistent') {
        return (
            <aside className={drawerCls} style={sizeStyle} ref={(node) => {
                (drawerRef as React.MutableRefObject<HTMLElement | null>).current = node;
                if (typeof ref === 'function') ref(node);
                else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node as unknown as HTMLDivElement;
            }} {...props}>
                {showCloseButton && (
                    <button
                        className={DRAWER_CLASSES.close}
                        onClick={handleCloseButton}
                        aria-label="Cerrar"
                    >
                        <X size={20} />
                    </button>
                )}
                <div className={DRAWER_CLASSES.content}>{children}</div>
            </aside>
        );
    }

    // Temporal (por defecto): backdrop + overlay animado
    if (!mounted) return null;

    return (
        <div
            ref={ref}
            className={`${DRAWER_CLASSES.root} ${visible && open ? DRAWER_CLASSES.rootOpen : ''}`}
        >
            {showBackdrop && (
                <div
                    className={DRAWER_CLASSES.backdrop}
                    onClick={handleBackdropClick}
                    aria-hidden="true"
                />
            )}
            <aside
                className={drawerCls}
                style={sizeStyle}
                ref={drawerRef}
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                {...props}
            >
                {showCloseButton && (
                    <button
                        className={DRAWER_CLASSES.close}
                        onClick={handleCloseButton}
                        aria-label="Cerrar"
                    >
                        <X size={20} />
                    </button>
                )}
                <div className={DRAWER_CLASSES.content}>{children}</div>
            </aside>
        </div>
    );
});

Drawer.displayName = 'Drawer';

export default Drawer;
export { Drawer };
