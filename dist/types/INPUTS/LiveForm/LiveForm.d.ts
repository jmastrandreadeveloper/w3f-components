import React from 'react';
import type { LiveFormProps } from './LiveForm.types';
export type { LiveFormProps, ValuesChangeHandler } from './LiveForm.types';
export type { FormValues, FormErrors, FormTouched, FormContextValue, } from '../Form/Form.types';
/**
 * LiveForm Component - W3F Framework
 *
 * Formulario que expone valores en tiempo real sin necesidad de submit.
 * Compatible con el sistema de Context API de W3F Framework.
 * Comparte el mismo FormContext que Form, por lo que los componentes
 * hijos (Input, Select, etc.) funcionan igual en ambos.
 *
 * Performance: provides the same 4 split contexts as Form for minimal re-renders.
 *
 * @example
 * <LiveForm
 *   initialValues={{ search: '' }}
 *   onValuesChange={(values) => handleSearch(values)}
 *   className="w3f-space-y-4"
 * >
 *   <Input name="search" placeholder="Buscar..." />
 * </LiveForm>
 */
declare const LiveForm: React.FC<LiveFormProps>;
export { LiveForm };
export default LiveForm;
//# sourceMappingURL=LiveForm.d.ts.map