import type { BaseChartProps, ChartEventProps } from '../_base/types';
export type GeoFeatureDatum = {
    id: string;
    value: number;
    label?: string;
};
/** 0022 PB11 (w3f-data-analysis): un punto (burbuja) sobre el mapa. */
export type GeoPointDatum = {
    lat: number;
    lon: number;
    value: number;
    label?: string;
    /** Grupo (color): el índice en `GeoData.groups`. */
    group?: string;
};
export type GeoData = {
    /** Values to map onto geographic features by matching feature.id */
    values: readonly GeoFeatureDatum[];
    /** GeoJSON FeatureCollection with polygons/multipolygons to render */
    geojson: {
        type: string;
        features: any[];
    };
    /** 0022 PB11: puntos encima del mapa (radio según el valor, color según el grupo). */
    points?: readonly GeoPointDatum[];
    /** 0022 PB11: los grupos de los puntos, en orden (un color de la paleta cada uno). */
    groups?: readonly string[];
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
    /** How values map to colors: linear (default), quantile (by rank: good for very uneven data) or log. */
    colorScale?: GeoColorScale;
    /** 0022 B53.6: el nombre de cada provincia / país en su centro. Default false. */
    showRegionLabels?: boolean;
    /** 0022 B53.6: tamaño de esos nombres (px). Default 9. */
    regionLabelSize?: number;
    /** 0022 PB11: radio del punto de mayor valor (px). Default 18. */
    pointMaxRadius?: number;
    /** 0022 PB11: opacidad de los puntos (0 a 1). Default 0.7. */
    pointOpacity?: number;
    /** 0022 PB11: color de los puntos sin grupo (si no, el primero de la paleta). */
    pointColor?: string;
}
export type GeoColorScale = 'linear' | 'quantile' | 'log';
export type GeoProps = Omit<GeoInnerProps, 'width' | 'height'> & {
    width?: number;
    height?: number;
};
//# sourceMappingURL=Geo.types.d.ts.map