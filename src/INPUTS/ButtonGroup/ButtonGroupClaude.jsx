import React from 'react';
import { useFormContext } from '../Form/Form.jsx';

const ButtonGroup = ({
  children,
  variant = 'raised',
  color = 'primary',
  size = 'md',
  orientation = 'horizontal',
  fullWidth = false,
  className = '',
  disabled = false,
  exclusive = false,
  ...props
}) => {
  const formContext = useFormContext();

  // ✅ Determinar si está dentro de un Form/LiveForm
  const isFormControlled = !!formContext;

  // Construcción de clases base del grupo
  const classes = [
    'w3f-button-group',
    `w3f-button-group--${orientation}`,
    fullWidth && 'w3f-button-group--full-width',
    disabled && 'w3f-button-group--disabled',
    className
  ].filter(Boolean).join(' ');

  // ✅ Clonamos los hijos para inyectarles las props del grupo + contexto
  const modifiedChildren = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) {
      return child;
    }

    // Detectar si el child es un Button
    const isButton = child.type?.displayName === 'Button' ||
      child.type?.name === 'Button' ||
      child.props?.className?.includes('w3f-button');

    if (!isButton) {
      return child;
    }

    // ✅ Props heredadas del grupo
    const inheritedProps = {
      // Heredar props visuales del grupo (respetando props explícitas del hijo)
      variant: child.props.variant ?? variant,
      color: child.props.color ?? color,
      size: child.props.size ?? size,

      // fullWidth en vertical es opcional, no forzado
      fullWidth: orientation === 'vertical'
        ? (child.props.fullWidth ?? true)
        : (child.props.fullWidth ?? false),

      // Propagar disabled del grupo
      disabled: child.props.disabled || disabled,

      // ✅ IMPORTANTE: Si el botón NO tiene type explícito y está en un Form,
      // forzar type="button" para evitar submits accidentales del grupo
      type: child.props.type ?? (isFormControlled ? 'button' : 'button'),

      // Añadir data-attributes para identificación en CSS
      'data-button-group-child': true,
      'data-button-position': index === 0 ? 'first' :
        index === React.Children.count(children) - 1 ? 'last' :
          'middle',
    };

    // ✅ Manejo del comportamiento exclusive
    if (exclusive) {
      inheritedProps.onClick = (e) => {
        // Ejecutar el onClick original del botón hijo si existe
        if (child.props.onClick) {
          child.props.onClick(e);
        }
        // Aquí podrías manejar la lógica de selección única si lo necesitas
      };
    }

    return React.cloneElement(child, inheritedProps);
  });

  return (
    <div
      className={classes}
      role="group"
      aria-label={props['aria-label'] || 'button group'}
      aria-orientation={orientation}
      {...props}
    >
      {modifiedChildren}
    </div>
  );
};

// Para ayudar en la detección del tipo
ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup;