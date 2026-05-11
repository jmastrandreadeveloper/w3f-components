import type { FormValues, FormErrors, ValidationRule, ValidationRules } from './Form.types';
import { FORM_CLASSES } from './Form.constants';

/**
 * Construye las clases CSS del <form>.
 */
export function buildFormClasses(
    className?: string,
    isSubmitting?: boolean,
    unstyled?: boolean,
): string {
    const base = FORM_CLASSES.base;
    if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(' ');
    return [
        base,
        isSubmitting && FORM_CLASSES.submitting,
        className,
    ]
        .filter(Boolean)
        .join(' ');
}

/**
 * Extrae el valor de un evento de cambio según el tipo de input.
 */
export function getFieldValue(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
): any {
    const target = e.target as HTMLInputElement;
    const { type, checked, value } = target;
    if (type === 'checkbox') return checked;
    if (type === 'number' || type === 'range') return value === '' ? '' : Number(value);
    return value;
}

/**
 * Valida un campo individual contra su regla.
 */
export function validateField(
    name: string,
    value: any,
    rule: ValidationRule,
    allValues: FormValues,
): string | undefined {
    if (rule.required) {
        const isEmpty = value === undefined || value === null || value === '';
        if (isEmpty) {
            return typeof rule.required === 'string' ? rule.required : `${name} es requerido`;
        }
    }

    if (rule.minLength && typeof value === 'string' && value.length < rule.minLength.value) {
        return rule.minLength.message;
    }

    if (rule.maxLength && typeof value === 'string' && value.length > rule.maxLength.value) {
        return rule.maxLength.message;
    }

    if (rule.pattern && typeof value === 'string' && !rule.pattern.value.test(value)) {
        return rule.pattern.message;
    }

    if (rule.custom) {
        return rule.custom(value, allValues);
    }

    return undefined;
}

/**
 * Valida todos los campos del formulario contra sus reglas.
 */
export function validateAllFields(
    values: FormValues,
    rules: ValidationRules,
): FormErrors {
    const errors: FormErrors = {};
    for (const [name, rule] of Object.entries(rules)) {
        const error = validateField(name, values[name], rule, values);
        if (error) {
            errors[name] = error;
        }
    }
    return errors;
}
