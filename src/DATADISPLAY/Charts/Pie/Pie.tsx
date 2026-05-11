import React, { useRef } from 'react';
import type { PieProps } from './Pie.types';
import { PieInner } from './PieInner';
import { useChartDimensions } from './Pie.hooks';
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH, BASE_CHART_CLASSES } from '../_base/constants';

const Pie = React.forwardRef<HTMLDivElement, PieProps>(
    ({ width: propWidth, height: propHeight, ...rest }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const { width, height } = useChartDimensions(containerRef, propWidth, propHeight, DEFAULT_CHART_WIDTH, DEFAULT_CHART_HEIGHT);
        return (
            <div ref={ref} style={{ width: '100%' }}>
                <div ref={containerRef} className={BASE_CHART_CLASSES.container}>
                    <PieInner {...rest} width={width} height={height} />
                </div>
            </div>
        );
    },
);
Pie.displayName = 'Pie';
export { Pie };
export default Pie;
