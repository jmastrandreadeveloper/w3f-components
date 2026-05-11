import React from 'react';
import type { QuotesProps } from './Quotes.types';
import { QUOTES_DEFAULTS } from './Quotes.constants';
import { buildQuoteClasses, getQuoteBgClass } from './Quotes.utils';

/**
 * Componente Quotes
 * Muestra una cita con estilo blockquote, inspirado en W3CSS Quotes.
 * Soporta barra lateral de color, comillas decorativas, autor, e icono personalizado.
 */
const Quotes: React.FC<QuotesProps> = ({
    children,
    text,
    author,
    color = QUOTES_DEFAULTS.color,
    size = QUOTES_DEFAULTS.size,
    showQuoteMark = QUOTES_DEFAULTS.showQuoteMark,
    icon,
    className,
    unstyled = QUOTES_DEFAULTS.unstyled,
}) => {
    const quoteClasses = buildQuoteClasses(color, size, unstyled, className);
    const bgClass = unstyled ? '' : getQuoteBgClass(color);

    return (
        <blockquote className={`${quoteClasses} ${bgClass}`}>
            <div className="w3f-quote-content">
                {/* Comillas decorativas o icono */}
                {showQuoteMark && !icon && (
                    <span className={`w3f-quote-mark w3f-text-${color}`} aria-hidden="true">
                        ❝
                    </span>
                )}
                {icon && (
                    <span className="w3f-quote-icon" aria-hidden="true">
                        {icon}
                    </span>
                )}

                {/* Texto de la cita */}
                <div className="w3f-quote-text">
                    <p>{children || text}</p>
                </div>
            </div>

            {/* Autor */}
            {author && (
                <footer className="w3f-quote-author">
                    <cite>— {author}</cite>
                </footer>
            )}
        </blockquote>
    );
};

Quotes.displayName = 'Quotes';

export { Quotes };
export default Quotes;
