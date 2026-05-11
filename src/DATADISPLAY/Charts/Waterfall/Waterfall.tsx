import React, { useRef } from 'react';
import type { WaterfallProps } from './Waterfall.types';
import { WaterfallInner } from './WaterfallInner';
import { useChartDimensions } from './Waterfall.hooks';
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH, BASE_CHART_CLASSES } from '../_base/constants';

const Waterfall = React.forwardRef<HTMLDivElement, WaterfallProps>(
    ({ width: propWidth, height: propHeight, ...rest }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const { width, height } = useChartDimensions(containerRef, propWidth, propHeight, DEFAULT_CHART_WIDTH, DEFAULT_CHART_HEIGHT);

        return (
            <div ref={ref} style={{ width: '100%' }}>
                <div ref={containerRef} className={BASE_CHART_CLASSES.container}>
                    <WaterfallInner {...rest} width={width} height={height} />
                </div>
            </div>
        );
    },
);

Waterfall.displayName = 'Waterfall';
export { Waterfall };
export default Waterfall;
