import { useContext, useState } from 'react';
import { FormContext, FormDispatchContext, FormMetaContext, FormFieldStoreContext } from '../Form/Form';
import type { FormContextValue } from '../Form/Form.types';

/** @deprecated Use useFormDispatch + useFormFieldValue for better performance */
export const useSelectFormContext = (): FormContextValue | null => {
    return useContext(FormContext);
};

export const useSelectFormDispatch = () => useContext(FormDispatchContext);
export const useSelectFormMeta = () => useContext(FormMetaContext);
export const useSelectFieldStore = () => useContext(FormFieldStoreContext);

export const useSelectFocus = () => {
    const [isFocused, setIsFocused] = useState(false);
    const onFocus = () => setIsFocused(true);
    const onBlur = () => setIsFocused(false);
    return { isFocused, onFocus, onBlur };
};
