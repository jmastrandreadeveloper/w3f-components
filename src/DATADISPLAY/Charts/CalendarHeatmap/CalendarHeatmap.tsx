import React, { useRef } from 'react';
import type { CalendarHeatmapProps } from './CalendarHeatmap.types';
import { CalendarHeatmapInner } from './CalendarHeatmapInner';
import { useChartDimensions } from './CalendarHeatmap.hooks';
import { BASE_CHART_CLASSES } from '../_base/constants';

const CalendarHeatmap = React.forwardRef<HTMLDivElement, CalendarHeatmapProps>(
    ({ width: propWidth, height: propHeight, ...rest }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const { width, height } = useChartDimensions(containerRef, propWidth, propHeight, 800, 140);
        return (
            <div ref={ref} style={{ width: '100%' }}>
                <div ref={containerRef} className={BASE_CHART_CLASSES.container}>
                    <CalendarHeatmapInner {...rest} width={width} height={height} />
                </div>
            </div>
        );
    },
);

CalendarHeatmap.displayName = 'CalendarHeatmap';
export { CalendarHeatmap };
export default CalendarHeatmap;
