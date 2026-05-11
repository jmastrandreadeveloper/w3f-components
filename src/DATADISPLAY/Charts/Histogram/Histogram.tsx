import React, { useRef } from 'react';
import type { HistogramProps } from './Histogram.types';
import { HistogramInner } from './HistogramInner';
import { useChartDimensions } from './Histogram.hooks';
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH, BASE_CHART_CLASSES } from '../_base/constants';

const Histogram = React.forwardRef<HTMLDivElement, HistogramProps>(
    ({ width: propWidth, height: propHeight, ...rest }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const { width, height } = useChartDimensions(containerRef, propWidth, propHeight, DEFAULT_CHART_WIDTH, DEFAULT_CHART_HEIGHT);
        return (
            <div ref={ref} style={{ width: '100%' }}>
                <div ref={containerRef} className={BASE_CHART_CLASSES.container}>
                    <HistogramInner {...rest} width={width} height={height} />
                </div>
            </div>
        );
    },
);
Histogram.displayName = 'Histogram';
export { Histogram };
export default Histogram;
