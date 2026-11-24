import React from 'react';
/**
 * Línea guía de los gráficos de varias series en el tiempo (AreaStacked, Streamgraph, LineMulti, Threshold):
 * al pasar el mouse por cualquier lugar del dibujo, una línea vertical en la fecha más cercana, un punto en
 * cada serie y un cartel con la fecha y el valor de cada una (0022 P112, pedido del usuario: «se debería ver el
 * dato donde está el cursor»). Línea y puntos van con pointer-events: none: los clics siguen llegando a las
 * capas / líneas (drill-down).
 */
export type CrosshairRow = {
    label: string;
    value: string;
    color?: string;
    strong?: boolean;
};
export type CrosshairState = {
    index: number;
    y: number;
} | null;
/** Estado de la guía: índice de la fecha más cercana al mouse y la altura del mouse (para el cartel). */
export declare function useCrosshair(marginLeft: number, marginTop: number, xScale: {
    invert: (x: number) => Date | number;
}, dates: readonly (Date | number | string)[], onChange?: (index: number | null) => void): {
    hover: CrosshairState;
    move: (e: React.MouseEvent<Element>) => void;
    leave: () => void;
};
/**
 * Todas las fechas de varias series, sin repetir y en orden (las series pueden no tener las mismas). `toDate`
 * tiene que ser el mismo que usa el gráfico (un texto ISO es día local, no UTC).
 */
export declare function unionDates(series: readonly {
    data: readonly {
        date: Date | number | string;
    }[];
}[], toDate?: (v: Date | number | string) => Date): Date[];
/** El texto de la fecha del cartel: con el formato del eje si hay uno, si no la fecha local. */
export declare function crosshairDate(d: Date, format?: (v: unknown) => string): string;
export type ChartCrosshairProps = {
    /** x de la fecha dentro del área del dibujo. */
    x: number;
    /** Alto del área del dibujo. */
    height: number;
    /** Un punto por serie en esa fecha. */
    dots?: {
        y: number;
        color: string;
    }[];
};
/** La línea vertical y los puntos (dentro del <Group> del dibujo). */
export declare const ChartCrosshair: React.FC<ChartCrosshairProps>;
export type ChartCrosshairTipProps = {
    left: number;
    top: number;
    title: string;
    rows: CrosshairRow[];
};
/** El cartel con la fecha y el valor de cada serie (fuera del <svg>, dentro del contenedor relativo). */
export declare const ChartCrosshairTip: React.FC<ChartCrosshairTipProps>;
//# sourceMappingURL=ChartCrosshair.d.ts.map