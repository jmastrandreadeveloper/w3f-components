import React, { useRef } from 'react';
import type { BubbleProps } from './Bubble.types';
import { BubbleInner } from './BubbleInner';
import { useChartDimensions } from './Bubble.hooks';
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH, BASE_CHART_CLASSES } from '../_base/constants';

const Bubble = React.forwardRef<HTMLDivElement, BubbleProps>(
    ({ width: propWidth, height: propHeight, ...rest }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const { width, height } = useChartDimensions(containerRef, propWidth, propHeight, DEFAULT_CHART_WIDTH, DEFAULT_CHART_HEIGHT);
        return (
            <div ref={ref} style={{ width: '100%' }}>
                <div ref={containerRef} className={BASE_CHART_CLASSES.container}>
                    <BubbleInner {...rest} width={width} height={height} />
                </div>
            </div>
        );
    },
);
Bubble.displayName = 'Bubble';
export { Bubble };
export default Bubble;
