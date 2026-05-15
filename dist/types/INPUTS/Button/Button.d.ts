import React from 'react';
import type { ButtonProps } from './Button.types';
/**
 * Button Component - W3F Framework
 *
 * Botón versátil compatible con Form y LiveForm mediante Context API.
 * Soporta variantes, colores semánticos, tamaños e iconos.
 *
 * @example
 * // Uso independiente
 * <Button variant="raised" color="primary" onClick={handleClick}>Guardar</Button>
 *
 * @example
 * // Dentro de un Form como submit
 * <Form onSubmit={handleSubmit}>
 *   <Input name="email" />
 *   <Button type="submit" color="success">Enviar</Button>
 * </Form>
 *
 * @example
 * // Con icono
 * <Button icon={<Plus size={16} />} iconPosition="left" variant="outline">
 *   Agregar
 * </Button>
 */
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { Button };
export default Button;
//# sourceMappingURL=Button.d.ts.map