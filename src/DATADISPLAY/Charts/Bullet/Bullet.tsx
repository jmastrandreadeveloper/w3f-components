import React, { useRef } from 'react';
import type { BulletProps } from './Bullet.types';
import { BulletInner } from './BulletInner';
import { useChartDimensions } from './Bullet.hooks';
import { DEFAULT_CHART_WIDTH, DEFAULT_CHART_HEIGHT, BASE_CHART_CLASSES } from '../_base/constants';

const Bullet = React.forwardRef<HTMLDivElement, BulletProps>(
    ({ width: propWidth, height: propHeight, ...rest }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const { width, height } = useChartDimensions(containerRef, propWidth, propHeight, DEFAULT_CHART_WIDTH, DEFAULT_CHART_HEIGHT);
        return (
            <div ref={ref} style={{ width: '100%' }}>
                <div ref={containerRef} className={BASE_CHART_CLASSES.container}>
                    <BulletInner {...rest} width={width} height={height} />
                </div>
            </div>
        );
    },
);

Bullet.displayName = 'Bullet';
export { Bullet };
export default Bullet;
