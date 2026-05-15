import React from 'react';
import type { DrawerProps } from './Drawer.types';
/**
 * Drawer Component - W3F Framework
 *
 * Panel lateral/superior/inferior deslizable. Soporta variantes temporal,
 * persistente y permanente. Compatible con contenido anidado, Form y LiveForm.
 *
 * @example
 * // Temporal (modal)
 * <Drawer open={open} onClose={() => setOpen(false)}>
 *   <p>Contenido del drawer</p>
 * </Drawer>
 *
 * @example
 * // Con formulario integrado
 * <Drawer open={open} onClose={handleClose} anchor="right" width={400}>
 *   <Form initialValues={{ name: '' }} onSubmit={handleSubmit}>
 *     <Input name="name" label="Nombre" />
 *     <Button type="submit">Guardar</Button>
 *   </Form>
 * </Drawer>
 */
declare const Drawer: React.ForwardRefExoticComponent<DrawerProps & React.RefAttributes<HTMLDivElement>>;
export default Drawer;
export { Drawer };
//# sourceMappingURL=Drawer.d.ts.map