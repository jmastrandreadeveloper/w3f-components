import React, { useRef } from 'react';
import type { SparklineProps } from './Sparkline.types';
import { SparklineInner } from './SparklineInner';
import { useChartDimensions } from './Sparkline.hooks';

const Sparkline = React.forwardRef<HTMLDivElement, SparklineProps>(
    ({ width: propWidth, height: propHeight = 40, ...rest }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const { width, height } = useChartDimensions(containerRef, propWidth, propHeight, 120, 40);
        return (
            <div ref={ref} style={{ width: propWidth ? undefined : '100%', display: 'inline-block' }}>
                <div ref={containerRef}>
                    <SparklineInner {...rest} width={width} height={height} />
                </div>
            </div>
        );
    },
);

Sparkline.displayName = 'Sparkline';
export { Sparkline };
export default Sparkline;
