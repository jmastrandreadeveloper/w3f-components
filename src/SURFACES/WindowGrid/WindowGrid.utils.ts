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

export function buildGridStyle(
    options: GridStyleOptions,
    resolvedColumns: string,
    autoResponsive: boolean,
): React.CSSProperties {
    const raw: React.CSSProperties & Record<string, unknown> = {
        display: 'grid',
        gridTemplateColumns: autoResponsive ? resolvedColumns : (options.gridTemplateColumns ?? resolvedColumns),
        gridTemplateRows: options.gridTemplateRows,
        gridTemplateAreas: options.gridTemplateAreas
            ? options.gridTemplateAreas.trim().split('\n').map((row) => `"${row.trim()}"`).join(' ')
            : undefined,
        gap: options.gap,
        rowGap: options.rowGap,
        columnGap: options.columnGap,
        gridAutoColumns: options.autoColumns,
        gridAutoRows: options.autoRows,
        gridAutoFlow: options.autoFlow,
        justifyContent: options.justifyContent,
        alignContent: options.alignContent,
        justifyItems: options.justifyItems,
        alignItems: options.alignItems,
        height: '100%',
        width: '100%',
    };

    // Remove undefined keys
    (Object.keys(raw) as (keyof typeof raw)[]).forEach((key) => {
        if (raw[key] === undefined) delete raw[key];
    });

    return raw as React.CSSProperties;
}

/**
 * Construye las clases del WindowGrid combinando Window classes + grid base.
 */
export function buildWindowGridClasses(
    windowClasses: string,
    gridBaseClass: string,
    unstyled?: boolean,
): string {
    if (unstyled) return [windowClasses, gridBaseClass, `${gridBaseClass}--unstyled`].filter(Boolean).join(' ');
    return [windowClasses, gridBaseClass].join(' ');
}
