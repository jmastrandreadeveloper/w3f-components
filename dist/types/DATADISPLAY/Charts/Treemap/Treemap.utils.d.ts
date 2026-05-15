import type { DatumHierarchy } from '../_base/types';
export declare function buildTreemapClasses(className: string | undefined, unstyled: boolean | undefined): string;
export declare function buildTreemapColors(leafCount: number, colorScheme: unknown): string[];
export declare function textFits(w: number, h: number, minW?: number, minH?: number): boolean;
export declare function truncateLabel(label: string, maxWidth: number, fontSize?: number): string;
export declare function buildTooltipContent(node: DatumHierarchy): string;
//# sourceMappingURL=Treemap.utils.d.ts.map