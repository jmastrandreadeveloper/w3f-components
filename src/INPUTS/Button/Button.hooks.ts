import { useContext } from 'react';
import { FormContext, FormDispatchContext, FormMetaContext } from '../Form/Form';

/**
 * Retorna el contexto del formulario si el botón está dentro de un Form/LiveForm.
 * Devuelve null cuando se usa de forma independiente.
 * @deprecated Use useButtonFormDispatch + useButtonFormMeta for better performance
 */
export function useButtonFormContext() {
    return useContext(FormContext);
}

export const useButtonFormDispatch = () => useContext(FormDispatchContext);
export const useButtonFormMeta = () => useContext(FormMetaContext);
