import type React from 'react';
export type StackSize = 'default' | 'sm';
export type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export interface StackProps {
    children?: React.ReactNode;
    /** Elemento HTML o componente a renderizar. Por defecto 'div'. */
    as?: React.ElementType;
    /** Si es true, usa dirección horizontal. Por defecto vertical. */
    horizontal?: boolean;
    /** Alternativa a horizontal: 'row' | 'column'. */
    direction?: 'row' | 'column';
    /** 'default' o 'sm' — solo aplica a pila vertical cuando no se usa gap. */
    size?: StackSize;
    /** Gap por token del sistema (ej. '4' → w3f-gap-4). Ignorado si se usa gap. */
    spacing?: string;
    /** Gap libre (ej. '1rem', '16px', '0.5rem'). Tiene prioridad sobre spacing. */
    gap?: string;
    /** align-items: start | center | end | stretch | baseline */
    align?: StackAlign | string;
    /** Alias de align (compatibilidad con codegen). */
    alignItems?: StackAlign | string;
    /** justify-content: start | center | end | between | around | evenly */
    justify?: StackJustify | string;
    /** Alias de justify (compatibilidad con codegen). */
    justifyContent?: StackJustify | string;
    className?: string;
    style?: React.CSSProperties;
    flex?: number | string;
    overflow?: string;
    overflowY?: string;
    overflowX?: string;
    padding?: string;
    paddingTop?: string;
    paddingBottom?: string;
    paddingLeft?: string;
    paddingRight?: string;
    minWidth?: string;
    maxWidth?: string;
    width?: string;
    height?: string;
    minHeight?: string;
    maxHeight?: string;
    background?: string;
    border?: string;
    borderRight?: string;
    borderLeft?: string;
    borderTop?: string;
    borderBottom?: string;
    borderRadius?: string;
    userSelect?: string;
    whiteSpace?: string;
    cursor?: string;
}
//# sourceMappingURL=Stack.types.d.ts.map