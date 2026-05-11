import React, { createContext, useState, useCallback, useMemo, useRef } from 'react';
import type {
    FormProps,
    FormContextValue,
    FormValues,
    FormErrors,
    FormTouched,
    FormDispatchValue,
    FormMetaValue,
    FormFieldStore,
    FormFieldSubscriber,
} from './Form.types';
import { FORM_DEFAULTS } from './Form.constants';
import { buildFormClasses, getFieldValue, validateAllFields } from './Form.utils';

// Re-export de tipos para consumidores
export type {
    FormValues,
    FormErrors,
    FormTouched,
    FormContextValue,
    FormProps,
    FormHelpers,
    FormSubmitHandler,
    ValidationRule,
    ValidationRules,
    FormDispatchValue,
    FormMetaValue,
    FormFieldStore,
} from './Form.types';

// ─── Split Contexts (performance optimization) ──────────────────────
/** Stable dispatch functions — identity never changes */
export const FormDispatchContext = createContext<FormDispatchValue | null>(null);
/** Meta state: errors, touched, isSubmitting — changes less than values */
export const FormMetaContext = createContext<FormMetaValue | null>(null);
/** Per-field subscription store — avoids full re-render on keystroke */
export const FormFieldStoreContext = createContext<FormFieldStore | null>(null);

// ─── Backward-compatible facade context ─────────────────────────────
export const FormContext = createContext<FormContextValue | null>(null);

/**
 * Form Component - W3F Framework
 *
 * Formulario con Context API que gestiona valores, errores y estado touched.
 * Soporta validación integrada y submit handler con helpers.
 *
 * Performance: uses 4 contexts to minimize re-renders:
 * - FormDispatchContext: stable refs (never triggers re-render)
 * - FormMetaContext: errors/touched/isSubmitting (changes infrequently)
 * - FormFieldStoreContext: per-field subscription store (fields subscribe individually)
 * - FormContext: backward-compatible facade (combines all — use split contexts for perf)
 *
 * @example
 * <Form
 *   initialValues={{ email: '', password: '' }}
 *   onSubmit={(values, { setErrors }) => console.log(values)}
 *   className="w3f-space-y-4"
 * >
 *   <Input name="email" label="Email" />
 *   <Button type="submit">Enviar</Button>
 * </Form>
 */
const Form: React.FC<FormProps> = ({
    children,
    initialValues = FORM_DEFAULTS.initialValues,
    onSubmit,
    validationRules,
    unstyled = FORM_DEFAULTS.unstyled,
    className = FORM_DEFAULTS.className,
    noValidate = FORM_DEFAULTS.noValidate,
    ...props
}) => {
    const [values, setValues] = useState<FormValues>({ ...initialValues });
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<FormTouched>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ─── Per-field subscription store ────────────────────────────────
    const valuesRef = useRef<FormValues>(values);
    valuesRef.current = values;
    const listenersRef = useRef<Map<string, Set<FormFieldSubscriber>>>(new Map());

    const notifyField = useCallback((name: string, value: any) => {
        const subs = listenersRef.current.get(name);
        if (subs) {
            subs.forEach(fn => fn(value));
        }
    }, []);

    // Wrap setValues to also notify subscribers
    const setValuesAndNotify = useCallback((updater: FormValues | ((prev: FormValues) => FormValues)) => {
        setValues(prev => {
            const next = typeof updater === 'function' ? updater(prev) : updater;
            // Schedule notifications after state update
            for (const key of Object.keys(next)) {
                if (next[key] !== prev[key]) {
                    notifyField(key, next[key]);
                }
            }
            return next;
        });
    }, [notifyField]);

    // ─── Dispatch functions (stable refs via useCallback) ────────────
    const resetForm = useCallback(() => {
        setValuesAndNotify({ ...initialValues });
        setErrors({});
        setTouched({});
        setIsSubmitting(false);
    }, [initialValues, setValuesAndNotify]);

    const setFieldValue = useCallback((name: string, value: any) => {
        setValuesAndNotify(prev => ({ ...prev, [name]: value }));
    }, [setValuesAndNotify]);

    const setFieldError = useCallback((name: string, error: string) => {
        setErrors(prev => ({ ...prev, [name]: error }));
    }, []);

    const clearFieldError = useCallback((name: string) => {
        setErrors(prev => {
            const next = { ...prev };
            delete next[name];
            return next;
        });
    }, []);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const { name } = e.target;
            const val = getFieldValue(e);
            setFieldValue(name, val);
        },
        [setFieldValue],
    );

    const handleBlur = useCallback(
        (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const { name } = e.target;
            setTouched(prev => ({ ...prev, [name]: true }));
        },
        [],
    );

    // ─── Submit handler ──────────────────────────────────────────────
    const handleSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if (validationRules) {
                const validationErrors = validateAllFields(valuesRef.current, validationRules);
                if (Object.keys(validationErrors).length > 0) {
                    setErrors(validationErrors);
                    const allTouched: FormTouched = {};
                    for (const key of Object.keys(validationRules)) {
                        allTouched[key] = true;
                    }
                    setTouched(prev => ({ ...prev, ...allTouched }));
                    return;
                }
            }

            if (onSubmit) {
                setIsSubmitting(true);
                try {
                    await onSubmit(valuesRef.current, { setErrors, setTouched, resetForm });
                } finally {
                    setIsSubmitting(false);
                }
            }
        },
        [validationRules, onSubmit, resetForm],
    );

    // ─── Split context values ────────────────────────────────────────
    const dispatchValue = useMemo<FormDispatchValue>(() => ({
        handleChange,
        handleBlur,
        setFieldValue,
        setFieldError,
        clearFieldError,
        setErrors,
        setTouched,
        resetForm,
    }), [handleChange, handleBlur, setFieldValue, setFieldError, clearFieldError, resetForm]);

    const metaValue = useMemo<FormMetaValue>(() => ({
        errors,
        touched,
        isSubmitting,
    }), [errors, touched, isSubmitting]);

    const fieldStore = useMemo<FormFieldStore>(() => ({
        getFieldValue: (name: string) => valuesRef.current[name],
        getValues: () => valuesRef.current,
        subscribe: (name: string, listener: FormFieldSubscriber) => {
            if (!listenersRef.current.has(name)) {
                listenersRef.current.set(name, new Set());
            }
            listenersRef.current.get(name)!.add(listener);
            return () => {
                const subs = listenersRef.current.get(name);
                if (subs) {
                    subs.delete(listener);
                    if (subs.size === 0) listenersRef.current.delete(name);
                }
            };
        },
    }), []); // stable — uses refs internally

    // ─── Backward-compatible facade ──────────────────────────────────
    const contextValue = useMemo<FormContextValue>(
        () => ({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setFieldValue,
            setFieldError,
            clearFieldError,
            setErrors,
            setTouched,
            resetForm,
            isSubmitting,
        }),
        [values, errors, touched, handleChange, handleBlur, setFieldValue, setFieldError, clearFieldError, resetForm, isSubmitting],
    );

    const formClasses = buildFormClasses(className, isSubmitting, unstyled);

    return (
        <FormDispatchContext.Provider value={dispatchValue}>
            <FormMetaContext.Provider value={metaValue}>
                <FormFieldStoreContext.Provider value={fieldStore}>
                    <FormContext.Provider value={contextValue}>
                        <form
                            onSubmit={handleSubmit}
                            className={formClasses}
                            noValidate={noValidate}
                            {...props}
                        >
                            {children}
                        </form>
                    </FormContext.Provider>
                </FormFieldStoreContext.Provider>
            </FormMetaContext.Provider>
        </FormDispatchContext.Provider>
    );
};

Form.displayName = 'Form';

export { Form };
export default Form;
