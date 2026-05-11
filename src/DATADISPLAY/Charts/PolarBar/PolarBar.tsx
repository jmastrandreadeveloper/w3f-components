import React, { useRef } from 'react';
import type { PolarBarProps } from './PolarBar.types';
import { PolarBarInner } from './PolarBarInner';
import { useChartDimensions } from './PolarBar.hooks';
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH, BASE_CHART_CLASSES } from '../_base/constants';

const PolarBar = React.forwardRef<HTMLDivElement, PolarBarProps>(
    ({ width: propWidth, height: propHeight, ...rest }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const { width, height } = useChartDimensions(containerRef, propWidth, propHeight, DEFAULT_CHART_WIDTH, DEFAULT_CHART_HEIGHT);
        return (
            <div ref={ref} style={{ width: '100%' }}>
                <div ref={containerRef} className={BASE_CHART_CLASSES.container}>
                    <PolarBarInner {...rest} width={width} height={height} />
                </div>
            </div>
        );
    },
);
PolarBar.displayName = 'PolarBar';
export { PolarBar };
export default PolarBar;
