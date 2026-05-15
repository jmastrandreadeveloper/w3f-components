import React from 'react';
import type { CheckboxProps } from './Checkbox.types';
/**
 * Checkbox Component - W3F Framework
 *
 * Checkbox personalizado compatible con Form y LiveForm mediante Context API.
 * Soporta contenido anidado que se muestra cuando está marcado.
 *
 * @example
 * // Uso independiente
 * <Checkbox label="Acepto términos" checked={accepted} onChange={setAccepted} />
 *
 * @example
 * // Con contenido anidado
 * <Checkbox label="Suscribirme a noticias">
 *   <Input name="email" label="Email de contacto" />
 * </Checkbox>
 *
 * @example
 * // Integrado con Form
 * <Form initialValues={{ terms: false }}>
 *   <Checkbox name="terms" label="Acepto los términos y condiciones">
 *     <p>Al aceptar, confirmas que leíste nuestras políticas.</p>
 *   </Checkbox>
 * </Form>
 */
declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>>;
export { Checkbox };
export default Checkbox;
//# sourceMappingURL=Checkbox.d.ts.map