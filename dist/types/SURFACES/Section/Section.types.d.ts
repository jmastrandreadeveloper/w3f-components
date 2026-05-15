import type React from 'react';
export interface SectionProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    /** If true, removes all visual/preset styles — only structural CSS remains. */
    unstyled?: boolean;
    className?: string;
    card?: boolean;
    round?: boolean;
    /** Color de fondo del panel */
    color?: string;
    border?: boolean;
    /** Props adicionales pasadas al Panel subyacente */
    [key: string]: unknown;
}
//# sourceMappingURL=Section.types.d.ts.map