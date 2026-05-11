import React, { forwardRef } from 'react';
import type { ToggleButtonProps, ToggleButtonGroupProps } from './ToggleButton.types';
import { buildToggleButtonClasses, buildToggleGroupClasses, isSelected } from './ToggleButton.utils';
import { useToggleGroup } from './ToggleButton.hooks';
import { TOGGLE_GROUP_CLASSES, TOGGLE_BUTTON_DEFAULTS, TOGGLE_GROUP_DEFAULTS } from './ToggleButton.constants';

// ─── ToggleButton ────────────────────────────────────────────────────

const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(({
    children,
    value,
    selected = TOGGLE_BUTTON_DEFAULTS.selected,
    onChange,
    color = TOGGLE_BUTTON_DEFAULTS.color,
    size = TOGGLE_BUTTON_DEFAULTS.size,
    fullWidth = TOGGLE_BUTTON_DEFAULTS.fullWidth,
    className = TOGGLE_BUTTON_DEFAULTS.className,
    disabled = TOGGLE_BUTTON_DEFAULTS.disabled,
    'aria-label': ariaLabel,
    role,
    'aria-checked': ariaChecked,
    unstyled = TOGGLE_BUTTON_DEFAULTS.unstyled,
    ...props
}, ref) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!disabled && onChange) {
            onChange(event, value);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if ((event.key === ' ' || event.key === 'Enter') && !disabled) {
            event.preventDefault();
            if (onChange) onChange(event, value);
        }
    };

    return (
        <button
            ref={ref}
            type="button"
            role={role ?? 'button'}
            className={buildToggleButtonClasses(selected, color, size, fullWidth, disabled, className, unstyled)}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            aria-pressed={role ? undefined : selected}
            aria-checked={ariaChecked}
            aria-label={ariaLabel}
            aria-disabled={disabled}
            disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            {...props}
        >
            {children}
        </button>
    );
});

ToggleButton.displayName = 'ToggleButton';

// ─── ToggleButtonGroup ───────────────────────────────────────────────

const ToggleButtonGroup = forwardRef<HTMLDivElement, ToggleButtonGroupProps>(({
    name,
    value,
    onChange,
    exclusive = TOGGLE_GROUP_DEFAULTS.exclusive,
    color = TOGGLE_GROUP_DEFAULTS.color,
    size = TOGGLE_GROUP_DEFAULTS.size,
    fullWidth = TOGGLE_GROUP_DEFAULTS.fullWidth,
    orientation = TOGGLE_GROUP_DEFAULTS.orientation,
    className = TOGGLE_GROUP_DEFAULTS.className,
    children,
    label,
    error: propError,
    helperText,
    required = TOGGLE_GROUP_DEFAULTS.required,
    disabled = TOGGLE_GROUP_DEFAULTS.disabled,
    'aria-label': ariaLabel,
    ...props
}, ref) => {
    const { currentValue, groupError, handleToggleChange } = useToggleGroup({
        name,
        value,
        onChange,
        exclusive,
        disabled,
    });

    const fieldError = name ? groupError : propError;
    const hasError = Boolean(fieldError);

    const validChildren = React.Children.toArray(children).filter(
        (child): child is React.ReactElement<ToggleButtonProps> => React.isValidElement(child),
    );

    return (
        <div ref={ref} className={TOGGLE_GROUP_CLASSES.wrapper}>
            {label && (
                <label className={TOGGLE_GROUP_CLASSES.label}>
                    {label}
                    {required && <span className={TOGGLE_GROUP_CLASSES.required}> *</span>}
                </label>
            )}

            <div
                className={buildToggleGroupClasses(orientation, fullWidth, hasError, disabled, className)}
                role={exclusive ? 'radiogroup' : 'group'}
                aria-label={ariaLabel || label}
                aria-required={required}
                aria-invalid={hasError}
                aria-describedby={
                    fieldError
                        ? `${name ?? 'tg'}-error`
                        : helperText
                          ? `${name ?? 'tg'}-helper`
                          : undefined
                }
                {...props}
            >
                {validChildren.map((child) => {
                    const buttonValue = child.props.value;
                    const selected = isSelected(buttonValue, currentValue as string | number | (string | number)[] | null, exclusive);

                    return React.cloneElement(child, {
                        key: String(buttonValue),
                        selected,
                        onChange: handleToggleChange,
                        color: child.props.color ?? color,
                        size: child.props.size ?? size,
                        fullWidth,
                        disabled: child.props.disabled || disabled,
                        role: exclusive ? 'radio' : 'checkbox',
                        'aria-checked': selected,
                    });
                })}
            </div>

            <div className={TOGGLE_GROUP_CLASSES.paddingX}>
                {fieldError ? (
                    <p
                        id={`${name ?? 'tg'}-error`}
                        className={`${TOGGLE_GROUP_CLASSES.message} ${TOGGLE_GROUP_CLASSES.messageError}`}
                        role="alert"
                    >
                        {fieldError}
                    </p>
                ) : helperText ? (
                    <p
                        id={`${name ?? 'tg'}-helper`}
                        className={`${TOGGLE_GROUP_CLASSES.message} ${TOGGLE_GROUP_CLASSES.messageHelper}`}
                    >
                        {helperText}
                    </p>
                ) : null}
            </div>

            {name && (
                <input
                    type="hidden"
                    name={name}
                    value={
                        exclusive
                            ? String(currentValue ?? '')
                            : JSON.stringify(currentValue)
                    }
                />
            )}
        </div>
    );
});

ToggleButtonGroup.displayName = 'ToggleButtonGroup';

export { ToggleButton, ToggleButtonGroup };
export default ToggleButtonGroup;
