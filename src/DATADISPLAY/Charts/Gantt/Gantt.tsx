import React, { useRef } from 'react';
import type { GanttProps } from './Gantt.types';
import { GanttInner } from './GanttInner';
import { useChartDimensions } from './Gantt.hooks';
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH, BASE_CHART_CLASSES } from '../_base/constants';

const Gantt = React.forwardRef<HTMLDivElement, GanttProps>(
    ({ width: propWidth, height: propHeight, ...rest }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const { width, height } = useChartDimensions(containerRef, propWidth, propHeight, DEFAULT_CHART_WIDTH, DEFAULT_CHART_HEIGHT);
        return (
            <div ref={ref} style={{ width: '100%' }}>
                <div ref={containerRef} className={BASE_CHART_CLASSES.container}>
                    <GanttInner {...rest} width={width} height={height} />
                </div>
            </div>
        );
    },
);

Gantt.displayName = 'Gantt';
export { Gantt };
export default Gantt;
