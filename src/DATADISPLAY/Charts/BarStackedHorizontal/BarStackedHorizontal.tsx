import React, { useRef } from 'react';
import type { BarStackedHProps } from './BarStackedHorizontal.types';
import { BarStackedHorizontalInner } from './BarStackedHorizontalInner';
import { useChartDimensions } from './BarStackedHorizontal.hooks';
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH, BASE_CHART_CLASSES } from '../_base/constants';

const BarStackedHorizontal = React.forwardRef<HTMLDivElement, BarStackedHProps>(
    ({ width: pw, height: ph, ...rest }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const { width, height } = useChartDimensions(containerRef, pw, ph, DEFAULT_CHART_WIDTH, DEFAULT_CHART_HEIGHT);
        return (
            <div ref={ref} style={{ width: '100%' }}>
                <div ref={containerRef} className={BASE_CHART_CLASSES.container}>
                    <BarStackedHorizontalInner {...rest} width={width} height={height} />
                </div>
            </div>
        );
    },
);

BarStackedHorizontal.displayName = 'BarStackedHorizontal';
export { BarStackedHorizontal };
export default BarStackedHorizontal;
