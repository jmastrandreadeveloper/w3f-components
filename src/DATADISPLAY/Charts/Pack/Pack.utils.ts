import type { DatumHierarchy } from '../_base/types';
import { PACK_ROOT_CLASS } from './Pack.constants';
import { buildChartRootClasses, resolveColorScheme } from '../_base/utils';

export function buildPackClasses(className: string | undefined, unstyled: boolean | undefined): string {
    return buildChartRootClasses(PACK_ROOT_CLASS, className, unstyled);
}

export function buildPackColors(leafCount: number, colorScheme: unknown): string[] {
    const palette = resolveColorScheme(colorScheme as any);
    return Array.from({ length: leafCount }, (_, i) => palette[i % palette.length]);
}

export function buildTooltipContent(node: DatumHierarchy): string {
    return `${node.label ?? node.id}: ${node.value?.toLocaleString() ?? ''}`;
}
