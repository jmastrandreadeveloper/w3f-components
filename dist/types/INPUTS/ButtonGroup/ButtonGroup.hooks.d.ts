/**
 * Retorna el contexto del formulario si el grupo está dentro de un Form/LiveForm.
 * Devuelve null cuando se usa de forma independiente.
 * @deprecated Use useButtonGroupFormDispatch + useButtonGroupFormMeta for better performance
 */
export declare function useButtonGroupFormContext(): import("../..").FormContextValue | null;
export declare const useButtonGroupFormDispatch: () => import("../Form/Form.types").FormDispatchValue | null;
export declare const useButtonGroupFormMeta: () => import("../Form/Form.types").FormMetaValue | null;
//# sourceMappingURL=ButtonGroup.hooks.d.ts.map