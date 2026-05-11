import { CHART_LEGEND_CLASSES, CHART_LEGEND_DEFAULTS } from './ChartLegend.constants';
import type { ChartLegendSwatchShape } from './ChartLegend.types';

export function buildLegendClasses(
    direction: 'horizontal' | 'vertical' | undefined,
    className: string | undefined,
): string {
    const dir = direction ?? CHART_LEGEND_DEFAULTS.direction;
    const parts: string[] = [
        CHART_LEGEND_CLASSES.root,
        dir === 'vertical' ? CHART_LEGEND_CLASSES.vertical : CHART_LEGEND_CLASSES.horizontal,
    ];
    if (className) parts.push(className);
    return parts.join(' ');
}

export function buildItemClasses(
    disabled: boolean | undefined,
    clickable: boolean,
): string {
    const parts: string[] = [CHART_LEGEND_CLASSES.item];
    if (disabled) parts.push(CHART_LEGEND_CLASSES.itemDisabled);
    if (clickable) parts.push(CHART_LEGEND_CLASSES.itemClickable);
    return parts.join(' ');
}

export function getSwatchStyle(
    color: string,
    shape: ChartLegendSwatchShape,
    disabled: boolean | undefined,
): React.CSSProperties {
    return {
        display: 'inline-block',
        width: 'var(--w3f-chart-legend-swatch-size, 12px)',
        height: shape === 'line' ? '2px' : 'var(--w3f-chart-legend-swatch-size, 12px)',
        borderRadius:
            shape === 'circle'
                ? '50%'
                : shape === 'line'
                  ? '0'
                  : 'var(--w3f-chart-legend-swatch-radius, 2px)',
        backgroundColor: disabled ? '#94a3b8' : color,
        flexShrink: 0,
    };
}
