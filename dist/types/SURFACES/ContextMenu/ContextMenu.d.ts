import React from 'react';
import type { ContextMenuProps, ContextMenuItemProps } from './ContextMenu.types';
export declare const ContextMenuItem: React.FC<ContextMenuItemProps>;
/**
 * ContextMenu Component - W3F Framework
 *
 * Menú contextual que se activa con clic derecho sobre el área contenida.
 * Soporta submenús multinivel y navegación por teclado (Escape).
 *
 * @example
 * <ContextMenu
 *   items={[
 *     { label: 'Copiar', onClick: handleCopy },
 *     { label: 'Pegar', onClick: handlePaste },
 *     { label: 'Más', subItems: [{ label: 'Opción A' }] },
 *   ]}
 *   onMenuAction={console.log}
 * >
 *   <div>Haz clic derecho aquí</div>
 * </ContextMenu>
 */
export declare const ContextMenu: React.ForwardRefExoticComponent<ContextMenuProps & React.RefAttributes<HTMLDivElement>>;
export default ContextMenu;
//# sourceMappingURL=ContextMenu.d.ts.map