import React, { useRef } from 'react';
import type { ThresholdProps } from './Threshold.types';
import { ThresholdInner } from './ThresholdInner';
import { useChartDimensions } from './Threshold.hooks';
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH, BASE_CHART_CLASSES } from '../_base/constants';

const Threshold = React.forwardRef<HTMLDivElement, ThresholdProps>(
    ({ width: pw, height: ph, ...rest }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const { width, height } = useChartDimensions(
            containerRef, pw, ph, DEFAULT_CHART_WIDTH, DEFAULT_CHART_HEIGHT,
        );

        return (
            <div ref={ref} style={{ width: '100%' }}>
                <div ref={containerRef} className={BASE_CHART_CLASSES.container}>
                    <ThresholdInner {...rest} width={width} height={height} />
                </div>
            </div>
        );
    },
);

Threshold.displayName = 'Threshold';
export { Threshold };
export default Threshold;
