import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { FormContext, FormDispatchContext, FormMetaContext, FormFieldStoreContext } from '../Form/Form';
import type {
    FormContextValue,
    FormValues,
    FormErrors,
    FormTouched,
    FormDispatchValue,
    FormMetaValue,
    FormFieldStore,
    FormFieldSubscriber,
} from '../Form/Form.types';
import type { LiveFormProps } from './LiveForm.types';
import { LIVE_FORM_DEFAULTS } from './LiveForm.constants';
import { buildLiveFormClasses } from './LiveForm.utils';
import { getFieldValue } from '../Form/Form.utils';

// Re-export de tipos
export type { LiveFormProps, ValuesChangeHandler } from './LiveForm.types';
export type {
    FormValues,
    FormErrors,
    FormTouched,
    FormContextValue,
} from '../Form/Form.types';

/**
 * LiveForm Component - W3F Framework
 *
 * Formulario que expone valores en tiempo real sin necesidad de submit.
 * Compatible con el sistema de Context API de W3F Framework.
 * Comparte el mismo FormContext que Form, por lo que los componentes
 * hijos (Input, Select, etc.) funcionan igual en ambos.
 *
 * Performance: provides the same 4 split contexts as Form for minimal re-renders.
 *
 * @example
 * <LiveForm
 *   initialValues={{ search: '' }}
 *   onValuesChange={(values) => handleSearch(values)}
 *   className="w3f-space-y-4"
 * >
 *   <Input name="search" placeholder="Buscar..." />
 * </LiveForm>
 */
const LiveForm: React.FC<LiveFormProps> = ({
    children,
    initialValues = LIVE_FORM_DEFAULTS.initialValues,
    onValuesChange,
    unstyled = LIVE_FORM_DEFAULTS.unstyled,
    className = LIVE_FORM_DEFAULTS.className,
    ...props
}) => {
    const [values, setValues] = useState<FormValues>({ ...initialValues });
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<FormTouched>({});

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

    const setValuesAndNotify = useCallback((updater: FormValues | ((prev: FormValues) => FormValues)) => {
        setValues(prev => {
            const next = typeof updater === 'function' ? updater(prev) : updater;
            for (const key of Object.keys(next)) {
                if (next[key] !== prev[key]) {
                    notifyField(key, next[key]);
                }
            }
            return next;
        });
    }, [notifyField]);

    // ─── Dispatch functions ──────────────────────────────────────────
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

    const resetForm = useCallback(() => {
        setValuesAndNotify({ ...initialValues });
        setErrors({});
        setTouched({});
    }, [initialValues, setValuesAndNotify]);

    // Notificar cambios en tiempo real
    useEffect(() => {
        if (onValuesChange) {
            onValuesChange(values);
        }
    }, [values, onValuesChange]);

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
        isSubmitting: false,
    }), [errors, touched]);

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
    }), []);

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
            isSubmitting: false,
        }),
        [values, errors, touched, handleChange, handleBlur, setFieldValue, setFieldError, clearFieldError, resetForm],
    );

    const hasValues = Object.values(values).some(v => v !== '' && v !== undefined && v !== null);
    const containerClasses = buildLiveFormClasses(className, hasValues, unstyled);

    return (
        <FormDispatchContext.Provider value={dispatchValue}>
            <FormMetaContext.Provider value={metaValue}>
                <FormFieldStoreContext.Provider value={fieldStore}>
                    <FormContext.Provider value={contextValue}>
                        <div
                            className={containerClasses}
                            {...props}
                        >
                            {children}
                        </div>
                    </FormContext.Provider>
                </FormFieldStoreContext.Provider>
            </FormMetaContext.Provider>
        </FormDispatchContext.Provider>
    );
};

LiveForm.displayName = 'LiveForm';

export { LiveForm };
export default LiveForm;
