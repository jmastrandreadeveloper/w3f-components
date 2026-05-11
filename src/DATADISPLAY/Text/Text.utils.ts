import type { TextAlign, TextLeading, TextDirection, TextWritingMode } from './Text.types';

/** Mapa de clases de alineación */
export const ALIGNMENT_MAP: Record<TextAlign, string> = {
    left: 'w3f-text-left',
    center: 'w3f-text-center',
    right: 'w3f-text-right',
    justify: 'w3f-text-justify',
};

/** Mapa de clases de espaciado de línea */
export const LEADING_MAP: Record<TextLeading, string> = {
    none: 'w3f-leading-none',
    tight: 'w3f-leading-tight',
    snug: 'w3f-leading-snug',
    normal: 'w3f-leading-normal',
    relaxed: 'w3f-leading-relaxed',
    loose: 'w3f-leading-loose',
};

/**
 * Construye las clases CSS para el componente Text.
 */
export const buildTextClasses = (
    customClasses?: string,
    align?: TextAlign,
    leading?: TextLeading,
    unstyled?: boolean,
): string => {
    const base = 'w3f-text';
    if (unstyled) return [base, `${base}--unstyled`, customClasses].filter(Boolean).join(' ');

    const classes: string[] = [base];

    if (customClasses) classes.push(customClasses);
    if (align && ALIGNMENT_MAP[align]) classes.push(ALIGNMENT_MAP[align]);
    if (leading && LEADING_MAP[leading]) classes.push(LEADING_MAP[leading]);

    return classes.filter(Boolean).join(' ');
};

/**
 * Construye estilos inline para dirección y modo de escritura.
 */
export const buildTextDirectionStyle = (
    direction?: TextDirection,
    writingMode?: TextWritingMode,
    existingStyle?: React.CSSProperties
): React.CSSProperties | undefined => {
    if (!direction && !writingMode) return existingStyle;

    const dirStyle: React.CSSProperties = { ...existingStyle };
    if (direction) dirStyle.direction = direction;
    if (writingMode) dirStyle.writingMode = writingMode;

    return dirStyle;
};
