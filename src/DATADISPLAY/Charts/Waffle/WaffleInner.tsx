import React, { useMemo } from 'react';
import type { WaffleInnerProps } from './Waffle.types';
import { WAFFLE_DEFAULTS } from './Waffle.constants';
import { buildWaffleClasses, buildTooltipContent } from './Waffle.utils';
import { useWaffleColors, useWaffleCellMap, useWaffleInteraction } from './Waffle.hooks';
import { ChartTooltip } from '../primitives/ChartTooltip';
import { ChartLegend } from '../primitives/ChartLegend';
import { BASE_CHART_CLASSES } from '../_base/constants';
import { ChartHeader } from '../_base/ChartHeader';

export const WaffleInner: React.FC<WaffleInnerProps> = (props) => {
    const {
        data, width, height, className,
        unstyled = WAFFLE_DEFAULTS.unstyled, bindId, ariaLabel, description, colorScheme, title, subtitle,
        showTooltip = WAFFLE_DEFAULTS.showTooltip,
        showLegend = WAFFLE_DEFAULTS.showLegend,
        totalCells = WAFFLE_DEFAULTS.totalCells,
        columns = WAFFLE_DEFAULTS.columns,
        cellGap = WAFFLE_DEFAULTS.cellGap,
        cellRadius = WAFFLE_DEFAULTS.cellRadius,
        onHover, onSelect,
    } = props;

    const colors = useWaffleColors(data.length, colorScheme);
    const cellMap = useWaffleCellMap(data, totalCells);
    const { hoveredIndex, handleEnter, handleLeave, handleClick } = useWaffleInteraction(onHover, onSelect);

    const classes = useMemo(() => buildWaffleClasses(className, unstyled), [className, unstyled]);

    const rows = Math.ceil(totalCells / columns);
    const legendHeight = showLegend ? 36 : 0;
    const svgHeight = height - legendHeight;

    const cellW = (width - (columns - 1) * cellGap) / columns;
    const cellH = (svgHeight - (rows - 1) * cellGap) / rows;
    const cellSize = Math.min(cellW, cellH);

    const gridW = cellSize * columns + cellGap * (columns - 1);
    const gridH = cellSize * rows + cellGap * (rows - 1);
    const offsetX = (width - gridW) / 2;
    const offsetY = (svgHeight - gridH) / 2;

    const total = useMemo(() => data.reduce((s, d) => s + d.value, 0), [data]);

    const legendItems = useMemo(
        () => data.map((d, i) => ({ id: d.id, label: d.label, color: colors[i] })),
        [data, colors],
    );

    if (data.length === 0) {
        return (
            <div className={classes}>
                <svg width={width} height={svgHeight} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Empty waffle'} />
            </div>
        );
    }

    return (
        <div className={classes} data-bind-id={bindId}>
            <ChartHeader title={title} subtitle={subtitle} />
            <div className={BASE_CHART_CLASSES.container} style={{ position: 'relative' }}>
                <svg width={width} height={svgHeight} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Waffle chart'}>
                    {description && <desc>{description}</desc>}
                    {cellMap.map((sliceIdx, cellIdx) => {
                        if (sliceIdx < 0) return null;
                        const col = cellIdx % columns;
                        const row = Math.floor(cellIdx / columns);
                        const x = offsetX + col * (cellSize + cellGap);
                        const y = offsetY + row * (cellSize + cellGap);
                        const d = data[sliceIdx];
                        const isHovered = hoveredIndex === sliceIdx;
                        const opacity = hoveredIndex != null && !isHovered ? 0.4 : 1;

                        return (
                            <rect
                                key={cellIdx}
                                x={x}
                                y={y}
                                width={cellSize}
                                height={cellSize}
                                rx={cellRadius}
                                fill={d.color ?? colors[sliceIdx]}
                                opacity={opacity}
                                style={{ transition: 'opacity 120ms ease-out', cursor: onSelect ? 'pointer' : undefined }}
                                onMouseEnter={() => handleEnter(d, sliceIdx)}
                                onMouseLeave={handleLeave}
                                onClick={onSelect ? () => handleClick(d, sliceIdx) : undefined}
                            />
                        );
                    })}
                </svg>

                {showTooltip && hoveredIndex != null && (() => {
                    const d = data[hoveredIndex];
                    if (!d) return null;
                    return (
                        <ChartTooltip left={width / 2} top={0} visible offsetY={-12}>
                            {buildTooltipContent(d, total)}
                        </ChartTooltip>
                    );
                })()}
            </div>

            {showLegend && (
                <ChartLegend items={legendItems} direction="horizontal" />
            )}
        </div>
    );
};

WaffleInner.displayName = 'WaffleInner';
export default WaffleInner;
