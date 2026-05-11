import type { DatumSlice } from '../_base/types';
import { WAFFLE_ROOT_CLASS } from './Waffle.constants';
import { buildChartRootClasses, resolveColorScheme } from '../_base/utils';

export function buildWaffleClasses(className: string | undefined, unstyled: boolean | undefined): string {
    return buildChartRootClasses(WAFFLE_ROOT_CLASS, className, unstyled);
}

export function buildWaffleColors(count: number, colorScheme: unknown): string[] {
    const palette = resolveColorScheme(colorScheme as any);
    return Array.from({ length: count }, (_, i) => palette[i % palette.length]);
}

export function buildCellMap(data: readonly DatumSlice[], totalCells: number): number[] {
    const total = data.reduce((sum, d) => sum + d.value, 0);
    if (total === 0) return Array(totalCells).fill(-1);

    const cells: number[] = [];
    let remaining = totalCells;

    data.forEach((d, sliceIndex) => {
        const proportion = d.value / total;
        const count = sliceIndex === data.length - 1
            ? remaining
            : Math.round(proportion * totalCells);
        for (let j = 0; j < count && cells.length < totalCells; j++) {
            cells.push(sliceIndex);
        }
        remaining -= count;
    });

    while (cells.length < totalCells) {
        cells.push(data.length - 1);
    }

    return cells;
}

export function buildTooltipContent(d: DatumSlice, total: number): string {
    const pct = total > 0 ? ((d.value / total) * 100).toFixed(1) : '0';
    return `${d.label}: ${d.value.toLocaleString()} (${pct}%)`;
}
