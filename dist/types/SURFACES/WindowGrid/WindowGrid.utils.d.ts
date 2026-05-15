import type React from 'react';
export interface GridStyleOptions {
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
}
export declare function buildGridStyle(options: GridStyleOptions, resolvedColumns: string, autoResponsive: boolean): React.CSSProperties;
/**
 * Construye las clases del WindowGrid combinando Window classes + grid base.
 */
export declare function buildWindowGridClasses(windowClasses: string, gridBaseClass: string, unstyled?: boolean): string;
//# sourceMappingURL=WindowGrid.utils.d.ts.map