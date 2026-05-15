import type React from 'react';
import type { PaperDesignGap } from './PaperDesign.types';
export declare function resolveGap(gap: PaperDesignGap | undefined): string | undefined;
export declare function buildGridStyle(columns: number, gridTemplateColumns: string | undefined, gridTemplateRows: string | undefined, gridTemplateAreas: string | undefined, gap: PaperDesignGap | undefined, rowGap: PaperDesignGap | undefined, columnGap: PaperDesignGap | undefined, justifyContent: React.CSSProperties['justifyContent'], alignContent: React.CSSProperties['alignContent'], justifyItems: React.CSSProperties['justifyItems'], alignItems: React.CSSProperties['alignItems'], gridStyle: React.CSSProperties | undefined): React.CSSProperties;
/**
 * Construye las clases del grid interno de PaperDesign.
 */
export declare function buildPaperDesignClasses(className?: string, unstyled?: boolean): string;
//# sourceMappingURL=PaperDesign.utils.d.ts.map