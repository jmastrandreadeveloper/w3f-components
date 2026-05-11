import type { DatumHierarchy } from '../_base/types';
import { TREE_DIAGRAM_ROOT_CLASS } from './TreeDiagram.constants';
import { buildChartRootClasses, resolveColorScheme } from '../_base/utils';

export function buildTreeDiagramClasses(className: string | undefined, unstyled: boolean | undefined): string {
    return buildChartRootClasses(TREE_DIAGRAM_ROOT_CLASS, className, unstyled);
}

export function buildTreeDiagramColors(count: number, colorScheme: unknown): string[] {
    const palette = resolveColorScheme(colorScheme as any);
    return Array.from({ length: count }, (_, i) => palette[i % palette.length]);
}

export function buildTooltipContent(node: DatumHierarchy): string {
    return `${node.label ?? node.id}: ${node.value?.toLocaleString() ?? ''}`;
}
