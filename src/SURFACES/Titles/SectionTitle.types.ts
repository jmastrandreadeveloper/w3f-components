import type React from 'react';

export type SectionTitleAlign = 'left' | 'center' | 'right' | 'justify';

export interface SectionTitleProps {
    title: string;
    subtitle?: string;
    align?: SectionTitleAlign;
    /** Color de la línea separadora (CSS color value). Usa variable CSS por defecto. */
    borderColor?: string;
    /** If true, removes all visual/preset styles — only structural CSS remains. */
    unstyled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
