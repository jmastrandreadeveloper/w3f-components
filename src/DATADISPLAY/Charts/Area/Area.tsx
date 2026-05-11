import React, { useRef } from 'react';
import type { AreaProps } from './Area.types';
import { AreaInner } from './AreaInner';
import { useChartDimensions } from './Area.hooks';
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH, BASE_CHART_CLASSES } from '../_base/constants';

const Area = React.forwardRef<HTMLDivElement, AreaProps>(
    ({ width: propWidth, height: propHeight, ...rest }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const { width, height } = useChartDimensions(
            containerRef, propWidth, propHeight, DEFAULT_CHART_WIDTH, DEFAULT_CHART_HEIGHT,
        );

        return (
            <div ref={ref} style={{ width: '100%' }}>
                <div ref={containerRef} className={BASE_CHART_CLASSES.container}>
                    <AreaInner {...rest} width={width} height={height} />
                </div>
            </div>
        );
    },
);

Area.displayName = 'Area';
export { Area };
export default Area;
