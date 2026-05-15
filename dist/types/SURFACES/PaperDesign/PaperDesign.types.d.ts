import type React from 'react';
import type { PaperGridColor, PaperSize, PaperVariant } from '../Paper/Paper.types';
export type PaperDesignGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export interface PaperDesignProps {
    children: React.ReactNode;
    className?: string;
    /** Variante visual de la hoja cuadriculada */
    variant?: PaperVariant;
    /** Color de la cuadrícula */
    gridColor?: PaperGridColor;
    /** Tamaño predefinido del papel */
    size?: PaperSize;
    fullWidth?: boolean;
    debug?: boolean;
    widthUnits?: number;
    heightUnits?: number;
    style?: React.CSSProperties;
    /** Número de columnas del grid (shorthand: repeat(N, 1fr)) */
    columns?: number;
    /** Definición explícita de columnas (sobreescribe `columns`) */
    gridTemplateColumns?: string;
    /** Definición explícita de filas */
    gridTemplateRows?: string;
    /** Template areas del grid */
    gridTemplateAreas?: string;
    /** Espaciado entre celdas */
    gap?: PaperDesignGap;
    rowGap?: PaperDesignGap;
    columnGap?: PaperDesignGap;
    justifyContent?: React.CSSProperties['justifyContent'];
    alignContent?: React.CSSProperties['alignContent'];
    justifyItems?: React.CSSProperties['justifyItems'];
    alignItems?: React.CSSProperties['alignItems'];
    /** Estilo inline del contenedor de grid interno */
    gridStyle?: React.CSSProperties;
    /** If true, removes all visual/preset styles — only structural CSS remains. */
    unstyled?: boolean;
}
//# sourceMappingURL=PaperDesign.types.d.ts.map