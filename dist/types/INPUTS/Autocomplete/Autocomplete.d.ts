import React from 'react';
import type { AutocompleteProps } from './Autocomplete.types';
/**
 * Autocomplete Component - W3F Framework
 *
 * Input con búsqueda y sugerencias en dropdown. Compatible con Form y LiveForm.
 * Soporta navegación por teclado, resaltado de coincidencias y estado de carga.
 *
 * @example
 * // Uso independiente
 * <Autocomplete
 *   data={['Argentina', 'Brasil', 'Chile']}
 *   onSelect={(item) => console.log(item)}
 *   placeholder="Buscar país..."
 *   clearable
 * />
 *
 * @example
 * // Con objetos y optionLabel
 * <Autocomplete
 *   data={[{ id: 1, name: 'React' }, { id: 2, name: 'Vue' }]}
 *   optionLabel="name"
 *   onSelect={(item) => setFramework(item)}
 * />
 *
 * @example
 * // Integrado con Form
 * <Form initialValues={{ country: '' }}>
 *   <Autocomplete
 *     name="country"
 *     data={countries}
 *     optionLabel="label"
 *     placeholder="Seleccionar país"
 *   />
 * </Form>
 */
declare const Autocomplete: React.ForwardRefExoticComponent<AutocompleteProps & React.RefAttributes<HTMLDivElement>>;
export { Autocomplete };
export default Autocomplete;
//# sourceMappingURL=Autocomplete.d.ts.map