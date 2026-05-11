import type { ChartGridAxis } from './ChartGrid.types';
import { CHART_GRID_CLASSES } from './ChartGrid.constants';

export function buildGridClasses(axis: ChartGridAxis, className?: string): string {
    const parts: string[] = [CHART_GRID_CLASSES.root];
    if (axis === 'rows' || axis === 'both') parts.push(CHART_GRID_CLASSES.rows);
    if (axis === 'columns' || axis === 'both') parts.push(CHART_GRID_CLASSES.columns);
    if (className) parts.push(className);
    return parts.join(' ');
}
