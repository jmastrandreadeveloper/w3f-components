import type React from 'react';

export type TextAlign = 'left' | 'center' | 'right' | 'justify';
export type TextLeading = 'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose';
export type TextDirection = 'ltr' | 'rtl';
export type TextWritingMode = 'horizontal-tb' | 'vertical-rl' | 'vertical-lr' | 'sideways-rl' | 'sideways-lr';

export interface TextProps {
    /** Contenido del texto (alternativa legacy basada en array) */
    content?: React.ReactNode | React.ReactNode[];
    /** Elemento HTML a usar como contenedor */
    element?: React.ElementType;
    /** Clases W3.CSS para el contenedor */
    customClasses?: string;
    /** Alineación del texto */
    align?: TextAlign;
    /** Espaciado de línea */
    leading?: TextLeading;
    /** Dirección del texto (ltr o rtl) */
    direction?: TextDirection;
    /** Modo de escritura (horizontal o vertical) */
    writingMode?: TextWritingMode;
    /** Contenido estándar React */
    children?: React.ReactNode;
    /** If true, removes all visual/preset styles — only structural CSS remains. */
    unstyled?: boolean;
    /** Bridge binding ID — connects this component to business logic via the Bridge. */
    bindId?: string;
    [key: string]: unknown;
}
