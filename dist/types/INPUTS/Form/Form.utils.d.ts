import type { FormValues, FormErrors, ValidationRule, ValidationRules } from './Form.types';
/**
 * Construye las clases CSS del <form>.
 */
export declare function buildFormClasses(className?: string, isSubmitting?: boolean, unstyled?: boolean): string;
/**
 * Extrae el valor de un evento de cambio según el tipo de input.
 */
export declare function getFieldValue(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): any;
/**
 * Valida un campo individual contra su regla.
 */
export declare function validateField(name: string, value: any, rule: ValidationRule, allValues: FormValues): string | undefined;
/**
 * Valida todos los campos del formulario contra sus reglas.
 */
export declare function validateAllFields(values: FormValues, rules: ValidationRules): FormErrors;
//# sourceMappingURL=Form.utils.d.ts.map