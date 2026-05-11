/**
 * Unified mock data entry point for W3F charts.
 *
 * Re-exports every `@visx/mock-data` dataset and generator alongside
 * W3F-specific datasets shaped to match the canonical types in
 * `_base/types.ts`.
 *
 * IMPORTANT: this module is used only by demos and tests. Production
 * charts never import from here — consumers pass their own data.
 */

// ── @visx/mock-data — datasets ─────────────────────────────────────────

export { default as appleStock } from '@visx/mock-data/lib/mocks/appleStock';
export { default as bitcoinPrice } from '@visx/mock-data/lib/mocks/bitcoinPrice';
export { default as browserUsage } from '@visx/mock-data/lib/mocks/browserUsage';
export { default as cityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
export { default as exoplanets } from '@visx/mock-data/lib/mocks/exoplanets';
export { default as groupDateValue } from '@visx/mock-data/lib/mocks/groupDateValue';
export { default as lesMiserables } from '@visx/mock-data/lib/mocks/lesMiserables';
export { default as letterFrequency } from '@visx/mock-data/lib/mocks/letterFrequency';
export { default as planets } from '@visx/mock-data/lib/mocks/planets';
export { default as shakespeare } from '@visx/mock-data/lib/mocks/shakespeare';

// ── @visx/mock-data — generators ───────────────────────────────────────

export { default as genBin } from '@visx/mock-data/lib/generators/genBin';
export { default as genBins } from '@visx/mock-data/lib/generators/genBins';
export { default as genDateValue } from '@visx/mock-data/lib/generators/genDateValue';
export { default as genPhyllotaxis } from '@visx/mock-data/lib/generators/genPhyllotaxis';
export { default as genRandomNormalPoints } from '@visx/mock-data/lib/generators/genRandomNormalPoints';
export { default as genStats } from '@visx/mock-data/lib/generators/genStats';

// ── W3F datasets ───────────────────────────────────────────────────────

export {
    MONTHLY_SALES,
    LETTER_FREQUENCY,
    QUARTERLY_GROUP,
    QUARTERLY_GROUP_KEYS,
    MULTI_SERIES_WEEKLY,
    TEMPERATURE_COMPARISON,
    STREAM_TRAFFIC,
    STREAM_TRAFFIC_KEYS,
    BROWSER_SHARE,
    HEATMAP_7x12,
    REGIONAL_HIERARCHY,
    SCATTER_CORRELATION,
    BUBBLE_DATA,
    DOT_PLOT_DATA,
    DISTRIBUTION_DATA,
    HISTOGRAM_DATA,
} from './w3fDatasets';

export type { DistributionGroup } from './w3fDatasets';
