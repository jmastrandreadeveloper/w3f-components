import React from 'react';
import type { FormFieldProps } from './FormField.types';
/**
 * FormField - Wrapper de campo para formularios.
 *
 * Proporciona label, mensaje de error/helper y estructura visual consistente.
 * Cuando se usa dentro de Form/LiveForm, puede leer errores automáticamente si
 * se provee el prop `name`.
 *
 * @example
 * // Uso básico
 * <FormField label="Nombre" required>
 *   <Input name="name" />
 * </FormField>
 *
 * @example
 * // Dentro de Form con validación automática
 * <Form initialValues={{ email: '' }} validationRules={{ email: { required: true } }}>
 *   <FormField name="email" label="Email">
 *     <Input name="email" />
 *   </FormField>
 * </Form>
 *
 * @example
 * // Layout inline
 * <FormField label="Activo" layout="inline">
 *   <SlideToggle name="active" />
 * </FormField>
 */
declare const FormField: React.ForwardRefExoticComponent<FormFieldProps & React.RefAttributes<HTMLDivElement>>;
export { FormField };
export default FormField;
//# sourceMappingURL=FormField.d.ts.map