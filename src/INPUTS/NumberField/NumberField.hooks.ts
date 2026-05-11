import { useContext, useState, useCallback, useEffect } from 'react';
import { FormContext, FormDispatchContext, FormMetaContext, FormFieldStoreContext } from '../Form/Form';
import type { FormContextValue } from '../Form/Form.types';
import { clampValue, isValidNumber, formatValue } from './NumberField.utils';

/** @deprecated Use useNumberFieldFormDispatch + useFormFieldValue for better performance */
export const useNumberFieldFormContext = (): FormContextValue | null => {
    return useContext(FormContext);
};

export const useNumberFieldFormDispatch = () => useContext(FormDispatchContext);
export const useNumberFieldFormMeta = () => useContext(FormMetaContext);
export const useNumberFieldFieldStore = () => useContext(FormFieldStoreContext);

interface UseNumberFieldOptions {
    name?: string;
    value?: number | string;
    min: number;
    max: number;
    step: number;
    precision?: number;
    disabled: boolean;
    onChange?: (value: number | '') => void;
}

export const useNumberField = ({
    name,
    value,
    min,
    max,
    step,
    precision,
    disabled,
    onChange,
}: UseNumberFieldOptions) => {
    const formContext = useNumberFieldFormContext();
    const isFormControlled = !!(formContext && name);

    const fieldValue = isFormControlled ? (formContext.values[name!] ?? '') : (value ?? '');
    const fieldError = isFormControlled ? formContext.errors[name!] : undefined;

    const [internalValue, setInternalValue] = useState(String(fieldValue));

    useEffect(() => {
        setInternalValue(String(fieldValue));
    }, [fieldValue]);

    const notifyChange = useCallback(
        (newValue: number | '') => {
            if (isFormControlled && formContext && name) {
                const syntheticEvent = {
                    target: { name, value: newValue, type: 'text' },
                };
                formContext.handleChange(syntheticEvent as any);
            }
            if (onChange) onChange(newValue);
        },
        [isFormControlled, formContext, name, onChange],
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        if (raw === '' || raw === '-' || raw === '.' || raw === '-.') {
            setInternalValue(raw);
            return;
        }
        if (!isValidNumber(raw)) return;
        setInternalValue(raw);
        const num = Number(raw);
        if (!isNaN(num)) {
            notifyChange(clampValue(num, min, max, precision));
        }
    };

    const handleSpin = useCallback(
        (direction: 'increment' | 'decrement') => {
            if (disabled) return;
            const current = Number(internalValue) || 0;
            const next = current + (direction === 'increment' ? step : -step);
            const clamped = clampValue(next, min, max, precision);
            const formatted = formatValue(clamped, precision);
            setInternalValue(formatted);
            notifyChange(clamped);
        },
        [disabled, internalValue, step, min, max, precision, notifyChange],
    );

    const handleBlur = (
        e: React.FocusEvent<HTMLInputElement>,
        onBlurProp?: React.FocusEventHandler<HTMLInputElement>,
    ) => {
        const current = e.target.value;
        if (current === '' || current === '-' || current === '.') {
            setInternalValue('');
            notifyChange('');
        } else if (isValidNumber(current)) {
            const num = Number(current);
            const clamped = clampValue(num, min, max, precision);
            setInternalValue(formatValue(clamped, precision));
            if (String(clamped) !== String(fieldValue)) {
                notifyChange(clamped);
            }
        }
        if (isFormControlled && formContext) formContext.handleBlur(e);
        if (onBlurProp) onBlurProp(e);
    };

    const isAtMax = !isNaN(Number(internalValue)) && Number(internalValue) >= max;
    const isAtMin = !isNaN(Number(internalValue)) && Number(internalValue) <= min;

    return {
        formContext,
        isFormControlled,
        fieldError,
        internalValue,
        handleInputChange,
        handleSpin,
        handleBlur,
        notifyChange,
        isAtMax,
        isAtMin,
    };
};
