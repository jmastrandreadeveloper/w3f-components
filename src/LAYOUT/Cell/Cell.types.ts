import type React from 'react';

// ─── Props del componente CellRow ─────────────────────────────────
export interface CellRowProps {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

// ─── Props del componente Cell ────────────────────────────────────
export interface CellProps {
    children?: React.ReactNode;
    /** Aplica w3f-cell-content (Flexbox, height 100%) */
    content?: boolean;
    /** Aplica w3f-cell-center (centrado horizontal y vertical) */
    center?: boolean;
    /** Aplica w3f-cell-vcenter (solo centrado vertical) */
    vCenter?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
