import React, { useRef } from 'react';
import type { BarStackedProps } from './BarStacked.types';
import { BarStackedInner } from './BarStackedInner';
import { useChartDimensions } from './BarStacked.hooks';
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH, BASE_CHART_CLASSES } from '../_base/constants';

const BarStacked = React.forwardRef<HTMLDivElement, BarStackedProps>(
    ({ width: pw, height: ph, ...rest }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const { width, height } = useChartDimensions(containerRef, pw, ph, DEFAULT_CHART_WIDTH, DEFAULT_CHART_HEIGHT);
        return (
            <div ref={ref} style={{ width: '100%' }}>
                <div ref={containerRef} className={BASE_CHART_CLASSES.container}>
                    <BarStackedInner {...rest} width={width} height={height} />
                </div>
            </div>
        );
    },
);

BarStacked.displayName = 'BarStacked';
export { BarStacked };
export default BarStacked;
