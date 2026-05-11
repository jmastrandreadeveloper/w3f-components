import React, { useRef } from 'react';
import type { SankeyProps } from './Sankey.types';
import { SankeyInner } from './SankeyInner';
import { useChartDimensions } from './Sankey.hooks';
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH, BASE_CHART_CLASSES } from '../_base/constants';

const Sankey = React.forwardRef<HTMLDivElement, SankeyProps>(
    ({ width: propWidth, height: propHeight, ...rest }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const { width, height } = useChartDimensions(containerRef, propWidth, propHeight, DEFAULT_CHART_WIDTH, DEFAULT_CHART_HEIGHT);

        return (
            <div ref={ref} style={{ width: '100%' }}>
                <div ref={containerRef} className={BASE_CHART_CLASSES.container}>
                    <SankeyInner {...rest} width={width} height={height} />
                </div>
            </div>
        );
    },
);

Sankey.displayName = 'Sankey';
export { Sankey };
export default Sankey;
