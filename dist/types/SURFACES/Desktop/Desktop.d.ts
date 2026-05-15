import React from 'react';
import type { DesktopProps } from './Desktop.types';
/**
 * Desktop Component - W3F Framework
 *
 * Entorno de escritorio para gestionar ventanas (Window) con z-index dinámico.
 * La ventana enfocada siempre queda encima de las demás.
 * Requiere que cada Window hijo tenga una prop `key` única.
 *
 * @example
 * <Desktop background="#e8eaf6">
 *   <Window key="win1" title="Editor">...</Window>
 *   <Window key="win2" title="Terminal">...</Window>
 * </Desktop>
 */
declare const Desktop: React.ForwardRefExoticComponent<DesktopProps & React.RefAttributes<HTMLDivElement>>;
export { Desktop };
export default Desktop;
//# sourceMappingURL=Desktop.d.ts.map