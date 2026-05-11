import { GRID_DRAWER_CLASSES } from './GridWithDrawer.constants';

/**
 * Construye las clases del wrapper del drawer.
 */
export function buildDrawerWrapperClasses(
    isDrawerArea: boolean,
    isDrawerOpen: boolean,
): string {
    return [
        GRID_DRAWER_CLASSES.wrapper,
        isDrawerArea ? GRID_DRAWER_CLASSES.drawerArea : '',
        isDrawerArea && !isDrawerOpen ? GRID_DRAWER_CLASSES.collapsed : '',
    ].filter(Boolean).join(' ');
}
