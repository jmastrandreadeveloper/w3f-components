import type { ChartAxisOrientation } from './ChartAxis.types';
import { CHART_AXIS_CLASSES } from './ChartAxis.constants';

export function buildAxisClasses(
    orientation: ChartAxisOrientation,
    className?: string,
): string {
    const orientationClass = CHART_AXIS_CLASSES[orientation];
    return [CHART_AXIS_CLASSES.root, orientationClass, className]
        .filter(Boolean)
        .join(' ');
}
