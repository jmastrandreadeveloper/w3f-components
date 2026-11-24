import type { DatumHierarchy } from '../_base/types';
export declare function buildTreemapClasses(className: string | undefined, unstyled: boolean | undefined): string;
export declare function buildTreemapColors(leafCount: number, colorScheme: unknown): string[];
export declare function textFits(w: number, h: number, minW?: number, minH?: number): boolean;
export declare function truncateLabel(label: string, maxWidth: number, fontSize?: number): string;
/** «Operaciones › Producción › Materia prima: 42»: con niveles, el camino de arriba hacia abajo (0022 P99). */
export declare function buildTooltipContent(node: DatumHierarchy, path?: string[]): string;
//# sourceMappingURL=Treemap.utils.d.ts.map