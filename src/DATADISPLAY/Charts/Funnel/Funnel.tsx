import React, { useRef } from 'react';
import type { FunnelProps } from './Funnel.types';
import { FunnelInner } from './FunnelInner';
import { useChartDimensions } from './Funnel.hooks';
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH, BASE_CHART_CLASSES } from '../_base/constants';

const Funnel = React.forwardRef<HTMLDivElement, FunnelProps>(
    ({ width: propWidth, height: propHeight, ...rest }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const { width, height } = useChartDimensions(containerRef, propWidth, propHeight, DEFAULT_CHART_WIDTH, DEFAULT_CHART_HEIGHT);

        return (
            <div ref={ref} style={{ width: '100%' }}>
                <div ref={containerRef} className={BASE_CHART_CLASSES.container}>
                    <FunnelInner {...rest} width={width} height={height} />
                </div>
            </div>
        );
    },
);

Funnel.displayName = 'Funnel';
export { Funnel };
export default Funnel;
