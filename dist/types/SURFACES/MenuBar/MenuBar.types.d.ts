import type React from 'react';
/** Un ítem de un menú. Con `items` abre un submenú (▸); sin ellos, al hacer clic avisa su `id` por `onSelect`. */
export interface MenuBarItem {
    id: string;
    label: string;
    /** Marca ✓ (la opción elegida en un grupo de una sola elección) */
    checked?: boolean;
    disabled?: boolean;
    /** Una línea divisoria antes de este ítem */
    separator?: boolean;
    /** Texto gris a la derecha (un atajo, «…» para los que abren un formulario) */
    hint?: string;
    items?: MenuBarItem[];
}
/** Un menú de la barra (Valores ▾, Filtros ▾…). */
export interface MenuBarMenu {
    id: string;
    label: string;
    items: MenuBarItem[];
}
export interface MenuBarProps {
    menus: MenuBarMenu[];
    /** Clic en un ítem sin submenú: su id */
    onSelect?: (id: string) => void;
    className?: string;
    style?: React.CSSProperties;
}
//# sourceMappingURL=MenuBar.types.d.ts.map