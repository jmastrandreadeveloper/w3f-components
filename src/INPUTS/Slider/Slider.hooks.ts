import { useContext } from 'react';
import { FormContext, FormDispatchContext, FormMetaContext, FormFieldStoreContext } from '../Form/Form';
import type { FormContextValue } from '../Form/Form.types';

/** @deprecated Use useFormDispatch + useFormFieldValue for better performance */
export const useSliderFormContext = (): FormContextValue | null => {
    return useContext(FormContext);
};

export const useSliderFormDispatch = () => useContext(FormDispatchContext);
export const useSliderFormMeta = () => useContext(FormMetaContext);
export const useSliderFieldStore = () => useContext(FormFieldStoreContext);
