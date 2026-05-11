import React, { forwardRef } from 'react';
import type { ButtonProps } from './Button.types';
import { BUTTON_DEFAULTS, BUTTON_CLASSES } from './Button.constants';
import { buildButtonClasses } from './Button.utils';
import { useButtonFormContext } from './Button.hooks';
import { useBridgeBind } from '@w3f/bridge';

/**
 * Button Component - W3F Framework
 *
 * Botón versátil compatible con Form y LiveForm mediante Context API.
 * Soporta variantes, colores semánticos, tamaños e iconos.
 *
 * @example
 * // Uso independiente
 * <Button variant="raised" color="primary" onClick={handleClick}>Guardar</Button>
 *
 * @example
 * // Dentro de un Form como submit
 * <Form onSubmit={handleSubmit}>
 *   <Input name="email" />
 *   <Button type="submit" color="success">Enviar</Button>
 * </Form>
 *
 * @example
 * // Con icono
 * <Button icon={<Plus size={16} />} iconPosition="left" variant="outline">
 *   Agregar
 * </Button>
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            text,
            onClick,
            type = BUTTON_DEFAULTS.type,
            variant = BUTTON_DEFAULTS.variant,
            color = BUTTON_DEFAULTS.color,
            size = BUTTON_DEFAULTS.size,
            fullWidth = BUTTON_DEFAULTS.fullWidth,
            icon = null,
            iconPosition = BUTTON_DEFAULTS.iconPosition,
            className = BUTTON_DEFAULTS.className,
            disabled = BUTTON_DEFAULTS.disabled,
            unstyled = BUTTON_DEFAULTS.unstyled,
            bindId,
            ...props
        },
        ref,
    ) => {
        const formContext = useButtonFormContext();
        const isFormControlled = !!formContext;
        const { dispatch } = useBridgeBind({ bindId });

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            dispatch('click');
            if (onClick) onClick(e);
        };

        const effectiveType = isFormControlled && type === 'button' ? 'button' : type;

        const classes = buildButtonClasses(variant, color, size, fullWidth, className, unstyled);
        const content = children ?? text;

        return (
            <button
                ref={ref}
                type={effectiveType}
                className={classes}
                onClick={handleClick}
                disabled={disabled}
                {...props}
            >
                <span className={BUTTON_CLASSES.content}>
                    {icon && iconPosition === 'left' && (
                        <span className={BUTTON_CLASSES.icon}>{icon}</span>
                    )}
                    <span className={BUTTON_CLASSES.text}>{content}</span>
                    {icon && iconPosition === 'right' && (
                        <span className={BUTTON_CLASSES.icon}>{icon}</span>
                    )}
                </span>
            </button>
        );
    },
);

Button.displayName = 'Button';

export { Button };
export default Button;
