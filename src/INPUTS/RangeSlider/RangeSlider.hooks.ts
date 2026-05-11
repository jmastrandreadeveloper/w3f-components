import { useContext } from 'react';
import { FormContext, FormDispatchContext, FormMetaContext, FormFieldStoreContext } from '../Form/Form';
import type { FormContextValue } from '../Form/Form.types';

/** @deprecated Use useFormDispatch + useFormFieldValue for better performance */
export const useRangeSliderFormContext = (): FormContextValue | null => {
    return useContext(FormContext);
};

export const useRangeSliderFormDispatch = () => useContext(FormDispatchContext);
export const useRangeSliderFormMeta = () => useContext(FormMetaContext);
export const useRangeSliderFieldStore = () => useContext(FormFieldStoreContext);
