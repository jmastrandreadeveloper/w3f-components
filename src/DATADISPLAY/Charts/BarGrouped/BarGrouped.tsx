import React, { useRef } from 'react';
import type { BarGroupedProps } from './BarGrouped.types';
import { BarGroupedInner } from './BarGroupedInner';
import { useChartDimensions } from './BarGrouped.hooks';
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH, BASE_CHART_CLASSES } from '../_base/constants';

const BarGrouped = React.forwardRef<HTMLDivElement, BarGroupedProps>(
    ({ width: pw, height: ph, ...rest }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const { width, height } = useChartDimensions(containerRef, pw, ph, DEFAULT_CHART_WIDTH, DEFAULT_CHART_HEIGHT);
        return (
            <div ref={ref} style={{ width: '100%' }}>
                <div ref={containerRef} className={BASE_CHART_CLASSES.container}>
                    <BarGroupedInner {...rest} width={width} height={height} />
                </div>
            </div>
        );
    },
);

BarGrouped.displayName = 'BarGrouped';
export { BarGrouped };
export default BarGrouped;
