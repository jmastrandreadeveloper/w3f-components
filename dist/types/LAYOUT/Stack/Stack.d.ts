import React from 'react';
import type { StackProps } from './Stack.types';
export type { StackProps, StackSize, StackAlign, StackJustify } from './Stack.types';
/**
 * Stack — Contenedor flex para separar elementos vertical u horizontalmente.
 *
 * @example
 * // Horizontal con gap libre y alineación
 * <Stack horizontal gap="1rem" justify="end" align="center">
 *   <Button>Cancelar</Button>
 *   <Button color="primary">Guardar</Button>
 * </Stack>
 *
 * @example
 * // Vertical compacto
 * <Stack size="sm">
 *   <Input name="email" />
 *   <Input name="password" />
 * </Stack>
 */
declare const Stack: React.FC<StackProps>;
export { Stack };
export default Stack;
//# sourceMappingURL=Stack.d.ts.map