import React, { useCallback, useImperativeHandle, useMemo } from 'react';
import type { RippleProps, RippleRef } from './Ripple.types';
import { RIPPLE_DEFAULTS } from './Ripple.constants';
import { buildRippleClasses } from './Ripple.utils';
import { useRipple } from './Ripple.hooks';

export type { RippleColor, RippleAnimation, RippleProps, RippleRef, UseRippleOptions, UseRippleReturn } from './Ripple.types';
export { useRipple } from './Ripple.hooks';

const Ripple = React.forwardRef<RippleRef, RippleProps>(({
  children,
  className = '',
  color,
  disabled = false,
  unbounded = false,
  centered = false,
  radius,
  animation,
  flat = false,
  role = 'button',
  tabIndex = 0,
  onClick,
  ...rest
}, ref) => {

  const { containerRef, createRipple, clearRipples } = useRipple({
    disabled,
    centered,
    unbounded,
    radius,
    enterDuration: animation?.enterDuration ?? RIPPLE_DEFAULTS.enterDuration,
    exitDuration: animation?.exitDuration ?? RIPPLE_DEFAULTS.exitDuration,
  });

  // Exponer métodos imperativos via ref
  useImperativeHandle(ref, () => ({
    launch: (x?: number, y?: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      createRipple({
        clientX: x ?? rect.left + rect.width / 2,
        clientY: y ?? rect.top + rect.height / 2,
      });
    },
    fadeOutAll: clearRipples,
  }), [containerRef, createRipple, clearRipples]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    createRipple(e);
    onClick?.(e);
  }, [createRipple, onClick]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        createRipple({
          clientX: rect.left + rect.width / 2,
          clientY: rect.top + rect.height / 2,
        });
      }
      onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
    }
  }, [containerRef, createRipple, onClick]);

  const containerClasses = useMemo(
    () => buildRippleClasses(flat, disabled, className),
    [flat, disabled, className]
  );

  return (
    <div
      ref={containerRef}
      className={containerClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={role}
      tabIndex={disabled ? -1 : tabIndex}
      aria-disabled={disabled}
      data-ripple-color={color}
      {...rest}
    >
      <div className="w3f-ripple-content">
        {children}
      </div>
    </div>
  );
});

Ripple.displayName = 'Ripple';

export { Ripple };
export default Ripple;
