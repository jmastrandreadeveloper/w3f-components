import React, { useRef } from 'react';
import type { WordCloudProps } from './WordCloud.types';
import { WordCloudInner } from './WordCloudInner';
import { useChartDimensions } from './WordCloud.hooks';
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH, BASE_CHART_CLASSES } from '../_base/constants';

const WordCloud = React.forwardRef<HTMLDivElement, WordCloudProps>(
    ({ width: propWidth, height: propHeight, ...rest }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const { width, height } = useChartDimensions(containerRef, propWidth, propHeight, DEFAULT_CHART_WIDTH, DEFAULT_CHART_HEIGHT);
        return (
            <div ref={ref} style={{ width: '100%' }}>
                <div ref={containerRef} className={BASE_CHART_CLASSES.container}>
                    <WordCloudInner {...rest} width={width} height={height} />
                </div>
            </div>
        );
    },
);
WordCloud.displayName = 'WordCloud';
export { WordCloud };
export default WordCloud;
