import type { FormContextValue } from '../Form/Form.types';
/** @deprecated Use useFormDispatch + useFormFieldValue for better performance */
export declare const usePasswordFieldFormContext: () => FormContextValue | null;
export declare const usePasswordFieldFormDispatch: () => import("../Form/Form.types").FormDispatchValue | null;
export declare const usePasswordFieldFormMeta: () => import("../Form/Form.types").FormMetaValue | null;
export declare const usePasswordFieldFieldStore: () => import("../Form/Form.types").FormFieldStore | null;
export declare const usePasswordFieldFocus: () => {
    isFocused: boolean;
    onFocus: () => void;
    onBlur: () => void;
};
export declare const usePasswordVisibility: () => {
    showPassword: boolean;
    toggleVisibility: () => void;
};
//# sourceMappingURL=PasswordField.hooks.d.ts.map