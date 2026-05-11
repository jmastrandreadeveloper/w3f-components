import type { WordCloudDatum } from './WordCloud.types';
import { WORDCLOUD_ROOT_CLASS } from './WordCloud.constants';
import { buildChartRootClasses, resolveColorScheme } from '../_base/utils';

export function buildWordCloudClasses(className: string | undefined, unstyled: boolean | undefined): string {
    return buildChartRootClasses(WORDCLOUD_ROOT_CLASS, className, unstyled);
}

export function buildWordCloudColors(count: number, colorScheme: unknown): string[] {
    const palette = resolveColorScheme(colorScheme as any);
    return Array.from({ length: count }, (_, i) => palette[i % palette.length]);
}

export function buildTooltipContent(datum: WordCloudDatum): string {
    return `${datum.text}: ${datum.value.toLocaleString()}`;
}
