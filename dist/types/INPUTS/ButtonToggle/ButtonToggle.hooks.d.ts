import type { ButtonToggleValue } from './ButtonToggle.types';
interface UseButtonToggleParams {
    name?: string;
    multiple: boolean;
    defaultValue?: ButtonToggleValue;
    value?: ButtonToggleValue;
}
/**
 * Hook que gestiona el estado de selección del ButtonToggle.
 * Integra con FormContext cuando se provee un nombre de campo.
 */
export declare function useButtonToggle({ name, multiple, defaultValue, value: controlledValue, }: UseButtonToggleParams): {
    formContext: import("../..").FormContextValue | null;
    isFormControlled: boolean;
    currentValue: ButtonToggleValue;
    setInternalValue: import("react").Dispatch<import("react").SetStateAction<ButtonToggleValue>>;
};
export declare const useButtonToggleFormDispatch: () => import("../Form/Form.types").FormDispatchValue | null;
export declare const useButtonToggleFormMeta: () => import("../Form/Form.types").FormMetaValue | null;
export declare const useButtonToggleFieldStore: () => import("../Form/Form.types").FormFieldStore | null;
export {};
//# sourceMappingURL=ButtonToggle.hooks.d.ts.map