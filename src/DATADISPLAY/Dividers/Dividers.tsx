import React, { forwardRef } from 'react';
import type { DividersProps } from './Dividers.types';
import { DIVIDERS_DEFAULTS } from './Dividers.constants';
import { buildDynamicStyles, buildLineBackgroundColor } from './Dividers.utils';

const Dividers = forwardRef<HTMLDivElement, DividersProps>(({
    type = DIVIDERS_DEFAULTS.type,
    className = DIVIDERS_DEFAULTS.className,
    spacing = DIVIDERS_DEFAULTS.spacing,
    thickness = DIVIDERS_DEFAULTS.thickness,
    height = DIVIDERS_DEFAULTS.height,
    color = DIVIDERS_DEFAULTS.color,
    variant = DIVIDERS_DEFAULTS.variant,
    gradient = DIVIDERS_DEFAULTS.gradient,
    animated = DIVIDERS_DEFAULTS.animated,
    children = DIVIDERS_DEFAULTS.children,
    contentStyle = {},
    contentPosition = DIVIDERS_DEFAULTS.contentPosition,
    style = {},
    unstyled = DIVIDERS_DEFAULTS.unstyled,
    ...props
}, ref) => {
    const variantClass = variant === 'gradient' ? 'w3f-dividers-gradient' : '';
    const animatedClass = animated ? 'w3f-dividers-animated' : '';
    const cssClass = unstyled
        ? `w3f-dividers w3f-divider--unstyled ${className}`.trim().replace(/\s+/g, ' ')
        : `w3f-dividers w3f-dividers-${type} ${variantClass} ${animatedClass} ${className}`.trim().replace(/\s+/g, ' ');

    // Divider con contenido intermedio (solo horizontal)
    if (children && type === 'horizontal') {
        const lineColor = buildLineBackgroundColor(color);
        const cssVars = {
            ...(spacing !== '16px' ? { '--w3f-divider-spacing': spacing } : {}),
            ...(thickness !== '1px' ? { '--w3f-divider-thickness': thickness } : {}),
            ...(lineColor !== 'var(--w3f-gray-300)' ? { '--w3f-divider-line-bg': lineColor } : {}),
            ...style,
        } as React.CSSProperties;

        const posClass = `w3f-dividers-with-content--${contentPosition}`;
        const lineMinClass = contentPosition !== 'center' ? 'w3f-dividers-line w3f-dividers-line--min' : 'w3f-dividers-line';

        return (
            <div
                ref={ref}
                className={`w3f-dividers-with-content ${posClass} ${className}`.trim()}
                style={Object.keys(cssVars).length > 0 ? cssVars : undefined}
                {...props}
            >
                {contentPosition !== 'left' && (
                    <div className={contentPosition === 'center' ? 'w3f-dividers-line' : lineMinClass} />
                )}
                <div
                    className="w3f-dividers-content"
                    style={Object.keys(contentStyle).length > 0 ? contentStyle : undefined}
                >
                    {children}
                </div>
                {contentPosition !== 'right' && (
                    <div className={contentPosition === 'center' ? 'w3f-dividers-line' : lineMinClass} />
                )}
            </div>
        );
    }

    const dynamicStyles = buildDynamicStyles(
        type,
        variant,
        thickness,
        spacing,
        height,
        color,
        gradient,
        animated,
        !!children,
        style
    );

    // Divider horizontal sin contenido
    if (type === 'horizontal') {
        return (
            <hr
                ref={ref as React.Ref<HTMLHRElement>}
                className={cssClass}
                style={dynamicStyles}
                {...props}
            />
        );
    }

    // Divider vertical
    if (type === 'vertical') {
        return (
            <span
                ref={ref as React.Ref<HTMLSpanElement>}
                className={cssClass}
                style={dynamicStyles}
                role="separator"
                aria-orientation="vertical"
                {...props}
            />
        );
    }

    return null;
});

Dividers.displayName = 'Dividers';

export { Dividers };
export default Dividers;
