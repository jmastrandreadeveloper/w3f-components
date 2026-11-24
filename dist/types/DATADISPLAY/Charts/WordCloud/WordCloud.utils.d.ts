import type { WordCloudDatum } from './WordCloud.types';
export declare function buildWordCloudClasses(className: string | undefined, unstyled: boolean | undefined): string;
export declare function buildWordCloudColors(count: number, colorScheme: unknown): string[];
export declare function buildTooltipContent(datum: WordCloudDatum): string;
/** Números al azar con semilla (mulberry32): la misma semilla da siempre la misma nube. */
export declare function seededRandom(seed: number): () => number;
//# sourceMappingURL=WordCloud.utils.d.ts.map