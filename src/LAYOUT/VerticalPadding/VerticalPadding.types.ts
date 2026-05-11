import type React from 'react';

// ─── Size values ──────────────────────────────────────────────────
export type VerticalPaddingSize =
    | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
    | '0' | '1' | '2' | '4' | '6' | '8' | '12' | '16' | 'none';

// ─── Props del componente ─────────────────────────────────────────
export interface VerticalPaddingProps {
    children?: React.ReactNode;
    /** Tamaño de padding vertical (alias o número) */
    size?: VerticalPaddingSize;
    /** Clase directa de padding (ej: 'w3f-p-8') */
    utilityClass?: string;
    className?: string;
}
