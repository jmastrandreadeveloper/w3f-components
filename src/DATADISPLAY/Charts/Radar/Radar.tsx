import React, { useRef } from 'react';
import type { RadarProps } from './Radar.types';
import { RadarInner } from './RadarInner';
import { useChartDimensions } from './Radar.hooks';
import { BASE_CHART_CLASSES } from '../_base/constants';

const Radar = React.forwardRef<HTMLDivElement, RadarProps>(
    ({ width: propWidth, height: propHeight, ...rest }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const { width, height } = useChartDimensions(containerRef, propWidth, propHeight, 400, 400);
        return (
            <div ref={ref} style={{ width: '100%' }}>
                <div ref={containerRef} className={BASE_CHART_CLASSES.container}>
                    <RadarInner {...rest} width={width} height={height} />
                </div>
            </div>
        );
    },
);
Radar.displayName = 'Radar';
export { Radar };
export default Radar;
