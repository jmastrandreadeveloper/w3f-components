import type React from 'react';

export type TagColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'gray';
export type TagVariant = 'solid' | 'outlined' | 'ghost' | 'soft';

export interface TagProps {
    /** Color de la etiqueta */
    color: TagColor;
    /** Variante de color light */
    light?: boolean;
    /** Visual variant of the tag */
    variant?: TagVariant;
    /** Contenido de la etiqueta */
    children: React.ReactNode;
    /** Clases CSS adicionales */
    className?: string;
    /** Estilos en línea adicionales */
    style?: React.CSSProperties;
    /** When true, strips visual styles — compose appearance via trait classes. */
    unstyled?: boolean;
    /** Bridge binding ID — connects this component to business logic via the Bridge. */
    bindId?: string;
    [key: string]: unknown;
}
