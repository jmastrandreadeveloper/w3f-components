import React, { useRef } from 'react';
import type { SunburstProps } from './Sunburst.types';
import { SunburstInner } from './SunburstInner';
import { useChartDimensions } from './Sunburst.hooks';
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH, BASE_CHART_CLASSES } from '../_base/constants';

const Sunburst = React.forwardRef<HTMLDivElement, SunburstProps>(
    ({ width: propWidth, height: propHeight, ...rest }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const { width, height } = useChartDimensions(containerRef, propWidth, propHeight, DEFAULT_CHART_WIDTH, DEFAULT_CHART_HEIGHT);
        return (
            <div ref={ref} style={{ width: '100%' }}>
                <div ref={containerRef} className={BASE_CHART_CLASSES.container}>
                    <SunburstInner {...rest} width={width} height={height} />
                </div>
            </div>
        );
    },
);
Sunburst.displayName = 'Sunburst';
export { Sunburst };
export default Sunburst;
