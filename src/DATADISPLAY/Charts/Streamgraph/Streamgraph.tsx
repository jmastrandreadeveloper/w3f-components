import React, { useRef } from 'react';
import type { StreamgraphProps } from './Streamgraph.types';
import { StreamgraphInner } from './StreamgraphInner';
import { useChartDimensions } from './Streamgraph.hooks';
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH, BASE_CHART_CLASSES } from '../_base/constants';

const Streamgraph = React.forwardRef<HTMLDivElement, StreamgraphProps>(
    ({ width: pw, height: ph, ...rest }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const { width, height } = useChartDimensions(
            containerRef, pw, ph, DEFAULT_CHART_WIDTH, DEFAULT_CHART_HEIGHT,
        );

        return (
            <div ref={ref} style={{ width: '100%' }}>
                <div ref={containerRef} className={BASE_CHART_CLASSES.container}>
                    <StreamgraphInner {...rest} width={width} height={height} />
                </div>
            </div>
        );
    },
);

Streamgraph.displayName = 'Streamgraph';
export { Streamgraph };
export default Streamgraph;
