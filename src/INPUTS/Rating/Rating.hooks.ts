import { useContext, useState } from 'react';
import { FormContext, FormDispatchContext, FormMetaContext, FormFieldStoreContext } from '../Form/Form';
import type { FormContextValue } from '../Form/Form.types';

/** @deprecated Use useFormDispatch + useFormFieldValue for better performance */
export const useRatingFormContext = (): FormContextValue | null => {
    return useContext(FormContext);
};

export const useRatingFormDispatch = () => useContext(FormDispatchContext);
export const useRatingFormMeta = () => useContext(FormMetaContext);
export const useRatingFieldStore = () => useContext(FormFieldStoreContext);

export const useRatingHover = () => {
    const [hover, setHover] = useState(-1);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    return { hover, setHover, focusedIndex, setFocusedIndex };
};
