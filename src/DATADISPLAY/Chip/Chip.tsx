import React from 'react';
import type { ChipProps } from './Chip.types';
import { CHIP_DEFAULTS } from './Chip.constants';
import { buildChipClasses } from './Chip.utils';
import { useBridgeBind } from '@w3f/bridge';

const Chip = React.forwardRef<HTMLDivElement, ChipProps>(({
  label,
  variant,
  onClose,
  disabled = CHIP_DEFAULTS.disabled,
  onKeyDown,
  onFocus,
  onBlur,
  onClick,
  isFocused = CHIP_DEFAULTS.isFocused,
  className,
  style,
  unstyled = CHIP_DEFAULTS.unstyled,
  bindId,
}, ref) => {
  const { dispatch } = useBridgeBind({ bindId });
  const chipClasses = buildChipClasses(disabled, isFocused, className, unstyled, variant);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ((e.key === 'Enter' || e.key === 'Delete' || e.key === 'Backspace') && onClose && !disabled) {
      e.preventDefault();
      e.stopPropagation();
      onClose();
    }
    onKeyDown?.(e);
  };

  return (
    <div
      ref={ref}
      className={chipClasses}
      tabIndex={disabled ? -1 : 0}
      role="button"
      aria-label={`${label}${onClose ? ', presione Enter o Suprimir para eliminar' : ''}`}
      aria-disabled={disabled}
      onKeyDown={handleKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={(e) => { onClick?.(e); dispatch('click'); }}
      style={style}
    >
      <span className="w3f-chip__label">{label}</span>

      {onClose && !disabled && (
        <span
          onClick={(e) => {
            e.stopPropagation();
            onClose();
            dispatch('change', { action: 'close' });
          }}
          className="w3f-chip-close"
          title="Eliminar"
          role="button"
          aria-label="Eliminar chip"
        >
          ×
        </span>
      )}
    </div>
  );
});

Chip.displayName = 'Chip';

export { Chip };
export default Chip;
