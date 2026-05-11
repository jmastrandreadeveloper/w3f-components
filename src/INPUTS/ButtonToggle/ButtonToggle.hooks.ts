import { useState, useContext } from 'react';
import { FormContext, FormDispatchContext, FormMetaContext, FormFieldStoreContext } from '../Form/Form';
import type { ButtonToggleValue } from './ButtonToggle.types';

interface UseButtonToggleParams {
    name?: string;
    multiple: boolean;
    defaultValue?: ButtonToggleValue;
    value?: ButtonToggleValue;
}

/**
 * Hook que gestiona el estado de selección del ButtonToggle.
 * Integra con FormContext cuando se provee un nombre de campo.
 */
export function useButtonToggle({
    name,
    multiple,
    defaultValue,
    value: controlledValue,
}: UseButtonToggleParams) {
    const formContext = useContext(FormContext);
    const isFormControlled = !!(formContext && name);

    const [internalValue, setInternalValue] = useState<ButtonToggleValue>(() => {
        if (defaultValue !== undefined) return defaultValue;
        return multiple ? [] : null;
    });

    // Prioridad: FormContext > prop value > estado interno
    const currentValue: ButtonToggleValue = isFormControlled
        ? (formContext!.values[name!] ?? (multiple ? [] : null))
        : (controlledValue !== undefined ? controlledValue : internalValue);

    return {
        formContext,
        isFormControlled,
        currentValue,
        setInternalValue,
    };
}

export const useButtonToggleFormDispatch = () => useContext(FormDispatchContext);
export const useButtonToggleFormMeta = () => useContext(FormMetaContext);
export const useButtonToggleFieldStore = () => useContext(FormFieldStoreContext);
