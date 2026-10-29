import type { WindowGroupPosition } from './WindowGroup.types';
export declare function useGroupDrag(initialPosition?: WindowGroupPosition, onMove?: (position: WindowGroupPosition) => void): {
    position: WindowGroupPosition;
    isDragging: boolean;
    groupRef: import("react").RefObject<HTMLDivElement | null>;
    handleDragStart: (e: React.MouseEvent) => void;
    moveBy: (dx: number, dy: number) => void;
};
/**
 * FL18 (w3f-data-analysis): «Sin taparse» (windowLayout="avoid" del Desktop) también para un grupo: al aparecer, cuando
 * su ventana principal crece (llegaron los datos) o cuando otra crece encima, el grupo entero se corre al lugar
 * libre más cercano. Antes solo participaban las ventanas sueltas: los datasets nacían donde decía la app, con el
 * alto de siempre, y se tapaban.
 */
export declare function useGroupAvoid(groupRef: React.RefObject<HTMLDivElement>, moveBy: (dx: number, dy: number) => void, isDragging: boolean): void;
//# sourceMappingURL=WindowGroup.hooks.d.ts.map