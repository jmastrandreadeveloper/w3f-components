import React from 'react';
import type { ChartLegendProps } from './ChartLegend.types';
import { CHART_LEGEND_CLASSES, CHART_LEGEND_DEFAULTS } from './ChartLegend.constants';
import { buildLegendClasses, buildItemClasses, getSwatchStyle } from './ChartLegend.utils';

/**
 * W3F ChartLegend — renders a list of color swatches with labels.
 *
 * Supports toggle interaction (for hiding/showing series).
 * Styled via `--w3f-chart-legend-*` CSS vars.
 */
export const ChartLegend: React.FC<ChartLegendProps> = (props) => {
    const {
        items,
        swatchShape = CHART_LEGEND_DEFAULTS.swatchShape,
        direction = CHART_LEGEND_DEFAULTS.direction,
        onToggle,
        className,
    } = props;

    const rootClass = buildLegendClasses(direction, className);
    const clickable = !!onToggle;

    if (items.length === 0) return null;

    return (
        <div className={rootClass} role="list" aria-label="Chart legend">
            {items.map((item, i) => (
                <button
                    key={item.id}
                    type="button"
                    className={buildItemClasses(item.disabled, clickable)}
                    onClick={clickable ? () => onToggle!(item, i) : undefined}
                    disabled={!clickable}
                    role="listitem"
                    aria-label={`${item.label}${item.disabled ? ' (hidden)' : ''}`}
                >
                    <span
                        className={CHART_LEGEND_CLASSES.swatch}
                        style={getSwatchStyle(item.color, swatchShape, item.disabled)}
                        aria-hidden
                    />
                    <span className={CHART_LEGEND_CLASSES.label}>{item.label}</span>
                </button>
            ))}
        </div>
    );
};

ChartLegend.displayName = 'ChartLegend';

export default ChartLegend;
