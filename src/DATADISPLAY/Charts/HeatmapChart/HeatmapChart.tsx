import React, { useRef, useMemo } from 'react';
import { Group } from '@visx/group';
import type { HeatmapChartProps } from './HeatmapChart.types';
import { HEATMAP_CHART_DEFAULTS, HEATMAP_CHART_MARGIN } from './HeatmapChart.constants';
import {
  buildHeatmapChartClasses,
  extractAxes,
  buildHeatmapScales,
  getValue,
} from './HeatmapChart.utils';
import { useChartDimensions, useHoveredIndex } from './HeatmapChart.hooks';
import { useBridgeBind } from '@w3f/bridge';

export type { HeatmapChartProps, HeatmapDataPoint } from './HeatmapChart.types';

const HeatmapChart = React.forwardRef<HTMLDivElement, HeatmapChartProps>(
  (
    {
      data,
      width: propWidth,
      height: propHeight,
      colors = HEATMAP_CHART_DEFAULTS.colors,
      unstyled = HEATMAP_CHART_DEFAULTS.unstyled,
      bindId,
      className,
      ...rest
    },
    ref,
  ) => {
    useBridgeBind({ bindId });
    const containerRef = useRef<HTMLDivElement>(null);
    const { width, height } = useChartDimensions(
      containerRef,
      propWidth,
      propHeight,
      HEATMAP_CHART_DEFAULTS.width,
      HEATMAP_CHART_DEFAULTS.height,
    );
    const { hoveredIndex, onEnter, onLeave } = useHoveredIndex();

    const margin = HEATMAP_CHART_MARGIN;
    const innerWidth = Math.max(width - margin.left - margin.right, 0);
    const innerHeight = Math.max(height - margin.top - margin.bottom, 0);

    const classes = useMemo(
      () => buildHeatmapChartClasses(className, unstyled),
      [className, unstyled],
    );

    const { rows, cols } = useMemo(() => extractAxes(data), [data]);
    const { xScale, yScale, colorScale } = useMemo(
      () => buildHeatmapScales(data, innerWidth, innerHeight, colors),
      [data, innerWidth, innerHeight, colors],
    );

    // Build flat list of cells for rendering
    const cells = useMemo(() => {
      const result: Array<{
        row: string;
        col: string;
        value: number;
        x: number;
        y: number;
        w: number;
        h: number;
        fill: string;
        idx: number;
      }> = [];
      let idx = 0;
      for (const row of rows) {
        for (const col of cols) {
          const val = getValue(data, row, col);
          if (val !== undefined) {
            result.push({
              row,
              col,
              value: val,
              x: xScale(col) ?? 0,
              y: yScale(row) ?? 0,
              w: xScale.bandwidth(),
              h: yScale.bandwidth(),
              fill: colorScale(val) as string,
              idx: idx++,
            });
          }
        }
      }
      return result;
    }, [data, rows, cols, xScale, yScale, colorScale]);

    return (
      <div ref={ref} className={classes} {...rest}>
        <div ref={containerRef} className="w3f-chart__container">
          <svg width={width} height={height}>
            <Group top={margin.top} left={margin.left}>
              {/* Cells */}
              {cells.map((cell) => (
                <rect
                  key={`${cell.row}-${cell.col}`}
                  x={cell.x}
                  y={cell.y}
                  width={cell.w}
                  height={cell.h}
                  fill={cell.fill}
                  opacity={hoveredIndex === cell.idx ? 0.8 : 1}
                  rx={2}
                  onMouseEnter={() => onEnter(cell.idx)}
                  onMouseLeave={onLeave}
                  style={{ cursor: 'pointer' }}
                />
              ))}
              {/* Column labels (bottom) */}
              {cols.map((col) => (
                <text
                  key={`col-${col}`}
                  x={(xScale(col) ?? 0) + xScale.bandwidth() / 2}
                  y={innerHeight + 16}
                  textAnchor="middle"
                  fill="var(--w3f-text-secondary, #94a3b8)"
                  fontSize={10}
                >
                  {col}
                </text>
              ))}
              {/* Row labels (left) */}
              {rows.map((row) => (
                <text
                  key={`row-${row}`}
                  x={-8}
                  y={(yScale(row) ?? 0) + yScale.bandwidth() / 2}
                  textAnchor="end"
                  dominantBaseline="central"
                  fill="var(--w3f-text-secondary, #94a3b8)"
                  fontSize={10}
                >
                  {row}
                </text>
              ))}
            </Group>
          </svg>
        </div>
      </div>
    );
  },
);

HeatmapChart.displayName = 'HeatmapChart';

export { HeatmapChart };
export default HeatmapChart;
