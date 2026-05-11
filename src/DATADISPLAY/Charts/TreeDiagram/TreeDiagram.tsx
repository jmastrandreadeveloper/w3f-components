import React, { useRef } from 'react';
import type { TreeDiagramProps } from './TreeDiagram.types';
import { TreeDiagramInner } from './TreeDiagramInner';
import { useChartDimensions } from './TreeDiagram.hooks';
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH, BASE_CHART_CLASSES } from '../_base/constants';

const TreeDiagram = React.forwardRef<HTMLDivElement, TreeDiagramProps>(
    ({ width: propWidth, height: propHeight, ...rest }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const { width, height } = useChartDimensions(containerRef, propWidth, propHeight, DEFAULT_CHART_WIDTH, DEFAULT_CHART_HEIGHT);
        return (
            <div ref={ref} style={{ width: '100%' }}>
                <div ref={containerRef} className={BASE_CHART_CLASSES.container}>
                    <TreeDiagramInner {...rest} width={width} height={height} />
                </div>
            </div>
        );
    },
);
TreeDiagram.displayName = 'TreeDiagram';
export { TreeDiagram };
export default TreeDiagram;
