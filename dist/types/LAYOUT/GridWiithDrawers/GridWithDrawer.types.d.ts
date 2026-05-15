import type React from 'react';
import type { DividerConfig } from '../GridWithDividers/GridWithDividers.types';
export interface ToggleButtonProps {
    isDrawerOpen: boolean;
    onToggle: () => void;
    className?: string;
}
export interface GridWithDrawerProps {
    children: React.ReactNode;
    templateColumns?: string;
    templateRows?: string;
    templateAreas?: string;
    /** Nombre del área del grid que actúa como drawer */
    drawerAreaName?: string;
    gap?: string;
    dividers?: DividerConfig[];
    style?: React.CSSProperties;
}
//# sourceMappingURL=GridWithDrawer.types.d.ts.map