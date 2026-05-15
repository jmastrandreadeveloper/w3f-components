import type React from 'react';
import type { MasonryVariant, MasonryItemSize, MasonryBreakpoints } from './Masonry.types';
export declare function buildMasonryRootClasses(variant: MasonryVariant, className?: string, unstyled?: boolean): string;
export declare function buildMasonryRootStyle(variant: MasonryVariant, opts: {
    columns?: MasonryBreakpoints;
    gap?: string;
    padding?: string;
    baseColumnWidth?: string;
    minCardWidth?: string;
    gridColumns?: number;
    style?: React.CSSProperties;
}): React.CSSProperties;
export declare function buildMasonryItemClasses(variant: MasonryVariant, size: MasonryItemSize, className?: string): string;
export declare function buildMasonryCardClasses(hover: boolean, className?: string): string;
//# sourceMappingURL=Masonry.utils.d.ts.map