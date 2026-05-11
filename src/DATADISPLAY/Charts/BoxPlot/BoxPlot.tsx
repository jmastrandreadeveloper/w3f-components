import React, { useRef } from 'react';
import type { BoxPlotProps } from './BoxPlot.types';
import { BoxPlotInner } from './BoxPlotInner';
import { useChartDimensions } from './BoxPlot.hooks';
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH, BASE_CHART_CLASSES } from '../_base/constants';

const BoxPlot = React.forwardRef<HTMLDivElement, BoxPlotProps>(
    ({ width: propWidth, height: propHeight, ...rest }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const { width, height } = useChartDimensions(containerRef, propWidth, propHeight, DEFAULT_CHART_WIDTH, DEFAULT_CHART_HEIGHT);
        return (
            <div ref={ref} style={{ width: '100%' }}>
                <div ref={containerRef} className={BASE_CHART_CLASSES.container}>
                    <BoxPlotInner {...rest} width={width} height={height} />
                </div>
            </div>
        );
    },
);
BoxPlot.displayName = 'BoxPlot';
export { BoxPlot };
export default BoxPlot;
