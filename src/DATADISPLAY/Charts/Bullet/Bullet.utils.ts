import type { BulletDatum } from './Bullet.types';
import { BULLET_ROOT_CLASS } from './Bullet.constants';
import { buildChartRootClasses } from '../_base/utils';
import { scaleLinear } from '@visx/scale';

export function buildBulletClasses(className: string | undefined, unstyled: boolean | undefined): string {
    return buildChartRootClasses(BULLET_ROOT_CLASS, className, unstyled);
}

export function buildBulletScale(datum: BulletDatum, width: number) {
    const maxRange = Math.max(...datum.ranges, datum.value, datum.target ?? 0);
    return scaleLinear<number>({
        domain: [0, maxRange],
        range: [0, width],
    });
}

export function buildTooltipContent(datum: BulletDatum): string {
    const parts = [`${datum.label}: ${datum.value.toLocaleString()}`];
    if (datum.target != null) {
        parts.push(`Target: ${datum.target.toLocaleString()}`);
    }
    parts.push(`Max range: ${Math.max(...datum.ranges).toLocaleString()}`);
    return parts.join(' | ');
}
