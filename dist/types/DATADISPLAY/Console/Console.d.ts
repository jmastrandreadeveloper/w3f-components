import React from 'react';
import type { ConsoleProps } from './Console.types';
export { useConsole } from './Console.hooks';
export type { ConsoleProps, ConsoleMessage, ConsoleLevel, ConsoleLevelFilter, ConsoleContextValue, } from './Console.types';
/**
 * Console — Terminal de log estilo OS con soporte para niveles, filtros,
 * búsqueda y children que usan useConsole().
 *
 * Actúa como Provider: cualquier componente dentro (Form, LiveForm, etc.)
 * puede usar `useConsole()` para enviar mensajes.
 *
 * @example
 * <Console title="API Log" height="300px">
 *   <MyFormWithConsole />
 * </Console>
 *
 * // Dentro de MyFormWithConsole:
 * const { success, error } = useConsole();
 * <Form onSubmit={async (values) => {
 *   const result = await api.post(values);
 *   result.ok ? success(result.data, 'POST /api') : error(result.error);
 * }}>
 */
declare const Console: React.ForwardRefExoticComponent<ConsoleProps & React.RefAttributes<HTMLDivElement>>;
export { Console };
export default Console;
//# sourceMappingURL=Console.d.ts.map