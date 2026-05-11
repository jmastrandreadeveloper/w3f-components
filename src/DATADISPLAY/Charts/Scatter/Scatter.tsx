import React, { useRef } from 'react';
import type { ScatterProps } from './Scatter.types';
import { ScatterInner } from './ScatterInner';
import { useChartDimensions } from './Scatter.hooks';
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH, BASE_CHART_CLASSES } from '../_base/constants';

const Scatter = React.forwardRef<HTMLDivElement, ScatterProps>(
    ({ width: propWidth, height: propHeight, ...rest }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const { width, height } = useChartDimensions(containerRef, propWidth, propHeight, DEFAULT_CHART_WIDTH, DEFAULT_CHART_HEIGHT);

        return (
            <div ref={ref} style={{ width: '100%' }}>
                <div ref={containerRef} className={BASE_CHART_CLASSES.container}>
                    <ScatterInner {...rest} width={width} height={height} />
                </div>
            </div>
        );
    },
);

Scatter.displayName = 'Scatter';
export { Scatter };
export default Scatter;
