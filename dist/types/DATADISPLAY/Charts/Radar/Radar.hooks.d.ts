import type { RadarDatum } from './Radar.types';
export declare function useRadarAccessors(getLabel?: (d: RadarDatum) => string, getValue?: (d: RadarDatum) => number): {
    getLabel: (d: RadarDatum) => string;
    getValue: (d: RadarDatum) => number;
};
export declare function useRadarScale(data: readonly RadarDatum[], getValue: (d: RadarDatum) => number, radius: number, maxValue?: number): import("d3-scale").ScaleLinear<number, number, never>;
export declare function useRadarColor(colorScheme: unknown): string;
export declare function useRadarInteraction(onHover?: (datum: RadarDatum | null, index: number | null) => void, onSelect?: (datum: RadarDatum, index: number) => void): {
    hoveredIndex: number | null;
    handleEnter: (d: RadarDatum, i: number) => void;
    handleLeave: () => void;
    handleClick: (d: RadarDatum, i: number) => void;
};
export { useChartDimensions } from '../_base/hooks';
//# sourceMappingURL=Radar.hooks.d.ts.map