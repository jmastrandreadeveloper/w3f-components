import React, { useRef } from 'react';
import type { BarHorizontalProps } from './BarHorizontal.types';
import { BarHorizontalInner } from './BarHorizontalInner';
import { useChartDimensions } from './BarHorizontal.hooks';
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH, BASE_CHART_CLASSES } from '../_base/constants';

const BarHorizontal = React.forwardRef<HTMLDivElement, BarHorizontalProps>(
    ({ width: pw, height: ph, ...rest }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const { width, height } = useChartDimensions(containerRef, pw, ph, DEFAULT_CHART_WIDTH, DEFAULT_CHART_HEIGHT);
        return (
            <div ref={ref} style={{ width: '100%' }}>
                <div ref={containerRef} className={BASE_CHART_CLASSES.container}>
                    <BarHorizontalInner {...rest} width={width} height={height} />
                </div>
            </div>
        );
    },
);

BarHorizontal.displayName = 'BarHorizontal';
export { BarHorizontal };
export default BarHorizontal;
