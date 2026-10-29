/**
 * VX9 (matplotlib hexbin): points grouped in a grid of pointy hexagons (the d3-hexbin algorithm), in pixels.
 */
export type HexBin = {
    x: number;
    y: number;
    n: number;
};
export declare function hexBins(points: readonly [number, number][], size: number): HexBin[];
/** The path of a pointy hexagon of radius `size` centered at (x, y). */
export declare function hexPath(x: number, y: number, size: number): string;
//# sourceMappingURL=Scatter.hexbin.d.ts.map