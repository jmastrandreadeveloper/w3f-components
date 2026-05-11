import { useContext, useState } from 'react';
import { FormContext, FormDispatchContext, FormMetaContext, FormFieldStoreContext } from '../Form/Form';
import type { FormContextValue } from '../Form/Form.types';

/** @deprecated Use useFormDispatch + useFormFieldValue for better performance */
export const useEmailFieldFormContext = (): FormContextValue | null => {
    return useContext(FormContext);
};

export const useEmailFieldFormDispatch = () => useContext(FormDispatchContext);
export const useEmailFieldFormMeta = () => useContext(FormMetaContext);
export const useEmailFieldFieldStore = () => useContext(FormFieldStoreContext);

export const useEmailFieldFocus = () => {
    const [isFocused, setIsFocused] = useState(false);
    return {
        isFocused,
        onFocus: () => setIsFocused(true),
        onBlur: () => setIsFocused(false),
    };
};
