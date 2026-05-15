import type { WordCloudDatum } from './WordCloud.types';
export declare function useWordCloudColors(count: number, colorScheme: unknown): string[];
export declare function useWordCloudInteraction(onHover?: (datum: WordCloudDatum | null, index: number | null) => void, onSelect?: (datum: WordCloudDatum, index: number) => void): {
    hoveredIndex: number | null;
    handleEnter: (d: WordCloudDatum, i: number) => void;
    handleLeave: () => void;
    handleClick: (d: WordCloudDatum, i: number) => void;
};
export { useChartDimensions } from '../_base/hooks';
//# sourceMappingURL=WordCloud.hooks.d.ts.map