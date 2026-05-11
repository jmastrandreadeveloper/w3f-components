import React, { useRef } from 'react';
import type { BarProps } from './Bar.types';
import { BarInner } from './BarInner';
import { useChartDimensions } from './Bar.hooks';
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH } from '../_base/constants';
import { BASE_CHART_CLASSES } from '../_base/constants';

/**
 * Bar — responsive wrapper around `BarInner`.
 *
 * If `width`/`height` are omitted, the chart observes its parent
 * container and auto-sizes (width-responsive, height defaults to 300).
 *
 * Use `<BarInner>` directly when you control dimensions explicitly.
 */
const Bar = React.forwardRef<HTMLDivElement, BarProps>(
    ({ width: propWidth, height: propHeight, ...rest }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const { width, height } = useChartDimensions(
            containerRef,
            propWidth,
            propHeight,
            DEFAULT_CHART_WIDTH,
            DEFAULT_CHART_HEIGHT,
        );

        return (
            <div ref={ref} style={{ width: '100%' }}>
                <div ref={containerRef} className={BASE_CHART_CLASSES.container}>
                    <BarInner {...rest} width={width} height={height} />
                </div>
            </div>
        );
    },
);

Bar.displayName = 'Bar';

export { Bar };
export default Bar;
