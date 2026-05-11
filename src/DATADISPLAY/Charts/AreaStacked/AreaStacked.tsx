import React, { useRef } from 'react';
import type { AreaStackedProps } from './AreaStacked.types';
import { AreaStackedInner } from './AreaStackedInner';
import { useChartDimensions } from './AreaStacked.hooks';
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH, BASE_CHART_CLASSES } from '../_base/constants';

const AreaStacked = React.forwardRef<HTMLDivElement, AreaStackedProps>(
    ({ width: pw, height: ph, ...rest }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const { width, height } = useChartDimensions(containerRef, pw, ph, DEFAULT_CHART_WIDTH, DEFAULT_CHART_HEIGHT);
        return (
            <div ref={ref} style={{ width: '100%' }}>
                <div ref={containerRef} className={BASE_CHART_CLASSES.container}>
                    <AreaStackedInner {...rest} width={width} height={height} />
                </div>
            </div>
        );
    },
);

AreaStacked.displayName = 'AreaStacked';
export { AreaStacked };
export default AreaStacked;
