import React, { useMemo } from 'react';
import { createPortal } from 'react-dom';
import ProgressSpinner from '../../DATADISPLAY/ProgressSpinner/ProgressSpinner';
import type { BackdropProps } from './Backdrop.types';
import { BACKDROP_DEFAULTS, BACKDROP_Z_INDEX } from './Backdrop.constants';
import { buildBackdropClasses } from './Backdrop.utils';
import { useScrollLock } from './Backdrop.hooks';

export type { BackdropProps, SpinnerColor, SpinnerSize, UseBackdropResult } from './Backdrop.types';
export { useBackdrop, useScrollLock } from './Backdrop.hooks';

const Backdrop = React.forwardRef<HTMLDivElement, BackdropProps>(({
  open = false,
  children,
  invisible = BACKDROP_DEFAULTS.invisible,
  onClick,
  transitionDuration = BACKDROP_DEFAULTS.transitionDuration,
  className,
  sx,
  component: Component = 'div',
  showSpinner = BACKDROP_DEFAULTS.showSpinner,
  spinnerColor = BACKDROP_DEFAULTS.spinnerColor,
  spinnerSize = BACKDROP_DEFAULTS.spinnerSize,
  ...rest
}, ref) => {

  useScrollLock(open);

  const backdropClasses = useMemo(
    () => buildBackdropClasses(open, invisible, className),
    [open, invisible, className]
  );

  const inlineStyles: React.CSSProperties = useMemo(() => ({
    transitionDuration: `${transitionDuration}ms`,
    ...sx,
  }), [transitionDuration, sx]);

  // No renderizar si no está abierto y no hay transición activa
  if (!open) return null;

  const content = (
    <Component
      ref={ref}
      className={backdropClasses}
      onClick={onClick}
      role="presentation"
      style={inlineStyles}
      {...rest}
    >
      {children || (showSpinner && (
        <ProgressSpinner
          mode="indeterminate"
          color={spinnerColor}
          size={spinnerSize}
        />
      ))}
    </Component>
  );

  return createPortal(content, document.body);
});

Backdrop.displayName = 'Backdrop';

export { Backdrop };
export default Backdrop;
