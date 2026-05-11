import type { Datum1D } from '../_base/types';
import { POLAR_BAR_ROOT_CLASS } from './PolarBar.constants';
import { buildChartRootClasses, resolveColorScheme } from '../_base/utils';

export function buildPolarBarClasses(className: string | undefined, unstyled: boolean | undefined): string {
    return buildChartRootClasses(POLAR_BAR_ROOT_CLASS, className, unstyled);
}

export function buildPolarBarColors(count: number, colorScheme: unknown): string[] {
    const palette = resolveColorScheme(colorScheme as any);
    return Array.from({ length: count }, (_, i) => palette[i % palette.length]);
}

export function buildTooltipContent(d: Datum1D): string {
    return `${d.label}: ${d.value.toLocaleString()}`;
}
