import React, { useRef } from 'react';
import type { WaffleProps } from './Waffle.types';
import { WaffleInner } from './WaffleInner';
import { useChartDimensions } from './Waffle.hooks';
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH, BASE_CHART_CLASSES } from '../_base/constants';

const Waffle = React.forwardRef<HTMLDivElement, WaffleProps>(
    ({ width: propWidth, height: propHeight, ...rest }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const { width, height } = useChartDimensions(containerRef, propWidth, propHeight, DEFAULT_CHART_WIDTH, DEFAULT_CHART_HEIGHT);
        return (
            <div ref={ref} style={{ width: '100%' }}>
                <div ref={containerRef} className={BASE_CHART_CLASSES.container}>
                    <WaffleInner {...rest} width={width} height={height} />
                </div>
            </div>
        );
    },
);
Waffle.displayName = 'Waffle';
export { Waffle };
export default Waffle;
