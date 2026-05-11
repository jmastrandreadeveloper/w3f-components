import React, { forwardRef } from 'react';
import type { TextProps } from './Text.types';
import { TEXT_DEFAULTS } from './Text.constants';
import { buildTextClasses, buildTextDirectionStyle } from './Text.utils';
import { useBridgeBind } from '@w3f/bridge';

/**
 * Componente Text - Contenedor de texto enriquecido.
 * Acepta children estándar o un array de elementos via prop content.
 */
const Text = forwardRef<HTMLElement, TextProps>(({
    content,
    element: Element = 'p',
    customClasses = TEXT_DEFAULTS.customClasses,
    align,
    leading,
    direction,
    writingMode,
    children,
    style,
    unstyled = TEXT_DEFAULTS.unstyled,
    bindId,
    ...props
}, ref) => {
    useBridgeBind({ bindId });
    const hasContentProp = content !== undefined && content !== null;
    const contentToRender = hasContentProp
        ? (Array.isArray(content) ? content : [content])
        : children;

    const finalClasses = buildTextClasses(customClasses, align, leading, unstyled);
    const finalStyle = buildTextDirectionStyle(direction, writingMode, style as React.CSSProperties);

    return (
        <Element ref={ref} className={finalClasses || undefined} style={finalStyle} {...props}>
            {hasContentProp ? (
                (contentToRender as React.ReactNode[]).map((item, index) => (
                    <React.Fragment key={index}>
                        {item}
                    </React.Fragment>
                ))
            ) : (
                contentToRender
            )}
        </Element>
    );
});

Text.displayName = 'Text';

export { Text };
export default Text;
