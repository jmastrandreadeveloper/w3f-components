import { CHORD_ROOT_CLASS } from './Chord.constants';
import { buildChartRootClasses, resolveColorScheme } from '../_base/utils';

export function buildChordClasses(className: string | undefined, unstyled: boolean | undefined): string {
    return buildChartRootClasses(CHORD_ROOT_CLASS, className, unstyled);
}

export function buildChordColors(count: number, colorScheme: unknown): string[] {
    const palette = resolveColorScheme(colorScheme as any);
    return Array.from({ length: count }, (_, i) => palette[i % palette.length]);
}

export function buildTooltipContent(source: string, target: string, value: number): string {
    return `${source} \u2192 ${target}: ${value.toLocaleString()}`;
}
