import React from 'react';
/**
 * Flechas libres encima de la hoja del tablero (pedido 2026-11-01: «flechas que se puedan editar y cambiar en tiempo
 * real moviendo, escalando, torciendo»). Las coordenadas van en unidades de la grilla (x en columnas, y en filas): así
 * la flecha queda en el mismo lugar con cualquier zoom, ancho o en el PDF.
 *
 * Con `editable`: clic en una flecha la elige (`onSelect(id)`); con la elegida aparecen tres manijas: el inicio, la
 * punta y la curva (arrastrar la del medio la tuerce). Arrastrar el cuerpo la mueve entera. Al soltar, `onChange` recibe
 * la lista nueva.
 */
export interface DashboardArrow {
    id: string;
    /** inicio y punta, en unidades de la grilla (x: columnas, y: filas) */
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    /** curva: desplazamiento del medio hacia un costado, en fracción del largo (-1 a 1; 0 = recta) */
    bend?: number;
    color?: string;
    /** grosor en px */
    width?: number;
    dash?: 'solid' | 'dashed' | 'dotted';
    /** puntas: al final, en los dos extremos o ninguna (una línea) */
    heads?: 'end' | 'both' | 'none';
    /** texto en el medio de la flecha */
    label?: string;
}
export interface DashboardArrowsProps {
    arrows: readonly DashboardArrow[];
    gridRef: React.RefObject<HTMLDivElement | null>;
    columns: number;
    rowHeight: number;
    gap: number;
    editable?: boolean;
    selectedId?: string | null;
    onSelect?: (id: string | null) => void;
    onChange?: (arrows: DashboardArrow[]) => void;
}
type Pt = {
    x: number;
    y: number;
};
/** El punto de control de la curva (en px) para una flecha con inicio a, punta b y su `bend`. */
export declare function controlPoint(a: Pt, b: Pt, bend: number): Pt;
/** El `bend` que deja el medio de la curva en el punto p (proyección sobre la perpendicular). */
export declare function bendFor(a: Pt, b: Pt, p: Pt): number;
export declare const DashboardArrows: React.FC<DashboardArrowsProps>;
export default DashboardArrows;
//# sourceMappingURL=DashboardArrows.d.ts.map