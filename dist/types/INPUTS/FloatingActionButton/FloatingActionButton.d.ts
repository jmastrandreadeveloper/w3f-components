import React from 'react';
import type { FloatingActionButtonProps, FloatingActionButtonGroupProps } from './FloatingActionButton.types';
/**
 * FloatingActionButton Component - W3F Framework
 *
 * Botón de acción flotante (FAB) con soporte para Form y LiveForm.
 * Posicionado de forma fija en pantalla. Puede mostrar texto (FAB extended).
 *
 * @example
 * // FAB básico
 * <FloatingActionButton onClick={handleAdd} position="bottom-right">
 *   <Plus size={24} />
 * </FloatingActionButton>
 *
 * @example
 * // FAB extended con texto
 * <FloatingActionButton text="Guardar" color="success" extended>
 *   <Save size={20} />
 * </FloatingActionButton>
 *
 * @example
 * // Dentro de un Form como submit
 * <Form onSubmit={handleSubmit}>
 *   <Input name="title" />
 *   <FloatingActionButton type="submit" text="Publicar" color="primary">
 *     <Send size={20} />
 *   </FloatingActionButton>
 * </Form>
 */
declare const FloatingActionButton: React.FC<FloatingActionButtonProps>;
/**
 * FloatingActionButtonGroup Component - W3F Framework
 *
 * Contenedor para Speed Dial: agrupa FABs secundarios que se despliegan
 * animadamente cuando isOpen = true.
 *
 * @example
 * <FloatingActionButtonGroup isOpen={isOpen} position="bottom-right">
 *   <FloatingActionButton label="Editar" size="sm" className="w3f-fab--secondary-action">
 *     <Edit size={20} />
 *   </FloatingActionButton>
 *   <FloatingActionButton label="Eliminar" size="sm" color="danger" className="w3f-fab--secondary-action">
 *     <Trash size={20} />
 *   </FloatingActionButton>
 * </FloatingActionButtonGroup>
 */
export declare const FloatingActionButtonGroup: React.FC<FloatingActionButtonGroupProps>;
export { FloatingActionButton };
export default FloatingActionButton;
//# sourceMappingURL=FloatingActionButton.d.ts.map