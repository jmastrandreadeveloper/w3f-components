import React, { useRef } from 'react';
import type { LineMultiProps } from './LineMulti.types';
import { LineMultiInner } from './LineMultiInner';
import { useChartDimensions } from './LineMulti.hooks';
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH, BASE_CHART_CLASSES } from '../_base/constants';

const LineMulti = React.forwardRef<HTMLDivElement, LineMultiProps>(
    ({ width: pw, height: ph, ...rest }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const { width, height } = useChartDimensions(containerRef, pw, ph, DEFAULT_CHART_WIDTH, DEFAULT_CHART_HEIGHT);
        return (
            <div ref={ref} style={{ width: '100%' }}>
                <div ref={containerRef} className={BASE_CHART_CLASSES.container}>
                    <LineMultiInner {...rest} width={width} height={height} />
                </div>
            </div>
        );
    },
);

LineMulti.displayName = 'LineMulti';
export { LineMulti };
export default LineMulti;
