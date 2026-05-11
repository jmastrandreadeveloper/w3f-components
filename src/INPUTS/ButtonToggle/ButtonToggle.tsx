import React from 'react';
import type { ButtonToggleProps } from './ButtonToggle.types';
import { BUTTON_TOGGLE_DEFAULTS } from './ButtonToggle.constants';
import {
    buildButtonToggleClasses,
    isOptionActive,
    computeNewSelection,
} from './ButtonToggle.utils';
import { useButtonToggle } from './ButtonToggle.hooks';
import Button from '../Button/Button';

/**
 * ButtonToggle Component - W3F Framework
 *
 * Grupo de botones de selección (simple o múltiple).
 * Compatible con Form y LiveForm mediante Context API.
 *
 * @example
 * // Selección simple
 * <ButtonToggle
 *   options={[
 *     { value: 'day', label: 'Día' },
 *     { value: 'week', label: 'Semana' },
 *     { value: 'month', label: 'Mes' },
 *   ]}
 *   onSelect={(val) => setView(val)}
 * />
 *
 * @example
 * // Multi-selección dentro de un Form
 * <Form initialValues={{ tags: [] }}>
 *   <ButtonToggle
 *     name="tags"
 *     multiple
 *     options={[
 *       { value: 'react', label: 'React' },
 *       { value: 'vue', label: 'Vue' },
 *       { value: 'svelte', label: 'Svelte' },
 *     ]}
 *   />
 * </Form>
 */
const ButtonToggle: React.FC<ButtonToggleProps> = ({
    options = BUTTON_TOGGLE_DEFAULTS.options as any[],
    onSelect,
    value,
    defaultValue,
    multiple = BUTTON_TOGGLE_DEFAULTS.multiple,
    allowDeselect = BUTTON_TOGGLE_DEFAULTS.allowDeselect,
    color = BUTTON_TOGGLE_DEFAULTS.color,
    size = BUTTON_TOGGLE_DEFAULTS.size,
    disabled = BUTTON_TOGGLE_DEFAULTS.disabled,
    unstyled = BUTTON_TOGGLE_DEFAULTS.unstyled,
    ariaLabel,
    className = BUTTON_TOGGLE_DEFAULTS.className,
    name,
    onChange,
    ...props
}) => {
    const { formContext, isFormControlled, currentValue, setInternalValue } =
        useButtonToggle({ name, multiple, defaultValue, value });

    const handleSelect = (optionValue: string | number) => {
        const newSelection = computeNewSelection(
            optionValue,
            currentValue,
            multiple,
            allowDeselect,
        );

        if (isFormControlled && formContext) {
            formContext.handleChange({
                target: {
                    name: name!,
                    value: newSelection,
                    type: multiple ? 'select-multiple' : 'select',
                },
            } as any);
            formContext.handleBlur({
                target: { name: name!, value: newSelection },
            } as any);
        } else if (onChange) {
            onChange({ target: { name, value: newSelection } });
        } else if (value === undefined) {
            setInternalValue(newSelection);
        }

        if (onSelect) onSelect(newSelection);
    };

    if (!options.length) return null;

    const classes = buildButtonToggleClasses(className, unstyled);

    return (
        <div
            className={classes}
            role="group"
            aria-label={ariaLabel ?? (name ? `${name} toggle` : 'button toggle')}
            {...props}
        >
            {options.map((option) => {
                const active = isOptionActive(option.value, currentValue, multiple);
                return (
                    <Button
                        key={option.value}
                        type="button"
                        variant={active ? 'raised' : 'outline'}
                        color={color}
                        size={size}
                        disabled={disabled || option.disabled}
                        onClick={() => handleSelect(option.value)}
                        aria-pressed={active}
                    >
                        {option.label}
                    </Button>
                );
            })}
        </div>
    );
};

ButtonToggle.displayName = 'ButtonToggle';

export { ButtonToggle };
export default ButtonToggle;
