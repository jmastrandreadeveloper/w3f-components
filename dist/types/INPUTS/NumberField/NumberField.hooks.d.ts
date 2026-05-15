import type { FormContextValue } from '../Form/Form.types';
/** @deprecated Use useNumberFieldFormDispatch + useFormFieldValue for better performance */
export declare const useNumberFieldFormContext: () => FormContextValue | null;
export declare const useNumberFieldFormDispatch: () => import("../Form/Form.types").FormDispatchValue | null;
export declare const useNumberFieldFormMeta: () => import("../Form/Form.types").FormMetaValue | null;
export declare const useNumberFieldFieldStore: () => import("../Form/Form.types").FormFieldStore | null;
interface UseNumberFieldOptions {
    name?: string;
    value?: number | string;
    min: number;
    max: number;
    step: number;
    precision?: number;
    disabled: boolean;
    onChange?: (value: number | '') => void;
}
export declare const useNumberField: ({ name, value, min, max, step, precision, disabled, onChange, }: UseNumberFieldOptions) => {
    formContext: FormContextValue | null;
    isFormControlled: boolean;
    fieldError: string | undefined;
    internalValue: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSpin: (direction: "increment" | "decrement") => void;
    handleBlur: (e: React.FocusEvent<HTMLInputElement>, onBlurProp?: React.FocusEventHandler<HTMLInputElement>) => void;
    notifyChange: (newValue: number | "") => void;
    isAtMax: boolean;
    isAtMin: boolean;
};
export {};
//# sourceMappingURL=NumberField.hooks.d.ts.map