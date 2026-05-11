import { useState, useEffect, useContext, useId } from 'react';
import { FormContext, FormDispatchContext, FormMetaContext, FormFieldStoreContext } from '../Form/Form';

interface UseCheckboxParams {
    name?: string;
    checked?: boolean;
}

/**
 * Hook que gestiona el estado del Checkbox.
 * Integra con FormContext cuando se provee un nombre de campo.
 */
export function useCheckbox({ name, checked: initialChecked }: UseCheckboxParams) {
    const formContext = useContext(FormContext);
    const isFormControlled = !!(formContext && name);
    const uniqueId = useId();

    const [isChecked, setIsChecked] = useState(initialChecked ?? false);

    // Valor real: prioridad FormContext > estado local
    const checkboxValue = isFormControlled
        ? Boolean(formContext!.values[name!])
        : isChecked;

    // Sincronizar estado interno con prop checked (solo en modo no controlado)
    useEffect(() => {
        if (!isFormControlled) {
            setIsChecked(initialChecked ?? false);
        }
    }, [initialChecked, isFormControlled]);

    return {
        formContext,
        isFormControlled,
        checkboxValue,
        setIsChecked,
        uniqueId,
    };
}

export const useCheckboxFormDispatch = () => useContext(FormDispatchContext);
export const useCheckboxFormMeta = () => useContext(FormMetaContext);
export const useCheckboxFieldStore = () => useContext(FormFieldStoreContext);
