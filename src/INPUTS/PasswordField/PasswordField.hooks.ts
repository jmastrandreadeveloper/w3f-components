import { useContext, useState } from 'react';
import { FormContext, FormDispatchContext, FormMetaContext, FormFieldStoreContext } from '../Form/Form';
import type { FormContextValue } from '../Form/Form.types';

/** @deprecated Use useFormDispatch + useFormFieldValue for better performance */
export const usePasswordFieldFormContext = (): FormContextValue | null => {
    return useContext(FormContext);
};

export const usePasswordFieldFormDispatch = () => useContext(FormDispatchContext);
export const usePasswordFieldFormMeta = () => useContext(FormMetaContext);
export const usePasswordFieldFieldStore = () => useContext(FormFieldStoreContext);

export const usePasswordFieldFocus = () => {
    const [isFocused, setIsFocused] = useState(false);
    return {
        isFocused,
        onFocus: () => setIsFocused(true),
        onBlur: () => setIsFocused(false),
    };
};

export const usePasswordVisibility = () => {
    const [showPassword, setShowPassword] = useState(false);
    return {
        showPassword,
        toggleVisibility: () => setShowPassword((prev) => !prev),
    };
};
