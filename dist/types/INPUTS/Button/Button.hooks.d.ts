/**
 * Retorna el contexto del formulario si el botón está dentro de un Form/LiveForm.
 * Devuelve null cuando se usa de forma independiente.
 * @deprecated Use useButtonFormDispatch + useButtonFormMeta for better performance
 */
export declare function useButtonFormContext(): import("../..").FormContextValue | null;
export declare const useButtonFormDispatch: () => import("../Form/Form.types").FormDispatchValue | null;
export declare const useButtonFormMeta: () => import("../Form/Form.types").FormMetaValue | null;
//# sourceMappingURL=Button.hooks.d.ts.map