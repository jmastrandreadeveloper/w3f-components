import React, { useRef } from 'react';
import type { BarGroupedHProps } from './BarGroupedHorizontal.types';
import { BarGroupedHorizontalInner } from './BarGroupedHorizontalInner';
import { useChartDimensions } from './BarGroupedHorizontal.hooks';
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH, BASE_CHART_CLASSES } from '../_base/constants';

const BarGroupedHorizontal = React.forwardRef<HTMLDivElement, BarGroupedHProps>(
    ({ width: pw, height: ph, ...rest }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const { width, height } = useChartDimensions(containerRef, pw, ph, DEFAULT_CHART_WIDTH, DEFAULT_CHART_HEIGHT);
        return (
            <div ref={ref} style={{ width: '100%' }}>
                <div ref={containerRef} className={BASE_CHART_CLASSES.container}>
                    <BarGroupedHorizontalInner {...rest} width={width} height={height} />
                </div>
            </div>
        );
    },
);

BarGroupedHorizontal.displayName = 'BarGroupedHorizontal';
export { BarGroupedHorizontal };
export default BarGroupedHorizontal;
