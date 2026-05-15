/**
 * Retorna el contexto del formulario si el FAB está dentro de un Form/LiveForm.
 * Devuelve null cuando se usa de forma independiente.
 * @deprecated Use useFabFormDispatch + useFabFormMeta for better performance
 */
export declare function useFabFormContext(): import("../..").FormContextValue | null;
export declare const useFabFormDispatch: () => import("../Form/Form.types").FormDispatchValue | null;
export declare const useFabFormMeta: () => import("../Form/Form.types").FormMetaValue | null;
//# sourceMappingURL=FloatingActionButton.hooks.d.ts.map