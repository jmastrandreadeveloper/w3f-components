import React from 'react';
import type { ButtonToggleProps } from './ButtonToggle.types';
/**
 * ButtonToggle Component - W3F Framework
 *
 * Grupo de botones de selección (simple o múltiple).
 * Compatible con Form y LiveForm mediante Context API.
 *
 * @example
 * // Selección simple
 * <ButtonToggle
 *   options={[
 *     { value: 'day', label: 'Día' },
 *     { value: 'week', label: 'Semana' },
 *     { value: 'month', label: 'Mes' },
 *   ]}
 *   onSelect={(val) => setView(val)}
 * />
 *
 * @example
 * // Multi-selección dentro de un Form
 * <Form initialValues={{ tags: [] }}>
 *   <ButtonToggle
 *     name="tags"
 *     multiple
 *     options={[
 *       { value: 'react', label: 'React' },
 *       { value: 'vue', label: 'Vue' },
 *       { value: 'svelte', label: 'Svelte' },
 *     ]}
 *   />
 * </Form>
 */
declare const ButtonToggle: React.FC<ButtonToggleProps>;
export { ButtonToggle };
export default ButtonToggle;
//# sourceMappingURL=ButtonToggle.d.ts.map