import React, { useRef } from 'react';
import type { PackProps } from './Pack.types';
import { PackInner } from './PackInner';
import { useChartDimensions } from './Pack.hooks';
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH, BASE_CHART_CLASSES } from '../_base/constants';

const Pack = React.forwardRef<HTMLDivElement, PackProps>(
    ({ width: propWidth, height: propHeight, ...rest }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const { width, height } = useChartDimensions(containerRef, propWidth, propHeight, DEFAULT_CHART_WIDTH, DEFAULT_CHART_HEIGHT);
        return (
            <div ref={ref} style={{ width: '100%' }}>
                <div ref={containerRef} className={BASE_CHART_CLASSES.container}>
                    <PackInner {...rest} width={width} height={height} />
                </div>
            </div>
        );
    },
);
Pack.displayName = 'Pack';
export { Pack };
export default Pack;
