import type React from 'react';
import type { WindowProps } from '../Window/Window.types';

export type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface WindowGridBreakpoints {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    [key: string]: number | undefined;
}

export interface WindowGridColumns {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    [key: string]: number | undefined;
}

export interface WindowGridProps extends WindowProps {
    /** If true, removes all visual/preset styles — only structural CSS remains. */
    unstyled?: boolean;
    // CSS Grid props
    gridTemplateColumns?: string;
    gridTemplateRows?: string;
    gridTemplateAreas?: string;
    gap?: string;
    rowGap?: string;
    columnGap?: string;
    autoColumns?: string;
    autoRows?: string;
    autoFlow?: React.CSSProperties['gridAutoFlow'];
    justifyContent?: React.CSSProperties['justifyContent'];
    alignContent?: React.CSSProperties['alignContent'];
    justifyItems?: React.CSSProperties['justifyItems'];
    alignItems?: React.CSSProperties['alignItems'];

    // Responsive
    responsiveBreakpoints?: WindowGridBreakpoints;
    responsiveColumns?: WindowGridColumns;
    /** Si true, recalcula las columnas automáticamente según el ancho de la ventana */
    autoResponsive?: boolean;
    /** Callback adicional al cambiar el tamaño */
    onResize?: (dimensions: { width: number; height: number }, breakpoint: string) => void;
}
