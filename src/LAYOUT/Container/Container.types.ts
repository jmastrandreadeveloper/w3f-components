import type React from 'react';

// ─── Props del componente ─────────────────────────────────────────
export interface ContainerProps {
    children: React.ReactNode;
    /** Elemento HTML a renderizar (e.g., 'div', 'section', 'header', 'form') */
    as?: React.ElementType;
    className?: string;
    style?: React.CSSProperties;
}
