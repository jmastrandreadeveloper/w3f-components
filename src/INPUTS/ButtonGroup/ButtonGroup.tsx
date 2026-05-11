import React from 'react';
import type { ButtonGroupProps } from './ButtonGroup.types';
import { BUTTON_GROUP_DEFAULTS } from './ButtonGroup.constants';
import { buildButtonGroupClasses, getButtonPosition } from './ButtonGroup.utils';
import { useButtonGroupFormContext } from './ButtonGroup.hooks';

/**
 * ButtonGroup Component - W3F Framework
 *
 * Agrupa botones visualmente y hereda props a los hijos.
 * Compatible con Form y LiveForm mediante Context API.
 * Usa data-attributes para aplicar los bordes redondeados del CSS.
 *
 * @example
 * // Grupo horizontal básico
 * <ButtonGroup variant="outline" color="primary">
 *   <Button>Anterior</Button>
 *   <Button>Siguiente</Button>
 * </ButtonGroup>
 *
 * @example
 * // Grupo vertical con colores semánticos
 * <ButtonGroup orientation="vertical" color="success">
 *   <Button>Guardar</Button>
 *   <Button color="danger">Cancelar</Button>
 * </ButtonGroup>
 *
 * @example
 * // Dentro de un Form
 * <Form onSubmit={handleSubmit}>
 *   <ButtonGroup>
 *     <Button type="submit">Enviar</Button>
 *     <Button type="reset">Limpiar</Button>
 *   </ButtonGroup>
 * </Form>
 */
const ButtonGroup: React.FC<ButtonGroupProps> = ({
    children,
    variant = BUTTON_GROUP_DEFAULTS.variant,
    color = BUTTON_GROUP_DEFAULTS.color,
    size = BUTTON_GROUP_DEFAULTS.size,
    orientation = BUTTON_GROUP_DEFAULTS.orientation,
    fullWidth = BUTTON_GROUP_DEFAULTS.fullWidth,
    disabled = BUTTON_GROUP_DEFAULTS.disabled,
    responsive = BUTTON_GROUP_DEFAULTS.responsive,
    unstyled = BUTTON_GROUP_DEFAULTS.unstyled,
    className = BUTTON_GROUP_DEFAULTS.className,
    ...props
}) => {
    useButtonGroupFormContext(); // Detectar contexto (puede ser usado en extensiones)

    const validChildren = React.Children.toArray(children).filter(
        React.isValidElement,
    ) as React.ReactElement<any>[];
    const total = validChildren.length;

    const modifiedChildren = validChildren.map((child, index) => {
        const position = getButtonPosition(index, total);
        return React.cloneElement(child, {
            variant: child.props.variant ?? variant,
            color: child.props.color ?? color,
            size: child.props.size ?? size,
            fullWidth: orientation === 'vertical' ? true : (child.props.fullWidth ?? false),
            disabled: disabled || (child.props.disabled ?? false),
            // Forzar type="button" si no se especifica, para evitar submits accidentales
            type: child.props.type ?? 'button',
            // Atributos de datos para el CSS de border-radius
            'data-button-group-child': true,
            'data-button-position': position,
        });
    });

    const classes = buildButtonGroupClasses(orientation, fullWidth, disabled, responsive, className, unstyled);

    return (
        <div
            className={classes}
            role="group"
            aria-label={props['aria-label'] ?? 'button group'}
            aria-orientation={orientation}
            {...props}
        >
            {modifiedChildren}
        </div>
    );
};

ButtonGroup.displayName = 'ButtonGroup';

export { ButtonGroup };
export default ButtonGroup;
