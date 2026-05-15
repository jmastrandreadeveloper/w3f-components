import type React from 'react';
export type QuoteColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'light' | 'dark';
export type QuoteSize = 'sm' | 'md' | 'lg';
export interface QuotesProps {
    children: React.ReactNode;
    /** Texto de la cita (alternativa a children) */
    text?: string;
    /** Autor o fuente de la cita */
    author?: string;
    /** Color temático de la barra lateral */
    color?: QuoteColor;
    /** Tamaño de la cita */
    size?: QuoteSize;
    /** Mostrar comillas decorativas */
    showQuoteMark?: boolean;
    /** Icono personalizado en lugar de comillas */
    icon?: React.ReactNode;
    /** Clases CSS adicionales */
    className?: string;
    /** If true, removes all visual/preset styles — only structural CSS remains. */
    unstyled?: boolean;
}
//# sourceMappingURL=Quotes.types.d.ts.map