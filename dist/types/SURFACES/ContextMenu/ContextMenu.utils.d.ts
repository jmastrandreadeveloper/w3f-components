export interface MenuPosition {
    x: number;
    y: number;
}
/**
 * Calcula la posición del menú contextual ajustada para evitar salirse de pantalla.
 */
export declare function calculateMenuPosition(clientX: number, clientY: number): MenuPosition;
/**
 * Calcula la posición del submenú relativo al item padre.
 */
export declare function calculateSubmenuPosition(itemRect: DOMRect, subItemCount: number): {
    left: string;
    top: number;
};
/**
 * Construye las clases del wrapper del ContextMenu.
 */
export declare function buildContextMenuClasses(className?: string, unstyled?: boolean): string;
//# sourceMappingURL=ContextMenu.utils.d.ts.map