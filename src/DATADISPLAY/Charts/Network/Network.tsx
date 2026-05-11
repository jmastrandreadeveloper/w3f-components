import React, { useRef } from 'react';
import type { NetworkProps } from './Network.types';
import { NetworkInner } from './NetworkInner';
import { useChartDimensions } from './Network.hooks';
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH, BASE_CHART_CLASSES } from '../_base/constants';

const Network = React.forwardRef<HTMLDivElement, NetworkProps>(
    ({ width: propWidth, height: propHeight, ...rest }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const { width, height } = useChartDimensions(containerRef, propWidth, propHeight, DEFAULT_CHART_WIDTH, DEFAULT_CHART_HEIGHT);

        return (
            <div ref={ref} style={{ width: '100%' }}>
                <div ref={containerRef} className={BASE_CHART_CLASSES.container}>
                    <NetworkInner {...rest} width={width} height={height} />
                </div>
            </div>
        );
    },
);

Network.displayName = 'Network';
export { Network };
export default Network;
