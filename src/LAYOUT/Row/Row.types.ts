import type React from 'react';

// ─── Props del componente Row ─────────────────────────────────────
export interface RowProps {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

// ─── Props del componente Col ─────────────────────────────────────
export interface ColProps {
    children?: React.ReactNode;
    className?: string;
    /** Columnas base (Desktop-first) w3f-col-X */
    col?: number;
    /** Breakpoint sm: w3f-sm:col-X */
    sm?: number;
    /** Breakpoint md: w3f-md:col-X */
    md?: number;
    /** Breakpoint lg: w3f-lg:col-X */
    lg?: number;
    style?: React.CSSProperties;
}
