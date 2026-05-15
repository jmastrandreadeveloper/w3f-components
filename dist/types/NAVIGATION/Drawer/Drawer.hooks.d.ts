import type { DrawerVariant, DrawerCloseReason } from './Drawer.types';
/**
 * Hook que gestiona el ciclo de vida de montaje/desmontaje animado del Drawer.
 */
export declare function useDrawerAnimation(open: boolean, variant: DrawerVariant): {
    mounted: boolean;
    visible: boolean;
};
/**
 * Hook que registra el listener de tecla ESC para cerrar el Drawer.
 */
export declare function useDrawerEscKey(open: boolean, closeOnEsc: boolean, variant: DrawerVariant, onClose: ((e: Event, reason: DrawerCloseReason) => void) | undefined): void;
/**
 * Hook que bloquea el scroll del body cuando el Drawer temporal está abierto.
 */
export declare function useDrawerBodyScroll(open: boolean, variant: DrawerVariant): void;
/**
 * Hook que gestiona el focus trap para el Drawer temporal.
 */
export declare function useDrawerFocusTrap(open: boolean, variant: DrawerVariant, drawerRef: React.RefObject<HTMLElement | null>): void;
//# sourceMappingURL=Drawer.hooks.d.ts.map