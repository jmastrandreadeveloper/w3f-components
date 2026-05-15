interface UseCheckboxParams {
    name?: string;
    checked?: boolean;
}
/**
 * Hook que gestiona el estado del Checkbox.
 * Integra con FormContext cuando se provee un nombre de campo.
 */
export declare function useCheckbox({ name, checked: initialChecked }: UseCheckboxParams): {
    formContext: import("../..").FormContextValue | null;
    isFormControlled: boolean;
    checkboxValue: boolean;
    setIsChecked: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    uniqueId: string;
};
export declare const useCheckboxFormDispatch: () => import("../Form/Form.types").FormDispatchValue | null;
export declare const useCheckboxFormMeta: () => import("../Form/Form.types").FormMetaValue | null;
export declare const useCheckboxFieldStore: () => import("../Form/Form.types").FormFieldStore | null;
export {};
//# sourceMappingURL=Checkbox.hooks.d.ts.map