import type React from 'react';
import type { PaperDesignGap } from './PaperDesign.types';
import { GAP_MAP, PAPER_DESIGN_CLASSES } from './PaperDesign.constants';

export function resolveGap(gap: PaperDesignGap | undefined): string | undefined {
    if (!gap) return undefined;
    return GAP_MAP[gap];
}

export function buildGridStyle(
    columns: number,
    gridTemplateColumns: string | undefined,
    gridTemplateRows: string | undefined,
    gridTemplateAreas: string | undefined,
    gap: PaperDesignGap | undefined,
    rowGap: PaperDesignGap | undefined,
    columnGap: PaperDesignGap | undefined,
    justifyContent: React.CSSProperties['justifyContent'],
    alignContent: React.CSSProperties['alignContent'],
    justifyItems: React.CSSProperties['justifyItems'],
    alignItems: React.CSSProperties['alignItems'],
    gridStyle: React.CSSProperties | undefined,
): React.CSSProperties {
    const raw: React.CSSProperties & Record<string, unknown> = {
        display: 'grid',
        gridTemplateColumns: gridTemplateColumns ?? (columns > 1 ? `repeat(${columns}, minmax(0, 1fr))` : undefined),
        gridTemplateRows,
        gridTemplateAreas: gridTemplateAreas
            ? gridTemplateAreas.trim().split('\n').map((row) => `"${row.trim()}"`).join(' ')
            : undefined,
        gap: resolveGap(gap),
        rowGap: resolveGap(rowGap),
        columnGap: resolveGap(columnGap),
        justifyContent,
        alignContent,
        justifyItems,
        alignItems,
        ...gridStyle,
    };

    // Remove undefined keys
    (Object.keys(raw) as (keyof typeof raw)[]).forEach((key) => {
        if (raw[key] === undefined) delete raw[key];
    });

    return raw as React.CSSProperties;
}

/**
 * Construye las clases del grid interno de PaperDesign.
 */
export function buildPaperDesignClasses(
    className?: string,
    unstyled?: boolean,
): string {
    const base = PAPER_DESIGN_CLASSES.grid;
    if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(' ');
    return [base, className].filter(Boolean).join(' ');
}
