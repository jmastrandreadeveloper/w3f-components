import type { BaseChartProps, ChartEventProps } from '../_base/types';

export type GeoFeatureDatum = {
    id: string;
    value: number;
    label?: string;
};

export type GeoData = {
    /** Values to map onto geographic features by matching feature.id */
    values: readonly GeoFeatureDatum[];
    /** GeoJSON FeatureCollection with polygons/multipolygons to render */
    geojson: { type: string; features: any[] };
};

export interface GeoInnerProps extends BaseChartProps, ChartEventProps<GeoFeatureDatum> {
    width: number;
    height: number;
    data: GeoData;
    showTooltip?: boolean;
    showGraticule?: boolean;
    fillDefault?: string;
    strokeColor?: string;
    strokeWidth?: number;
}

export type GeoProps = Omit<GeoInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};
