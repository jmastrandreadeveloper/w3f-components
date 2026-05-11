import React, { forwardRef } from 'react';
import type { CheckboxProps } from './Checkbox.types';
import { CHECKBOX_DEFAULTS, CHECKBOX_CLASSES } from './Checkbox.constants';
import {
    buildCheckboxContainerClasses,
    buildCheckboxWrapperClasses,
    buildCheckboxInputClasses,
} from './Checkbox.utils';
import { useCheckbox } from './Checkbox.hooks';
import { useBridgeBind } from '@w3f/bridge';

/**
 * Checkbox Component - W3F Framework
 *
 * Checkbox personalizado compatible con Form y LiveForm mediante Context API.
 * Soporta contenido anidado que se muestra cuando está marcado.
 *
 * @example
 * // Uso independiente
 * <Checkbox label="Acepto términos" checked={accepted} onChange={setAccepted} />
 *
 * @example
 * // Con contenido anidado
 * <Checkbox label="Suscribirme a noticias">
 *   <Input name="email" label="Email de contacto" />
 * </Checkbox>
 *
 * @example
 * // Integrado con Form
 * <Form initialValues={{ terms: false }}>
 *   <Checkbox name="terms" label="Acepto los términos y condiciones">
 *     <p>Al aceptar, confirmas que leíste nuestras políticas.</p>
 *   </Checkbox>
 * </Form>
 */
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
    label,
    name,
    checked = CHECKBOX_DEFAULTS.checked,
    onChange,
    onBlur,
    disabled = CHECKBOX_DEFAULTS.disabled,
    children,
    className = CHECKBOX_DEFAULTS.className,
    ariaLabel,
    ariaDescribedBy,
    value,
    color = CHECKBOX_DEFAULTS.color,
    unstyled = CHECKBOX_DEFAULTS.unstyled,
    bindId,
    ...props
}, ref) => {
    const { formContext, isFormControlled, checkboxValue, setIsChecked, uniqueId } =
        useCheckbox({ name, checked });
    const { dispatch } = useBridgeBind({ bindId });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        const newChecked = e.target.checked;

        if (isFormControlled && formContext) {
            formContext.handleChange(e);
        } else {
            setIsChecked(newChecked);
        }

        dispatch('change', { value: newChecked });
        if (onChange) onChange(newChecked);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (isFormControlled && formContext) {
            formContext.handleBlur(e);
        }
        if (onBlur) onBlur(e);
    };

    return (
        <div className={buildCheckboxContainerClasses(className, unstyled)}>
            <div className={buildCheckboxWrapperClasses(disabled, unstyled)}>
                <input
                    ref={ref}
                    id={uniqueId}
                    type="checkbox"
                    name={name}
                    value={value}
                    className={buildCheckboxInputClasses(color, unstyled)}
                    checked={checkboxValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={disabled}
                    aria-label={ariaLabel}
                    aria-describedby={ariaDescribedBy}
                    aria-checked={checkboxValue}
                    {...props}
                />
                <label htmlFor={uniqueId} className={CHECKBOX_CLASSES.label}>
                    {label}
                </label>
            </div>

            {/* Contenido anidado: visible solo cuando está marcado */}
            {checkboxValue && children && (
                <div className={CHECKBOX_CLASSES.children}>{children}</div>
            )}
        </div>
    );
});

Checkbox.displayName = 'Checkbox';

export { Checkbox };
export default Checkbox;
