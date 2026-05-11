import React, { useRef, useMemo } from 'react';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { AxisBottom, AxisLeft } from '@visx/axis';
import type { BarChartProps } from './BarChart.types';
import { BAR_CHART_DEFAULTS, BAR_CHART_MARGIN } from './BarChart.constants';
import { buildBarChartClasses, buildBarScales, formatTick } from './BarChart.utils';
import { useChartDimensions, useHoveredIndex } from './BarChart.hooks';
import { useBridgeBind } from '@w3f/bridge';

export type { BarChartProps, BarChartDataPoint } from './BarChart.types';

const BarChart = React.forwardRef<HTMLDivElement, BarChartProps>(
  (
    {
      data,
      width: propWidth,
      height: propHeight,
      color = BAR_CHART_DEFAULTS.color,
      horizontal = BAR_CHART_DEFAULTS.horizontal,
      unstyled = BAR_CHART_DEFAULTS.unstyled,
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
      BAR_CHART_DEFAULTS.width,
      BAR_CHART_DEFAULTS.height,
    );
    const { hoveredIndex, onEnter, onLeave } = useHoveredIndex();

    const margin = BAR_CHART_MARGIN;
    const innerWidth = Math.max(width - margin.left - margin.right, 0);
    const innerHeight = Math.max(height - margin.top - margin.bottom, 0);

    const { xScale, yScale } = useMemo(
      () => buildBarScales(data, innerWidth, innerHeight, horizontal),
      [data, innerWidth, innerHeight, horizontal],
    );

    const classes = useMemo(
      () => buildBarChartClasses(className, unstyled),
      [className, unstyled],
    );

    return (
      <div ref={ref} className={classes} {...rest}>
        <div ref={containerRef} className="w3f-chart__container">
          <svg width={width} height={height}>
            <Group top={margin.top} left={margin.left}>
              {data.map((d, i) => {
                if (horizontal) {
                  const bandScale = yScale as ReturnType<typeof import('@visx/scale').scaleBand<string>>;
                  const linearScale = xScale as ReturnType<typeof import('@visx/scale').scaleLinear<number>>;
                  const barHeight = bandScale.bandwidth?.() ?? 0;
                  const barWidth = linearScale(d.value) ?? 0;
                  const barY = bandScale(d.label) ?? 0;
                  return (
                    <Bar
                      key={d.label}
                      x={0}
                      y={barY}
                      width={barWidth}
                      height={barHeight}
                      fill={color}
                      opacity={hoveredIndex === i ? 0.8 : 1}
                      rx={2}
                      onMouseEnter={() => onEnter(i)}
                      onMouseLeave={onLeave}
                    />
                  );
                }

                const bandScale = xScale as ReturnType<typeof import('@visx/scale').scaleBand<string>>;
                const linearScale = yScale as ReturnType<typeof import('@visx/scale').scaleLinear<number>>;
                const barWidth = bandScale.bandwidth?.() ?? 0;
                const barHeight = innerHeight - (linearScale(d.value) ?? 0);
                const barX = bandScale(d.label) ?? 0;
                const barY = linearScale(d.value) ?? 0;
                return (
                  <Bar
                    key={d.label}
                    x={barX}
                    y={barY}
                    width={barWidth}
                    height={barHeight}
                    fill={color}
                    opacity={hoveredIndex === i ? 0.8 : 1}
                    rx={2}
                    onMouseEnter={() => onEnter(i)}
                    onMouseLeave={onLeave}
                  />
                );
              })}
              <AxisBottom
                top={innerHeight}
                scale={horizontal
                  ? (xScale as ReturnType<typeof import('@visx/scale').scaleLinear<number>>)
                  : (xScale as ReturnType<typeof import('@visx/scale').scaleBand<string>>)
                }
                tickFormat={formatTick}
                stroke="var(--w3f-text-secondary, #94a3b8)"
                tickStroke="var(--w3f-text-secondary, #94a3b8)"
                tickLabelProps={{ fill: 'var(--w3f-text-secondary, #94a3b8)', fontSize: 11 }}
              />
              <AxisLeft
                scale={horizontal
                  ? (yScale as ReturnType<typeof import('@visx/scale').scaleBand<string>>)
                  : (yScale as ReturnType<typeof import('@visx/scale').scaleLinear<number>>)
                }
                tickFormat={formatTick}
                stroke="var(--w3f-text-secondary, #94a3b8)"
                tickStroke="var(--w3f-text-secondary, #94a3b8)"
                tickLabelProps={{ fill: 'var(--w3f-text-secondary, #94a3b8)', fontSize: 11 }}
              />
            </Group>
          </svg>
        </div>
      </div>
    );
  },
);

BarChart.displayName = 'BarChart';

export { BarChart };
export default BarChart;
