import type React from 'react';

// ─── Props del componente Section ─────────────────────────────────
export interface SectionProps {
    children: React.ReactNode;
    title?: string;
    /** Elemento HTML a renderizar */
    as?: React.ElementType;
    className?: string;
    style?: React.CSSProperties;
}

// ─── Props del componente SubSection ──────────────────────────────
export interface SubSectionProps {
    children: React.ReactNode;
    title?: string;
    className?: string;
    style?: React.CSSProperties;
}
