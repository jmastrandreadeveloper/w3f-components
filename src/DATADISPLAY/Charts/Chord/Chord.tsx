import React, { useRef } from 'react';
import type { ChordProps } from './Chord.types';
import { ChordInner } from './ChordInner';
import { useChartDimensions } from './Chord.hooks';
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH, BASE_CHART_CLASSES } from '../_base/constants';

const Chord = React.forwardRef<HTMLDivElement, ChordProps>(
    ({ width: propWidth, height: propHeight, ...rest }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const { width, height } = useChartDimensions(containerRef, propWidth, propHeight, DEFAULT_CHART_WIDTH, DEFAULT_CHART_HEIGHT);
        return (
            <div ref={ref} style={{ width: '100%' }}>
                <div ref={containerRef} className={BASE_CHART_CLASSES.container}>
                    <ChordInner {...rest} width={width} height={height} />
                </div>
            </div>
        );
    },
);
Chord.displayName = 'Chord';
export { Chord };
export default Chord;
