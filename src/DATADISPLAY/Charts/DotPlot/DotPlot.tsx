import React, { useRef } from 'react';
import type { DotPlotProps } from './DotPlot.types';
import { DotPlotInner } from './DotPlotInner';
import { useChartDimensions } from './DotPlot.hooks';
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH, BASE_CHART_CLASSES } from '../_base/constants';

const DotPlot = React.forwardRef<HTMLDivElement, DotPlotProps>(
    ({ width: propWidth, height: propHeight, ...rest }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const { width, height } = useChartDimensions(containerRef, propWidth, propHeight, DEFAULT_CHART_WIDTH, DEFAULT_CHART_HEIGHT);
        return (
            <div ref={ref} style={{ width: '100%' }}>
                <div ref={containerRef} className={BASE_CHART_CLASSES.container}>
                    <DotPlotInner {...rest} width={width} height={height} />
                </div>
            </div>
        );
    },
);
DotPlot.displayName = 'DotPlot';
export { DotPlot };
export default DotPlot;
