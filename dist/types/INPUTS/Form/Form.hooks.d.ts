import type { FormContextValue, FormDispatchValue, FormMetaValue, FormFieldStore } from './Form.types';
/**
 * Hook para acceder al contexto completo del formulario (backward compatible).
 * Debe usarse dentro de un <Form> o <LiveForm>.
 * NOTA: Para mejor performance, usa useFormDispatch + useFormFieldValue + useFormMeta.
 */
export declare const useFormContext: () => FormContextValue;
/**
 * Hook para un campo individual del formulario (backward compatible).
 * NOTA: Triggers re-render on ANY field change. For per-field optimization, use useOptimizedFormField.
 */
export declare const useFormField: (name: string) => {
    value: any;
    error: string;
    touched: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    setValue: (value: any) => void;
};
/**
 * Returns stable dispatch functions. Never triggers re-renders since
 * all functions are useCallback-wrapped and the context value is stable.
 */
export declare const useFormDispatch: () => FormDispatchValue | null;
/**
 * Returns form meta state (errors, touched, isSubmitting).
 * Only re-renders when errors/touched/isSubmitting change — NOT on value keystrokes.
 */
export declare const useFormMeta: () => FormMetaValue | null;
/**
 * Returns the per-field subscription store.
 * The store object itself is stable and never causes re-renders.
 */
export declare const useFormFieldStore: () => FormFieldStore | null;
/**
 * Subscribes to a SINGLE field's value using useSyncExternalStore.
 * Only re-renders when THIS field's value changes — not when other fields change.
 *
 * @param name - Field name to subscribe to
 * @returns The field's current value, or undefined if outside a Form
 *
 * @example
 * const emailValue = useFormFieldValue('email');
 */
export declare const useFormFieldValue: (name: string) => any;
/**
 * Returns the error for a SINGLE field.
 * Re-renders when ANY error changes (meta context level), but much less frequent than values.
 *
 * @param name - Field name
 * @returns The field's error string, or undefined
 */
export declare const useFormFieldError: (name: string) => string | undefined;
/**
 * Returns the touched state for a SINGLE field.
 *
 * @param name - Field name
 * @returns Whether the field has been touched
 */
export declare const useFormFieldTouched: (name: string) => boolean;
/**
 * Optimized hook for a single form field.
 * Uses split contexts so that:
 * - Value changes in OTHER fields do NOT trigger re-render
 * - Dispatch functions are stable and never trigger re-render
 * - Only meta (errors/touched) changes can trigger re-render across fields
 *
 * @param name - Field name
 * @returns Field value, error, touched, and stable dispatch handlers — or null if outside Form
 *
 * @example
 * const field = useOptimizedFormField('email');
 * if (!field) return <input />; // standalone mode
 * <input value={field.value} onChange={field.onChange} />
 */
export declare const useOptimizedFormField: (name: string) => {
    value: any;
    error: string;
    touched: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    setValue: (v: any) => void;
    setError: (err: string) => void;
    clearError: () => void;
    dispatch: FormDispatchValue;
} | null;
//# sourceMappingURL=Form.hooks.d.ts.map