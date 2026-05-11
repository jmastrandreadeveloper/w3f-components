import type React from 'react';
import type { DividerConfig } from '../GridWithDividers/GridWithDividers.types';

// ─── Props del componente ToggleButton ────────────────────────────
export interface ToggleButtonProps {
    isDrawerOpen: boolean;
    onToggle: () => void;
    className?: string;
}

// ─── Props del componente GridWithDrawer ──────────────────────────
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
