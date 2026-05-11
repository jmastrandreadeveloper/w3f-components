import type { MenuPosition } from './Menu.types';
import { MENU_CLASSES } from './Menu.constants';

export function buildDropdownClasses(position: MenuPosition): string {
    const positionClass = {
        right: MENU_CLASSES.dropdownRight,
        center: MENU_CLASSES.dropdownCenter,
        top: MENU_CLASSES.dropdownTop,
        left: '',
    }[position] || '';

    return [MENU_CLASSES.dropdown, positionClass].filter(Boolean).join(' ');
}

export function buildMenuClasses(
    position: MenuPosition,
    className?: string,
    unstyled?: boolean,
): string {
    if (unstyled) {
        return [MENU_CLASSES.container, 'w3f-menu--unstyled', className].filter(Boolean).join(' ');
    }
    return [MENU_CLASSES.container, className].filter(Boolean).join(' ');
}
