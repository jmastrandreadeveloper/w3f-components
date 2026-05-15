import type React from 'react';
export type PaperVariant = 'default' | 'plain' | 'subtle' | 'bold' | 'elevated' | 'flat' | 'rounded';
export type PaperGridColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
export type PaperSize = 'sm' | 'md' | 'lg' | 'xl';
export interface PaperProps {
    children: React.ReactNode;
    className?: string;
    variant?: PaperVariant;
    gridColor?: PaperGridColor;
    size?: PaperSize;
    fullWidth?: boolean;
    debug?: boolean;
    /** Ancho en unidades de cuadrícula (--w3f-paper-grid-size = 18.9px) */
    widthUnits?: number;
    /** Alto en unidades de cuadrícula */
    heightUnits?: number;
    style?: React.CSSProperties;
    /** When true, strips visual styles — compose appearance via trait classes. */
    unstyled?: boolean;
}
//# sourceMappingURL=Paper.types.d.ts.map