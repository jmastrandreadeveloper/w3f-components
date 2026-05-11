import { useContext } from 'react';
import { FormContext, FormDispatchContext, FormMetaContext, FormFieldStoreContext } from '../Form/Form';
import type { FormContextValue } from '../Form/Form.types';

/** @deprecated Use useFormDispatch + useFormFieldValue for better performance */
export const useFormFieldContext = (): FormContextValue | null => {
    return useContext(FormContext);
};

export const useFormFieldDispatch = () => useContext(FormDispatchContext);
export const useFormFieldMeta = () => useContext(FormMetaContext);
export const useFormFieldFieldStore = () => useContext(FormFieldStoreContext);
