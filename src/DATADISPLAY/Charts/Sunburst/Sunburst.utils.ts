import type { DatumHierarchy } from '../_base/types';
import { SUNBURST_ROOT_CLASS } from './Sunburst.constants';
import { buildChartRootClasses, resolveColorScheme } from '../_base/utils';

export function buildSunburstClasses(className: string | undefined, unstyled: boolean | undefined): string {
    return buildChartRootClasses(SUNBURST_ROOT_CLASS, className, unstyled);
}

export function buildSunburstColors(count: number, colorScheme: unknown): string[] {
    const palette = resolveColorScheme(colorScheme as any);
    return Array.from({ length: count }, (_, i) => palette[i % palette.length]);
}

export function buildTooltipContent(node: DatumHierarchy): string {
    return `${node.label ?? node.id}: ${node.value?.toLocaleString() ?? ''}`;
}

export function arcLabelFits(startAngle: number, endAngle: number, depth: number): boolean {
    const angle = endAngle - startAngle;
    return angle > 0.3 && depth <= 2;
}
