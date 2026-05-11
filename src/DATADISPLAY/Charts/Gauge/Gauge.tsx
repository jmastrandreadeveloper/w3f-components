import React, { useRef } from 'react';
import type { GaugeProps } from './Gauge.types';
import { GaugeInner } from './GaugeInner';
import { useChartDimensions } from './Gauge.hooks';
import { BASE_CHART_CLASSES } from '../_base/constants';

const Gauge = React.forwardRef<HTMLDivElement, GaugeProps>(
    ({ width: propWidth, height: propHeight, ...rest }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const { width, height } = useChartDimensions(containerRef, propWidth, propHeight, 300, 200);
        return (
            <div ref={ref} style={{ width: '100%' }}>
                <div ref={containerRef} className={BASE_CHART_CLASSES.container}>
                    <GaugeInner {...rest} width={width} height={height} />
                </div>
            </div>
        );
    },
);
Gauge.displayName = 'Gauge';
export { Gauge };
export default Gauge;
