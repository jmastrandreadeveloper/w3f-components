import { useContext } from 'react';
import { FormContext, FormDispatchContext, FormMetaContext } from '../Form/Form';

/**
 * Retorna el contexto del formulario si el grupo está dentro de un Form/LiveForm.
 * Devuelve null cuando se usa de forma independiente.
 * @deprecated Use useButtonGroupFormDispatch + useButtonGroupFormMeta for better performance
 */
export function useButtonGroupFormContext() {
    return useContext(FormContext);
}

export const useButtonGroupFormDispatch = () => useContext(FormDispatchContext);
export const useButtonGroupFormMeta = () => useContext(FormMetaContext);
