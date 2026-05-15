import type { FormContextValue } from '../Form/Form.types';
/** @deprecated Use useFormDispatch + useFormFieldValue for better performance */
export declare const useEmailFieldFormContext: () => FormContextValue | null;
export declare const useEmailFieldFormDispatch: () => import("../Form/Form.types").FormDispatchValue | null;
export declare const useEmailFieldFormMeta: () => import("../Form/Form.types").FormMetaValue | null;
export declare const useEmailFieldFieldStore: () => import("../Form/Form.types").FormFieldStore | null;
export declare const useEmailFieldFocus: () => {
    isFocused: boolean;
    onFocus: () => void;
    onBlur: () => void;
};
//# sourceMappingURL=EmailField.hooks.d.ts.map