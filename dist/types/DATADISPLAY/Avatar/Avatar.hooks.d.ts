/**
 * Integración del Avatar con FormContext.
 * Retorna null para todo si no hay contexto o no se pasa `name`.
 */
export declare function useAvatarForm(name?: string): {
    isFormControlled: boolean;
    formValue: string | undefined;
    setFormValue: (value: string) => void;
};
export declare const useAvatarFormDispatch: () => import("../../INPUTS/Form/Form.types").FormDispatchValue | null;
export declare const useAvatarFieldStore: () => import("../../INPUTS/Form/Form.types").FormFieldStore | null;
//# sourceMappingURL=Avatar.hooks.d.ts.map