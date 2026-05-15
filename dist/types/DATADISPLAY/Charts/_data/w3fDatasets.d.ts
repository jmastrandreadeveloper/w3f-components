/**
 * W3F-specific sample datasets shaped exactly like the canonical types
 * in `_base/types.ts`. Used by demos to showcase charts with consistent
 * data without importing the visx mock format.
 */
import type { Datum1D, DatumGraph, DatumGroup, DatumHierarchy, DatumMatrix, DatumSlice, DatumXY, MultiSeriesTime } from '../_base/types';
import type { WaterfallDatum } from '../Waterfall/Waterfall.types';
import type { CandlestickDatum } from '../Candlestick/Candlestick.types';
import type { BulletDatum } from '../Bullet/Bullet.types';
import type { CalendarDatum } from '../CalendarHeatmap/CalendarHeatmap.types';
import type { GanttTask } from '../Gantt/Gantt.types';
import type { WordCloudDatum } from '../WordCloud/WordCloud.types';
import type { GeoFeatureDatum } from '../Geo/Geo.types';
export declare const MONTHLY_SALES: readonly Datum1D[];
export declare const LETTER_FREQUENCY: readonly Datum1D[];
export declare const QUARTERLY_GROUP: readonly DatumGroup[];
export declare const QUARTERLY_GROUP_KEYS: readonly ["sales", "costs", "profit"];
export declare const MULTI_SERIES_WEEKLY: readonly MultiSeriesTime[];
export declare const TEMPERATURE_COMPARISON: readonly {
    date: Date;
    value0: number;
    value1: number;
}[];
export declare const STREAM_TRAFFIC: readonly MultiSeriesTime[];
export declare const STREAM_TRAFFIC_KEYS: readonly ["direct", "organic", "referral", "social", "email"];
export declare const BROWSER_SHARE: readonly DatumSlice[];
export declare const HEATMAP_7x12: readonly DatumMatrix[];
export declare const REGIONAL_HIERARCHY: DatumHierarchy;
export declare const SCATTER_CORRELATION: readonly DatumXY[];
export declare const BUBBLE_DATA: readonly DatumXY[];
export declare const DOT_PLOT_DATA: readonly DatumXY[];
export type DistributionGroup = {
    group: string;
    values: number[];
};
export declare const DISTRIBUTION_DATA: readonly DistributionGroup[];
export declare const HISTOGRAM_DATA: readonly number[];
export declare const RADAR_SKILLS: readonly Datum1D[];
export declare const SOCIAL_NETWORK: DatumGraph;
export declare const ENERGY_FLOW: DatumGraph;
export declare const SALES_FUNNEL: readonly Datum1D[];
export declare const QUARTERLY_PL: readonly WaterfallDatum[];
export declare const STOCK_OHLC: readonly CandlestickDatum[];
export declare const SPARKLINE_REVENUE: readonly number[];
export declare const SPARKLINE_USERS: readonly number[];
export declare const SPARKLINE_ERRORS: readonly number[];
export declare const KPI_BULLETS: readonly BulletDatum[];
export declare const CONTRIBUTIONS_2025: readonly CalendarDatum[];
export type ChordDataset = {
    matrix: number[][];
    labels: string[];
};
export declare const DEPT_INTERACTION: ChordDataset;
export declare const WIND_DIRECTIONS: readonly Datum1D[];
export declare const BUDGET_ALLOCATION: readonly DatumSlice[];
export declare const PROJECT_TIMELINE: readonly GanttTask[];
export declare const TECH_BUZZWORDS: readonly WordCloudDatum[];
export declare const WORLD_POPULATION: readonly GeoFeatureDatum[];
//# sourceMappingURL=w3fDatasets.d.ts.map