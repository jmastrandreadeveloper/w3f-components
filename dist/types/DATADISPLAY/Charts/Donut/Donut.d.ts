import React from 'react';
/**
 * Donut chart — a Pie with a default inner radius of 0.55.
 * All Pie props are forwarded; override `innerRadius` for custom sizing.
 */
declare const Donut: React.ForwardRefExoticComponent<Omit<import("..").PieInnerProps, "height" | "width"> & {
    width?: number;
    height?: number;
} & React.RefAttributes<HTMLDivElement>>;
export { Donut };
export default Donut;
//# sourceMappingURL=Donut.d.ts.map