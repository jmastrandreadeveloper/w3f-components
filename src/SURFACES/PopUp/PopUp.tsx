import React, { forwardRef } from 'react';
import { createPortal } from 'react-dom';
import Card from '../../DATADISPLAY/Card/Card';
import Button from '../../INPUTS/Button/Button';
import type { PopUpProps } from './PopUp.types';
import { POPUP_DEFAULTS, POPUP_CLASSES } from './PopUp.constants';
import { usePopUpKeyboard } from './PopUp.hooks';
import { buildPopUpOverlayClasses, buildPopUpContainerClasses } from './PopUp.utils';

/**
 * PopUp — Diálogo modal que reutiliza la estética de Card.
 * Se renderiza en el root del DOM mediante createPortal.
 *
 * @example
 * <PopUp
 *   isOpen={open}
 *   onClose={() => setOpen(false)}
 *   title="Confirmar acción"
 *   onConfirm={handleConfirm}
 * >
 *   ¿Estás seguro de que deseas continuar?
 * </PopUp>
 */
export const PopUp = forwardRef<HTMLDivElement, PopUpProps>(({
    isOpen,
    onClose,
    title,
    subtitle,
    content,
    onConfirm,
    confirmText = POPUP_DEFAULTS.confirmText,
    cancelText = POPUP_DEFAULTS.cancelText,
    showCancel = POPUP_DEFAULTS.showCancel,
    variant = POPUP_DEFAULTS.variant,
    size = POPUP_DEFAULTS.size,
    closeOnOverlayClick = POPUP_DEFAULTS.closeOnOverlayClick,
    children,
    unstyled = POPUP_DEFAULTS.unstyled,
    className = POPUP_DEFAULTS.className,
    footerActions,
}, ref) => {
    usePopUpKeyboard(isOpen, onClose);

    if (!isOpen) return null;

    const defaultActions = (
        <>
            {showCancel && (
                <Button variant="text" color="gray" onClick={onClose}>
                    {cancelText}
                </Button>
            )}
            <Button variant="raised" color="primary" onClick={onConfirm ?? onClose}>
                {confirmText}
            </Button>
        </>
    );

    const popUpContent = (
        <div
            ref={ref}
            className={buildPopUpOverlayClasses(isOpen)}
            onClick={closeOnOverlayClick ? onClose : undefined}
        >
            <div
                className={buildPopUpContainerClasses(className, size, unstyled)}
                onClick={(e) => e.stopPropagation()}
            >
                <Card
                    title={title}
                    subtitle={subtitle}
                    variant={variant}
                    size={size}
                    fullWidth
                    content={content ?? children}
                    actions={footerActions ?? defaultActions}
                    actionsAlign="end"
                    className={POPUP_CLASSES.card}
                />
                <button
                    className={POPUP_CLASSES.closeBtn}
                    onClick={onClose}
                    aria-label="Close"
                >
                    &times;
                </button>
            </div>
        </div>
    );

    return createPortal(popUpContent, document.body);
});

PopUp.displayName = 'PopUp';

export default PopUp;
