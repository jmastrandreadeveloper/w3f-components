import { useFormContext, useFormField } from '../Form/Form.hooks';

/**
 * Hook del contexto LiveForm.
 * Alias de useFormContext para backward compatibility.
 */
export const useLiveFormContext = useFormContext;

/**
 * Hook para un campo individual dentro de un LiveForm.
 * Alias de useFormField para backward compatibility.
 */
export const useLiveFormField = useFormField;
