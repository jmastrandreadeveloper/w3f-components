import type React from 'react';
import type { PaperGridColor, PaperSize, PaperVariant } from './Paper.types';
import { PAPER_CLASSES } from './Paper.constants';

export function buildPaperClasses(
    variant: PaperVariant,
    gridColor: PaperGridColor,
    size: PaperSize,
    fullWidth: boolean,
    debug: boolean,
    className: string,
    unstyled?: boolean,
): string {
    if (unstyled) {
        return [PAPER_CLASSES.base, 'w3f-paper--unstyled', className].filter(Boolean).join(' ');
    }
    return [
        PAPER_CLASSES.base,
        variant !== 'default' && `w3f-paper--${variant}`,
        gridColor !== 'default' && `w3f-paper--grid-${gridColor}`,
        size !== 'md' && `w3f-paper--${size}`,
        fullWidth && PAPER_CLASSES.fullWidth,
        debug && PAPER_CLASSES.debug,
        className,
    ]
        .filter(Boolean)
        .join(' ');
}

export function buildPaperStyle(
    widthUnits: number | undefined,
    heightUnits: number | undefined,
    style: React.CSSProperties,
): React.CSSProperties {
    return {
        ...style,
        ...(widthUnits
            ? { width: `calc(var(--w3f-paper-grid-size) * ${widthUnits})`, maxWidth: 'none' }
            : {}),
        ...(heightUnits
            ? { height: `calc(var(--w3f-paper-grid-size) * ${heightUnits})` }
            : {}),
    };
}
