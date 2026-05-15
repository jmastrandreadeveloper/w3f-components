import type React from 'react';
export interface SectionProps {
    children: React.ReactNode;
    title?: string;
    /** Elemento HTML a renderizar */
    as?: React.ElementType;
    className?: string;
    style?: React.CSSProperties;
}
export interface SubSectionProps {
    children: React.ReactNode;
    title?: string;
    className?: string;
    style?: React.CSSProperties;
}
//# sourceMappingURL=Section.types.d.ts.map