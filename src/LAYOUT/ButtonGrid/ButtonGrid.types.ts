import type React from 'react';

// ─── Align values ─────────────────────────────────────────────────
export type ButtonGridAlign = 'start' | 'center' | 'end' | 'stretch';

// ─── Props del componente ─────────────────────────────────────────
export interface ButtonGridProps {
    children: React.ReactNode;
    /** Alineación vertical de los items */
    align?: ButtonGridAlign;
    /** Elemento HTML a renderizar */
    as?: React.ElementType;
    className?: string;
    style?: React.CSSProperties;
}
