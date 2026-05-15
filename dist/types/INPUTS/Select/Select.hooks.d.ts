import type { FormContextValue } from '../Form/Form.types';
/** @deprecated Use useFormDispatch + useFormFieldValue for better performance */
export declare const useSelectFormContext: () => FormContextValue | null;
export declare const useSelectFormDispatch: () => import("../Form/Form.types").FormDispatchValue | null;
export declare const useSelectFormMeta: () => import("../Form/Form.types").FormMetaValue | null;
export declare const useSelectFieldStore: () => import("../Form/Form.types").FormFieldStore | null;
export declare const useSelectFocus: () => {
    isFocused: boolean;
    onFocus: () => void;
    onBlur: () => void;
};
//# sourceMappingURL=Select.hooks.d.ts.map