import React from 'react';
/**
 * 0022 B53.3 (w3f-data-analysis): un punto con forma (círculo, cuadrado, triángulo, rombo) para Dispersión y Puntos
 * por categoría. Recibe las mismas props SVG que un <circle> (fill, opacity, stroke, eventos…).
 */
export type ChartPointShapeName = 'circle' | 'square' | 'triangle' | 'diamond';
export interface ChartPointShapeProps extends Omit<React.SVGProps<SVGElement>, 'ref'> {
    shape?: ChartPointShapeName;
    cx: number;
    cy: number;
    r: number;
}
/** El `d` de un path con la forma (para square / triangle / diamond). */
export declare const shapePath: (shape: ChartPointShapeName, cx: number, cy: number, r: number) => string;
export declare const ChartPointShape: React.FC<ChartPointShapeProps>;
/** Recta de mínimos cuadrados y = a + b·x y su R² (null con menos de 2 puntos o X constante). */
export declare const linearFit: (xs: number[], ys: number[]) => {
    a: number;
    b: number;
    r2: number;
} | null;
export default ChartPointShape;
//# sourceMappingURL=ChartPointShape.d.ts.map