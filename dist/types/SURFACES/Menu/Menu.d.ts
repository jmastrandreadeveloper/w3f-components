import React from 'react';
import type { MenuBarCategoryProps, MenuItemProps } from './Menu.types';
export declare const MenuItem: React.FC<MenuItemProps>;
/**
 * MenuBarCategory Component - W3F Framework
 *
 * Categoría de barra de menú con desplegable y soporte para submenús multinivel.
 *
 * @example
 * <MenuBarCategory
 *   label="Archivo"
 *   items={[
 *     { label: 'Nuevo', onClick: handleNew },
 *     { label: 'Abrir', onClick: handleOpen },
 *     { label: 'Exportar', subItems: [{ label: 'PDF' }, { label: 'PNG' }] },
 *   ]}
 *   onSelect={console.log}
 * />
 */
export declare const MenuBarCategory: React.ForwardRefExoticComponent<MenuBarCategoryProps & React.RefAttributes<HTMLDivElement>>;
export default MenuBarCategory;
//# sourceMappingURL=Menu.d.ts.map