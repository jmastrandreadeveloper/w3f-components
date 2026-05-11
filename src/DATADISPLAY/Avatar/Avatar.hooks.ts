import { useContext, useCallback } from 'react';
import { FormContext, FormDispatchContext, FormFieldStoreContext } from '../../INPUTS/Form/Form';

/**
 * Integración del Avatar con FormContext.
 * Retorna null para todo si no hay contexto o no se pasa `name`.
 */
export function useAvatarForm(name?: string) {
  const formContext = useContext(FormContext);
  const isFormControlled = !!(formContext && name);

  const formValue = isFormControlled
    ? (formContext!.values[name!] as string | undefined)
    : undefined;

  const setFormValue = useCallback(
    (value: string) => {
      if (isFormControlled && formContext && name) {
        formContext.setFieldValue(name, value);
      }
    },
    [isFormControlled, formContext, name],
  );

  return { isFormControlled, formValue, setFormValue };
}

export const useAvatarFormDispatch = () => useContext(FormDispatchContext);
export const useAvatarFieldStore = () => useContext(FormFieldStoreContext);
