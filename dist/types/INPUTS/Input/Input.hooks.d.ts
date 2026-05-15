import type { FormContextValue } from '../Form/Form.types';
import type { MaskDefinition } from './Input.masks';
/** @deprecated Use useFormDispatch + useFormFieldValue for better performance */
export declare const useInputFormContext: () => FormContextValue | null;
export declare const useInputFormDispatch: () => import("../Form/Form.types").FormDispatchValue | null;
export declare const useInputFormMeta: () => import("../Form/Form.types").FormMetaValue | null;
export declare const useInputFieldStore: () => import("../Form/Form.types").FormFieldStore | null;
export declare const useInputFocus: (disabled: boolean) => {
    isFocused: boolean;
    handleFocus: () => void;
    handleBlurFocus: (hasValue: boolean) => void;
};
/**
 * Hook for input masking — formats display value and exposes clean value.
 */
export declare const useInputMask: (maskProp: string | MaskDefinition | undefined, externalValue: string | undefined) => {
    maskDef: MaskDefinition | null;
    displayValue: string | undefined;
    cleanValue: string | undefined;
    formatAndUpdate: (raw: string) => string;
    placeholder: string | undefined;
    maxLength: number | undefined;
};
/**
 * Hook for pattern validation on blur.
 */
export declare const usePatternValidation: (patternProp: string | RegExp | undefined) => {
    patternError: string | undefined;
    validateOnBlur: (value: string) => void;
};
//# sourceMappingURL=Input.hooks.d.ts.map