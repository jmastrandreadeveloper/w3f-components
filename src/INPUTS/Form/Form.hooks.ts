import { useContext, useCallback, useRef, useSyncExternalStore } from 'react';
import { FormContext, FormDispatchContext, FormMetaContext, FormFieldStoreContext } from './Form';
import type { FormContextValue, FormDispatchValue, FormMetaValue, FormFieldStore } from './Form.types';

/**
 * Hook para acceder al contexto completo del formulario (backward compatible).
 * Debe usarse dentro de un <Form> o <LiveForm>.
 * NOTA: Para mejor performance, usa useFormDispatch + useFormFieldValue + useFormMeta.
 */
export const useFormContext = (): FormContextValue => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error('useFormContext debe ser usado dentro de un <Form> o <LiveForm>');
    }
    return context;
};

/**
 * Hook para un campo individual del formulario (backward compatible).
 * NOTA: Triggers re-render on ANY field change. For per-field optimization, use useOptimizedFormField.
 */
export const useFormField = (name: string) => {
    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
    } = useFormContext();

    return {
        value: values[name] ?? '',
        error: errors[name],
        touched: touched[name] ?? false,
        onChange: handleChange,
        onBlur: handleBlur,
        setValue: (value: any) => setFieldValue(name, value),
    };
};

// ─── Optimized split-context hooks ───────────────────────────────────

/**
 * Returns stable dispatch functions. Never triggers re-renders since
 * all functions are useCallback-wrapped and the context value is stable.
 */
export const useFormDispatch = (): FormDispatchValue | null => {
    return useContext(FormDispatchContext);
};

/**
 * Returns form meta state (errors, touched, isSubmitting).
 * Only re-renders when errors/touched/isSubmitting change — NOT on value keystrokes.
 */
export const useFormMeta = (): FormMetaValue | null => {
    return useContext(FormMetaContext);
};

/**
 * Returns the per-field subscription store.
 * The store object itself is stable and never causes re-renders.
 */
export const useFormFieldStore = (): FormFieldStore | null => {
    return useContext(FormFieldStoreContext);
};

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
export const useFormFieldValue = (name: string): any => {
    const store = useContext(FormFieldStoreContext);

    // Stable subscribe function for this field name
    const nameRef = useRef(name);
    nameRef.current = name;

    const subscribe = useCallback(
        (onStoreChange: () => void) => {
            if (!store) return () => {};
            return store.subscribe(nameRef.current, onStoreChange);
        },
        [store],
    );

    const getSnapshot = useCallback(() => {
        if (!store) return undefined;
        return store.getFieldValue(nameRef.current);
    }, [store]);

    return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
};

/**
 * Returns the error for a SINGLE field.
 * Re-renders when ANY error changes (meta context level), but much less frequent than values.
 *
 * @param name - Field name
 * @returns The field's error string, or undefined
 */
export const useFormFieldError = (name: string): string | undefined => {
    const meta = useContext(FormMetaContext);
    if (!meta) return undefined;
    return meta.errors[name];
};

/**
 * Returns the touched state for a SINGLE field.
 *
 * @param name - Field name
 * @returns Whether the field has been touched
 */
export const useFormFieldTouched = (name: string): boolean => {
    const meta = useContext(FormMetaContext);
    if (!meta) return false;
    return meta.touched[name] ?? false;
};

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
export const useOptimizedFormField = (name: string) => {
    const dispatch = useContext(FormDispatchContext);
    const meta = useContext(FormMetaContext);
    const store = useContext(FormFieldStoreContext);

    // If not inside a Form, return null (backward compatible pattern)
    if (!dispatch || !meta || !store) return null;

    const value = useFormFieldValue(name);

    return {
        value: value ?? '',
        error: meta.errors[name],
        touched: meta.touched[name] ?? false,
        onChange: dispatch.handleChange,
        onBlur: dispatch.handleBlur,
        setValue: (v: any) => dispatch.setFieldValue(name, v),
        setError: (err: string) => dispatch.setFieldError(name, err),
        clearError: () => dispatch.clearFieldError(name),
        dispatch,
    };
};
