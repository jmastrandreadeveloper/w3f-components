import React from 'react';
import type { ButtonGroupProps } from './ButtonGroup.types';
/**
 * ButtonGroup Component - W3F Framework
 *
 * Agrupa botones visualmente y hereda props a los hijos.
 * Compatible con Form y LiveForm mediante Context API.
 * Usa data-attributes para aplicar los bordes redondeados del CSS.
 *
 * @example
 * // Grupo horizontal básico
 * <ButtonGroup variant="outline" color="primary">
 *   <Button>Anterior</Button>
 *   <Button>Siguiente</Button>
 * </ButtonGroup>
 *
 * @example
 * // Grupo vertical con colores semánticos
 * <ButtonGroup orientation="vertical" color="success">
 *   <Button>Guardar</Button>
 *   <Button color="danger">Cancelar</Button>
 * </ButtonGroup>
 *
 * @example
 * // Dentro de un Form
 * <Form onSubmit={handleSubmit}>
 *   <ButtonGroup>
 *     <Button type="submit">Enviar</Button>
 *     <Button type="reset">Limpiar</Button>
 *   </ButtonGroup>
 * </Form>
 */
declare const ButtonGroup: React.FC<ButtonGroupProps>;
export { ButtonGroup };
export default ButtonGroup;
//# sourceMappingURL=ButtonGroup.d.ts.map