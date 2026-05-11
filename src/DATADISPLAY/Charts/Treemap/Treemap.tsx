import React, { useRef } from 'react';
import type { TreemapProps } from './Treemap.types';
import { TreemapInner } from './TreemapInner';
import { useChartDimensions } from './Treemap.hooks';
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH, BASE_CHART_CLASSES } from '../_base/constants';

const Treemap = React.forwardRef<HTMLDivElement, TreemapProps>(
    ({ width: propWidth, height: propHeight, ...rest }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const { width, height } = useChartDimensions(containerRef, propWidth, propHeight, DEFAULT_CHART_WIDTH, DEFAULT_CHART_HEIGHT);
        return (
            <div ref={ref} style={{ width: '100%' }}>
                <div ref={containerRef} className={BASE_CHART_CLASSES.container}>
                    <TreemapInner {...rest} width={width} height={height} />
                </div>
            </div>
        );
    },
);
Treemap.displayName = 'Treemap';
export { Treemap };
export default Treemap;
