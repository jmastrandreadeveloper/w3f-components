import React from 'react';
import type { DonutProps } from './Donut.types';
import { Pie } from '../Pie/Pie';

/**
 * Donut chart — a Pie with a default inner radius of 0.55.
 * All Pie props are forwarded; override `innerRadius` for custom sizing.
 */
const Donut = React.forwardRef<HTMLDivElement, DonutProps>(
    (props, ref) => <Pie ref={ref} innerRadius={0.55} {...props} />,
);
Donut.displayName = 'Donut';
export { Donut };
export default Donut;
