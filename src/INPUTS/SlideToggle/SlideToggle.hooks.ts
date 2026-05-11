import { useContext } from 'react';
import { FormContext, FormDispatchContext, FormMetaContext, FormFieldStoreContext } from '../Form/Form';
import type { FormContextValue } from '../Form/Form.types';

/** @deprecated Use useFormDispatch + useFormFieldValue for better performance */
export const useSlideToggleFormContext = (): FormContextValue | null => {
    return useContext(FormContext);
};

export const useSlideToggleFormDispatch = () => useContext(FormDispatchContext);
export const useSlideToggleFormMeta = () => useContext(FormMetaContext);
export const useSlideToggleFieldStore = () => useContext(FormFieldStoreContext);
