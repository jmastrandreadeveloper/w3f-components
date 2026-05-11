import type React from 'react';

// ─── Props del componente ─────────────────────────────────────────
export interface PanelProps {
    children: React.ReactNode;
    /** Color de fondo del panel */
    color?: string;
    /** Aplica sombra más pronunciada (w3f-shadow-md) */
    card?: boolean;
    /** Aplica redondeo grande (w3f-round-2xl) */
    round?: boolean;
    /** Aplica padding grande (w3f-p-6). Por defecto es true. */
    padding?: boolean;
    /** Aplica borde explícito (w3f-border) */
    border?: boolean;
    className?: string;
}
