import { createContext, useContext } from 'react';
import { FormContext, FormDispatchContext, FormMetaContext, FormFieldStoreContext } from '../Form/Form';
import type { FormContextValue } from '../Form/Form.types';
import type { RadioGroupContextValue } from './RadioButton.types';

// Contexto interno del RadioGroup
export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export const useRadioGroup = (): RadioGroupContextValue => {
    const context = useContext(RadioGroupContext);
    if (!context) {
        throw new Error('RadioButton debe usarse dentro de un RadioGroup');
    }
    return context;
};

/** @deprecated Use useRadioFormDispatch + useFormFieldValue for better performance */
export const useRadioFormContext = (): FormContextValue | null => {
    return useContext(FormContext);
};

export const useRadioFormDispatch = () => useContext(FormDispatchContext);
export const useRadioFormMeta = () => useContext(FormMetaContext);
export const useRadioFieldStore = () => useContext(FormFieldStoreContext);
