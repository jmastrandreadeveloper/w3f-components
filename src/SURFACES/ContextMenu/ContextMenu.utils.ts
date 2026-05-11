import { MENU_WIDTH, CONTEXT_MENU_CLASSES } from './ContextMenu.constants';

export interface MenuPosition {
    x: number;
    y: number;
}

/**
 * Calcula la posición del menú contextual ajustada para evitar salirse de pantalla.
 */
export function calculateMenuPosition(clientX: number, clientY: number): MenuPosition {
    let x = clientX;
    const y = clientY;
    if (x + MENU_WIDTH > window.innerWidth) x -= MENU_WIDTH;
    return { x, y };
}

/**
 * Calcula la posición del submenú relativo al item padre.
 */
export function calculateSubmenuPosition(
    itemRect: DOMRect,
    subItemCount: number,
): { left: string; top: number } {
    const submenuWidth = MENU_WIDTH;
    const submenuHeight = subItemCount * 40;

    let left = '100%';
    let top = 0;

    if (itemRect.right + submenuWidth > window.innerWidth) {
        left = '-100%';
    }

    if (itemRect.top + submenuHeight > window.innerHeight) {
        top = -(submenuHeight - itemRect.height);
        if (itemRect.top + top < 0) {
            top = -itemRect.top + 10;
        }
    }

    return { left, top };
}

/**
 * Construye las clases del wrapper del ContextMenu.
 */
export function buildContextMenuClasses(
    className?: string,
    unstyled?: boolean,
): string {
    const base = CONTEXT_MENU_CLASSES.wrapper;
    if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(' ');
    return [base, className].filter(Boolean).join(' ');
}
