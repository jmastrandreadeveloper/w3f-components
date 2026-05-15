import React from 'react';
/**
 * Bar — responsive wrapper around `BarInner`.
 *
 * If `width`/`height` are omitted, the chart observes its parent
 * container and auto-sizes (width-responsive, height defaults to 300).
 *
 * Use `<BarInner>` directly when you control dimensions explicitly.
 */
declare const Bar: React.ForwardRefExoticComponent<Omit<import("./Bar.types").BarInnerProps, "height" | "width"> & {
    width?: number;
    height?: number;
} & React.RefAttributes<HTMLDivElement>>;
export { Bar };
export default Bar;
//# sourceMappingURL=Bar.d.ts.map