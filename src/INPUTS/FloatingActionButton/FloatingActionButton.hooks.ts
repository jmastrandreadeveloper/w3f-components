import { useContext } from 'react';
import { FormContext, FormDispatchContext, FormMetaContext } from '../Form/Form';

/**
 * Retorna el contexto del formulario si el FAB está dentro de un Form/LiveForm.
 * Devuelve null cuando se usa de forma independiente.
 * @deprecated Use useFabFormDispatch + useFabFormMeta for better performance
 */
export function useFabFormContext() {
    return useContext(FormContext);
}

export const useFabFormDispatch = () => useContext(FormDispatchContext);
export const useFabFormMeta = () => useContext(FormMetaContext);
