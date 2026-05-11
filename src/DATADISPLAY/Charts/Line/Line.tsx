import React, { useRef } from 'react';
import type { LineProps } from './Line.types';
import { LineInner } from './LineInner';
import { useChartDimensions } from './Line.hooks';
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH, BASE_CHART_CLASSES } from '../_base/constants';

const Line = React.forwardRef<HTMLDivElement, LineProps>(
    ({ width: pw, height: ph, ...rest }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const { width, height } = useChartDimensions(containerRef, pw, ph, DEFAULT_CHART_WIDTH, DEFAULT_CHART_HEIGHT);
        return (
            <div ref={ref} style={{ width: '100%' }}>
                <div ref={containerRef} className={BASE_CHART_CLASSES.container}>
                    <LineInner {...rest} width={width} height={height} />
                </div>
            </div>
        );
    },
);

Line.displayName = 'Line';
export { Line };
export default Line;
