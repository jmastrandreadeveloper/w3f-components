import type { UseBackdropResult } from './Backdrop.types';
/**
 * Hook para controlar el estado open/close del Backdrop.
 */
export declare const useBackdrop: (initialOpen?: boolean) => UseBackdropResult;
/**
 * Hook que bloquea el scroll del body cuando está activo.
 * Reutilizable para cualquier componente que necesite bloquear scroll.
 */
export declare const useScrollLock: (locked: boolean) => void;
//# sourceMappingURL=Backdrop.hooks.d.ts.map