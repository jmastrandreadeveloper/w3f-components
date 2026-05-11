import React, { forwardRef, useId } from 'react';
import type { FormFieldProps } from './FormField.types';
import { FORM_FIELD_CLASSES, FORM_FIELD_DEFAULTS } from './FormField.constants';
import { buildFormFieldClasses } from './FormField.utils';
import { useFormFieldContext } from './FormField.hooks';
import { useBridgeBind } from '@w3f/bridge';

/**
 * FormField - Wrapper de campo para formularios.
 *
 * Proporciona label, mensaje de error/helper y estructura visual consistente.
 * Cuando se usa dentro de Form/LiveForm, puede leer errores automáticamente si
 * se provee el prop `name`.
 *
 * @example
 * // Uso básico
 * <FormField label="Nombre" required>
 *   <Input name="name" />
 * </FormField>
 *
 * @example
 * // Dentro de Form con validación automática
 * <Form initialValues={{ email: '' }} validationRules={{ email: { required: true } }}>
 *   <FormField name="email" label="Email">
 *     <Input name="email" />
 *   </FormField>
 * </Form>
 *
 * @example
 * // Layout inline
 * <FormField label="Activo" layout="inline">
 *   <SlideToggle name="active" />
 * </FormField>
 */
const FormField = forwardRef<HTMLDivElement, FormFieldProps>(({
    label,
    name,
    error: propError,
    helperText,
    required = false,
    disabled = false,
    layout = 'stacked',
    children,
    className = '',
    unstyled = FORM_FIELD_DEFAULTS.unstyled,
    bindId,
}, ref) => {
    const formContext = useFormFieldContext();
    const labelId = useId();
    useBridgeBind({ bindId });

    const isFormControlled = !!(formContext && name);
    const fieldError = isFormControlled ? formContext.errors[name!] : propError;
    const hasError = Boolean(fieldError);

    return (
        <div
            ref={ref}
            className={buildFormFieldClasses(layout, hasError, disabled, className, unstyled)}
            role="group"
            aria-labelledby={label ? labelId : undefined}
        >
            {label && (
                <label id={labelId} className={FORM_FIELD_CLASSES.label}>
                    {label}
                    {required && (
                        <span className={FORM_FIELD_CLASSES.required} aria-hidden="true">
                            {' '}*
                        </span>
                    )}
                </label>
            )}

            <div className={FORM_FIELD_CLASSES.content}>{children}</div>

            {(fieldError || helperText) && (
                <div>
                    {fieldError ? (
                        <p
                            className={`${FORM_FIELD_CLASSES.message} ${FORM_FIELD_CLASSES.messageError}`}
                            role="alert"
                        >
                            {fieldError}
                        </p>
                    ) : helperText ? (
                        <p
                            className={`${FORM_FIELD_CLASSES.message} ${FORM_FIELD_CLASSES.messageHelper}`}
                        >
                            {helperText}
                        </p>
                    ) : null}
                </div>
            )}
        </div>
    );
});

FormField.displayName = 'FormField';
export { FormField };
export default FormField;
