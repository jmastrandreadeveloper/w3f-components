import { useContext, useState } from 'react';
import { FormContext, FormDispatchContext, FormMetaContext, FormFieldStoreContext } from '../Form/Form';
import type { FormContextValue } from '../Form/Form.types';

/** @deprecated Use useFormDispatch + useFormFieldValue for better performance */
export const useTextFieldFormContext = (): FormContextValue | null => {
    return useContext(FormContext);
};

export const useTextFieldFormDispatch = () => useContext(FormDispatchContext);
export const useTextFieldFormMeta = () => useContext(FormMetaContext);
export const useTextFieldFieldStore = () => useContext(FormFieldStoreContext);

export const useTextFieldFocus = () => {
    const [isFocused, setIsFocused] = useState(false);
    return {
        isFocused,
        onFocus: () => setIsFocused(true),
        onBlur: () => setIsFocused(false),
    };
};
