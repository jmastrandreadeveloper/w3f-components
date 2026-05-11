import React from 'react';
import type {
    FloatingActionButtonProps,
    FloatingActionButtonGroupProps,
} from './FloatingActionButton.types';
import { FAB_DEFAULTS, FAB_CLASSES } from './FloatingActionButton.constants';
import {
    buildFabClasses,
    buildFabStyle,
    buildFabMessageStyle,
    buildFabGroupClasses,
} from './FloatingActionButton.utils';
import { useFabFormContext } from './FloatingActionButton.hooks';

/**
 * FloatingActionButton Component - W3F Framework
 *
 * Botón de acción flotante (FAB) con soporte para Form y LiveForm.
 * Posicionado de forma fija en pantalla. Puede mostrar texto (FAB extended).
 *
 * @example
 * // FAB básico
 * <FloatingActionButton onClick={handleAdd} position="bottom-right">
 *   <Plus size={24} />
 * </FloatingActionButton>
 *
 * @example
 * // FAB extended con texto
 * <FloatingActionButton text="Guardar" color="success" extended>
 *   <Save size={20} />
 * </FloatingActionButton>
 *
 * @example
 * // Dentro de un Form como submit
 * <Form onSubmit={handleSubmit}>
 *   <Input name="title" />
 *   <FloatingActionButton type="submit" text="Publicar" color="primary">
 *     <Send size={20} />
 *   </FloatingActionButton>
 * </Form>
 */
const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
    name,
    onClick,
    children,
    text,
    label,
    title = FAB_DEFAULTS.title,
    offset = FAB_DEFAULTS.offset,
    color = FAB_DEFAULTS.color,
    size = FAB_DEFAULTS.size,
    extended = FAB_DEFAULTS.extended,
    position = FAB_DEFAULTS.position,
    mobileIconOnly = FAB_DEFAULTS.mobileIconOnly,
    disabled = FAB_DEFAULTS.disabled,
    type = FAB_DEFAULTS.type,
    error,
    helperText,
    className = FAB_DEFAULTS.className,
    unstyled = FAB_DEFAULTS.unstyled,
    ...props
}) => {
    const formContext = useFabFormContext();
    const isFormControlled = !!(formContext && name);

    // Obtener error del contexto si está disponible
    const fabError = isFormControlled ? formContext!.errors[name!] : error;
    const hasError = Boolean(fabError);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled) return;

        // Integración con LiveForm: trackear clicks o incrementar contador
        if (isFormControlled && formContext && name) {
            const currentValue = formContext.values[name] ?? 0;
            if (typeof currentValue === 'number') {
                formContext.setFieldValue(name, currentValue + 1);
            } else {
                formContext.setFieldValue(name, true);
            }
        }

        if (onClick) onClick(e);
    };

    const finalTitle = text || title;
    const classes = buildFabClasses(
        size,
        color,
        position,
        extended,
        Boolean(text),
        mobileIconOnly,
        disabled,
        hasError,
        className,
        unstyled,
    );
    const fabStyle = buildFabStyle(position, offset);

    return (
        <>
            <button
                className={classes}
                onClick={handleClick}
                style={fabStyle}
                title={finalTitle}
                aria-label={finalTitle}
                aria-invalid={hasError}
                aria-describedby={
                    fabError
                        ? `${name}-error`
                        : helperText
                        ? `${name}-helper`
                        : undefined
                }
                disabled={disabled}
                type={type}
                {...props}
            >
                {children && (
                    <span className={FAB_CLASSES.icon}>{children}</span>
                )}
                {text && <span className={FAB_CLASSES.text}>{text}</span>}
                {label && <span className={FAB_CLASSES.label}>{label}</span>}
            </button>

            {/* Mensajes de error o ayuda posicionados junto al FAB */}
            {(fabError || helperText) && (
                <div
                    className={FAB_CLASSES.message}
                    style={buildFabMessageStyle(position, offset)}
                >
                    {fabError ? (
                        <p
                            id={`${name}-error`}
                            className="w3f-input-message w3f-input-message--error w3f-fab-message__bubble"
                            role="alert"
                        >
                            {fabError}
                        </p>
                    ) : helperText ? (
                        <p
                            id={`${name}-helper`}
                            className="w3f-input-message w3f-input-message--helper w3f-fab-message__bubble w3f-fab-message__bubble--helper"
                        >
                            {helperText}
                        </p>
                    ) : null}
                </div>
            )}
        </>
    );
};

FloatingActionButton.displayName = 'FloatingActionButton';

/**
 * FloatingActionButtonGroup Component - W3F Framework
 *
 * Contenedor para Speed Dial: agrupa FABs secundarios que se despliegan
 * animadamente cuando isOpen = true.
 *
 * @example
 * <FloatingActionButtonGroup isOpen={isOpen} position="bottom-right">
 *   <FloatingActionButton label="Editar" size="sm" className="w3f-fab--secondary-action">
 *     <Edit size={20} />
 *   </FloatingActionButton>
 *   <FloatingActionButton label="Eliminar" size="sm" color="danger" className="w3f-fab--secondary-action">
 *     <Trash size={20} />
 *   </FloatingActionButton>
 * </FloatingActionButtonGroup>
 */
export const FloatingActionButtonGroup: React.FC<FloatingActionButtonGroupProps> = ({
    children,
    isOpen = false,
    offset = FAB_DEFAULTS.offset,
    position = FAB_DEFAULTS.position,
    className = '',
}) => {
    const classes = buildFabGroupClasses(isOpen, className);

    const groupStyle: React.CSSProperties = {
        bottom: `${offset}px`,
        ...(position.includes('left') && {
            left: 'var(--w3f-space-6)',
            right: 'auto',
        }),
        ...(position.includes('top') && {
            top: `${offset}px`,
            bottom: 'auto',
        }),
    };

    return (
        <div className={classes} style={groupStyle}>
            {children}
        </div>
    );
};

FloatingActionButtonGroup.displayName = 'FloatingActionButtonGroup';

export { FloatingActionButton };
export default FloatingActionButton;
