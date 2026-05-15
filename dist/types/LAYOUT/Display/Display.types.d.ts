import type React from 'react';
export type DisplayPosition = 'w3f-position-topleft' | 'w3f-position-topright' | 'w3f-position-bottomleft' | 'w3f-position-bottomright' | 'w3f-position-middle' | 'w3f-position-top' | 'w3f-position-bottom' | 'w3f-position-left' | 'w3f-position-right';
export interface DisplayContainerProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}
export interface DisplayItemProps {
    children: React.ReactNode;
    /** Clase de posición w3f-position-* */
    position?: DisplayPosition;
    className?: string;
    style?: React.CSSProperties;
}
//# sourceMappingURL=Display.types.d.ts.map