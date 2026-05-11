import React, { useRef } from 'react';
import type { ViolinProps } from './Violin.types';
import { ViolinInner } from './ViolinInner';
import { useChartDimensions } from './Violin.hooks';
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH, BASE_CHART_CLASSES } from '../_base/constants';

const Violin = React.forwardRef<HTMLDivElement, ViolinProps>(
    ({ width: propWidth, height: propHeight, ...rest }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const { width, height } = useChartDimensions(containerRef, propWidth, propHeight, DEFAULT_CHART_WIDTH, DEFAULT_CHART_HEIGHT);
        return (
            <div ref={ref} style={{ width: '100%' }}>
                <div ref={containerRef} className={BASE_CHART_CLASSES.container}>
                    <ViolinInner {...rest} width={width} height={height} />
                </div>
            </div>
        );
    },
);
Violin.displayName = 'Violin';
export { Violin };
export default Violin;
