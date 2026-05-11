import type { QuoteColor, QuoteSize } from './Quotes.types';

/**
 * Construye las clases CSS para el componente Quotes.
 */
export const buildQuoteClasses = (
    color: QuoteColor,
    size: QuoteSize,
    unstyled?: boolean,
    className?: string,
): string => {
    const base = 'w3f-quote';
    if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(' ');

    const classes: string[] = [
        base,
        `w3f-quote-${size}`,
        `w3f-border-l-4`,
        `w3f-border-${color}`,
    ];

    if (className) classes.push(className);

    return classes.filter(Boolean).join(' ');
};

/**
 * Devuelve la clase de color de fondo suave para la cita.
 */
export const getQuoteBgClass = (color: QuoteColor): string => {
    return `w3f-bg-${color}-subtle`;
};
