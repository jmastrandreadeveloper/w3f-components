import type { WindowGroupPosition } from './WindowGroup.types';
export declare function useGroupDrag(initialPosition?: WindowGroupPosition): {
    position: WindowGroupPosition;
    isDragging: boolean;
    groupRef: import("react").RefObject<HTMLDivElement | null>;
    handleDragStart: (e: React.MouseEvent) => void;
};
//# sourceMappingURL=WindowGroup.hooks.d.ts.map