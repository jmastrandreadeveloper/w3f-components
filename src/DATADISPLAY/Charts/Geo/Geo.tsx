import React, { useRef } from 'react';
import type { GeoProps } from './Geo.types';
import { GeoInner } from './GeoInner';
import { useChartDimensions } from './Geo.hooks';
import { DEFAULT_CHART_HEIGHT, DEFAULT_CHART_WIDTH, BASE_CHART_CLASSES } from '../_base/constants';

const Geo = React.forwardRef<HTMLDivElement, GeoProps>(
    ({ width: propWidth, height: propHeight, ...rest }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const { width, height } = useChartDimensions(containerRef, propWidth, propHeight, DEFAULT_CHART_WIDTH, DEFAULT_CHART_HEIGHT);
        return (
            <div ref={ref} style={{ width: '100%' }}>
                <div ref={containerRef} className={BASE_CHART_CLASSES.container}>
                    <GeoInner {...rest} width={width} height={height} />
                </div>
            </div>
        );
    },
);
Geo.displayName = 'Geo';
export { Geo };
export default Geo;
