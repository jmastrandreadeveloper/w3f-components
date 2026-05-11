import type { DatumHierarchy } from '../_base/types';
import { TREEMAP_ROOT_CLASS } from './Treemap.constants';
import { buildChartRootClasses, resolveColorScheme } from '../_base/utils';

export function buildTreemapClasses(className: string | undefined, unstyled: boolean | undefined): string {
    return buildChartRootClasses(TREEMAP_ROOT_CLASS, className, unstyled);
}

export function buildTreemapColors(leafCount: number, colorScheme: unknown): string[] {
    const palette = resolveColorScheme(colorScheme as any);
    return Array.from({ length: leafCount }, (_, i) => palette[i % palette.length]);
}

export function textFits(w: number, h: number, minW = 30, minH = 16): boolean {
    return w > minW && h > minH;
}

export function truncateLabel(label: string, maxWidth: number, fontSize = 11): string {
    const charW = fontSize * 0.6;
    const maxChars = Math.floor(maxWidth / charW);
    if (label.length <= maxChars) return label;
    return maxChars > 2 ? label.slice(0, maxChars - 1) + '\u2026' : '';
}

export function buildTooltipContent(node: DatumHierarchy): string {
    return `${node.label ?? node.id}: ${node.value?.toLocaleString() ?? ''}`;
}
