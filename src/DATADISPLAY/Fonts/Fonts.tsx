import React from 'react';
import type { FontsProps } from './Fonts.types';
import { FONTS_DEFAULTS } from './Fonts.constants';
import { buildFontsClasses, buildFontsStyle } from './Fonts.utils';

/**
 * Componente Fonts: utiliza <span> por defecto
 * y procesa todas las props de tipografía (size, family, weight, italic, underline,
 * writingMode, transform).
 */
const Fonts: React.FC<FontsProps> = ({
    text = FONTS_DEFAULTS.text,
    customClasses = FONTS_DEFAULTS.customClasses,
    size = FONTS_DEFAULTS.size,
    family = FONTS_DEFAULTS.family,
    weight = FONTS_DEFAULTS.weight,
    italic = FONTS_DEFAULTS.italic,
    underline = FONTS_DEFAULTS.underline,
    writingMode = FONTS_DEFAULTS.writingMode,
    transform = FONTS_DEFAULTS.transform,
    unstyled = FONTS_DEFAULTS.unstyled,
    element: Element = 'span'
}) => {
    const finalClasses = buildFontsClasses(size, family, weight, italic, underline, unstyled, customClasses);
    const style = buildFontsStyle(writingMode, transform);

    if (writingMode === 'vertical-stacked' || writingMode === 'vertical-stacked-up') {
        const stackStyle: React.CSSProperties = {
            display: 'inline-flex',
            flexDirection: writingMode === 'vertical-stacked-up' ? 'column-reverse' : 'column',
            alignItems: 'center',
            // only forward the transform prop, not any writing-mode CSS
            ...(style?.transform ? { transform: style.transform } : {}),
        };
        return (
            <Element className={finalClasses} style={stackStyle}>
                {[...text].map((char, i) => (
                    <span key={i}>{char}</span>
                ))}
            </Element>
        );
    }

    return (
        <Element className={finalClasses} style={style}>
            {text}
        </Element>
    );
};

Fonts.displayName = 'Fonts';

export { Fonts };
export default Fonts;
