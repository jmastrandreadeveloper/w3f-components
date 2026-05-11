import React, { useRef } from 'react';
import type { HeatmapProps } from './Heatmap.types';
import { HeatmapInner } from './HeatmapInner';
import { useChartDimensions } from './Heatmap.hooks';
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH, BASE_CHART_CLASSES } from '../_base/constants';

const Heatmap = React.forwardRef<HTMLDivElement, HeatmapProps>(
    ({ width: propWidth, height: propHeight, ...rest }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const { width, height } = useChartDimensions(containerRef, propWidth, propHeight, DEFAULT_CHART_WIDTH, DEFAULT_CHART_HEIGHT);

        return (
            <div ref={ref} style={{ width: '100%' }}>
                <div ref={containerRef} className={BASE_CHART_CLASSES.container}>
                    <HeatmapInner {...rest} width={width} height={height} />
                </div>
            </div>
        );
    },
);

Heatmap.displayName = 'Heatmap';
export { Heatmap };
export default Heatmap;
