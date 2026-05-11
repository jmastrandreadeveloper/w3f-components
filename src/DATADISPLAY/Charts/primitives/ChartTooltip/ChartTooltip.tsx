import React from 'react';
import type { ChartTooltipProps } from './ChartTooltip.types';
import { CHART_TOOLTIP_DEFAULTS } from './ChartTooltip.constants';
import { buildTooltipClasses } from './ChartTooltip.utils';

/**
 * W3F ChartTooltip — absolute-positioned div that floats over the
 * chart. Intended to live inside a `position: relative` wrapper
 * (usually `.w3f-chart__container`).
 *
 * Unstyled consumers pass `className` to inherit their own styles.
 */
export const ChartTooltip: React.FC<ChartTooltipProps> = (props) => {
    const {
        left,
        top,
        visible,
        children,
        className,
        offsetX = CHART_TOOLTIP_DEFAULTS.offsetX,
        offsetY = CHART_TOOLTIP_DEFAULTS.offsetY,
    } = props;

    const rootClass = buildTooltipClasses(visible, className);

    return (
        <div
            className={rootClass}
            style={{
                position: 'absolute',
                left: left + offsetX,
                top: top + offsetY,
                pointerEvents: 'none',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(-4px)',
                transition: 'opacity 120ms ease-out, transform 120ms ease-out',
            }}
            role="tooltip"
        >
            {children}
        </div>
    );
};

ChartTooltip.displayName = 'ChartTooltip';

export default ChartTooltip;
