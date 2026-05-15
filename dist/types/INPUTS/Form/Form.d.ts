import React from 'react';
import type { FormProps, FormContextValue, FormDispatchValue, FormMetaValue, FormFieldStore } from './Form.types';
export type { FormValues, FormErrors, FormTouched, FormContextValue, FormProps, FormHelpers, FormSubmitHandler, ValidationRule, ValidationRules, FormDispatchValue, FormMetaValue, FormFieldStore, } from './Form.types';
/** Stable dispatch functions — identity never changes */
export declare const FormDispatchContext: React.Context<FormDispatchValue | null>;
/** Meta state: errors, touched, isSubmitting — changes less than values */
export declare const FormMetaContext: React.Context<FormMetaValue | null>;
/** Per-field subscription store — avoids full re-render on keystroke */
export declare const FormFieldStoreContext: React.Context<FormFieldStore | null>;
export declare const FormContext: React.Context<FormContextValue | null>;
/**
 * Form Component - W3F Framework
 *
 * Formulario con Context API que gestiona valores, errores y estado touched.
 * Soporta validación integrada y submit handler con helpers.
 *
 * Performance: uses 4 contexts to minimize re-renders:
 * - FormDispatchContext: stable refs (never triggers re-render)
 * - FormMetaContext: errors/touched/isSubmitting (changes infrequently)
 * - FormFieldStoreContext: per-field subscription store (fields subscribe individually)
 * - FormContext: backward-compatible facade (combines all — use split contexts for perf)
 *
 * @example
 * <Form
 *   initialValues={{ email: '', password: '' }}
 *   onSubmit={(values, { setErrors }) => console.log(values)}
 *   className="w3f-space-y-4"
 * >
 *   <Input name="email" label="Email" />
 *   <Button type="submit">Enviar</Button>
 * </Form>
 */
declare const Form: React.FC<FormProps>;
export { Form };
export default Form;
//# sourceMappingURL=Form.d.ts.map