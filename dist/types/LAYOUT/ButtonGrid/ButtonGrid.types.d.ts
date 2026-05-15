import type React from 'react';
export type ButtonGridAlign = 'start' | 'center' | 'end' | 'stretch';
export interface ButtonGridProps {
    children: React.ReactNode;
    /** Alineación vertical de los items */
    align?: ButtonGridAlign;
    /** Elemento HTML a renderizar */
    as?: React.ElementType;
    className?: string;
    style?: React.CSSProperties;
}
//# sourceMappingURL=ButtonGrid.types.d.ts.map