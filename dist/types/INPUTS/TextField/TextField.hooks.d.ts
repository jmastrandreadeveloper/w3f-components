import type { FormContextValue } from '../Form/Form.types';
/** @deprecated Use useFormDispatch + useFormFieldValue for better performance */
export declare const useTextFieldFormContext: () => FormContextValue | null;
export declare const useTextFieldFormDispatch: () => import("../Form/Form.types").FormDispatchValue | null;
export declare const useTextFieldFormMeta: () => import("../Form/Form.types").FormMetaValue | null;
export declare const useTextFieldFieldStore: () => import("../Form/Form.types").FormFieldStore | null;
export declare const useTextFieldFocus: () => {
    isFocused: boolean;
    onFocus: () => void;
    onBlur: () => void;
};
//# sourceMappingURL=TextField.hooks.d.ts.map