import React, { useRef, useMemo } from 'react';
import { Group } from '@visx/group';
import { Circle } from '@visx/shape';
import { AxisBottom, AxisLeft } from '@visx/axis';
import type { ScatterPlotProps } from './ScatterPlot.types';
import { SCATTER_PLOT_DEFAULTS, SCATTER_PLOT_MARGIN } from './ScatterPlot.constants';
import { buildScatterPlotClasses, buildScatterScales, formatTick } from './ScatterPlot.utils';
import { useChartDimensions, useHoveredIndex } from './ScatterPlot.hooks';
import { useBridgeBind } from '@w3f/bridge';

export type { ScatterPlotProps, ScatterPlotDataPoint } from './ScatterPlot.types';

const ScatterPlot = React.forwardRef<HTMLDivElement, ScatterPlotProps>(
  (
    {
      data,
      width: propWidth,
      height: propHeight,
      color = SCATTER_PLOT_DEFAULTS.color,
      unstyled = SCATTER_PLOT_DEFAULTS.unstyled,
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
      SCATTER_PLOT_DEFAULTS.width,
      SCATTER_PLOT_DEFAULTS.height,
    );
    const { hoveredIndex, onEnter, onLeave } = useHoveredIndex();

    const margin = SCATTER_PLOT_MARGIN;
    const innerWidth = Math.max(width - margin.left - margin.right, 0);
    const innerHeight = Math.max(height - margin.top - margin.bottom, 0);

    const { xScale, yScale } = useMemo(
      () => buildScatterScales(data, innerWidth, innerHeight),
      [data, innerWidth, innerHeight],
    );

    const classes = useMemo(
      () => buildScatterPlotClasses(className, unstyled),
      [className, unstyled],
    );

    return (
      <div ref={ref} className={classes} {...rest}>
        <div ref={containerRef} className="w3f-chart__container">
          <svg width={width} height={height}>
            <Group top={margin.top} left={margin.left}>
              {data.map((d, i) => (
                <Circle
                  key={i}
                  cx={xScale(d.x) ?? 0}
                  cy={yScale(d.y) ?? 0}
                  r={d.size ?? SCATTER_PLOT_DEFAULTS.defaultPointSize}
                  fill={d.color ?? color}
                  opacity={hoveredIndex === i ? 0.7 : 0.85}
                  onMouseEnter={() => onEnter(i)}
                  onMouseLeave={onLeave}
                  style={{ cursor: 'pointer', transition: 'opacity 0.15s' }}
                />
              ))}
              <AxisBottom
                top={innerHeight}
                scale={xScale}
                tickFormat={formatTick}
                stroke="var(--w3f-text-secondary, #94a3b8)"
                tickStroke="var(--w3f-text-secondary, #94a3b8)"
                tickLabelProps={{ fill: 'var(--w3f-text-secondary, #94a3b8)', fontSize: 11 }}
              />
              <AxisLeft
                scale={yScale}
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

ScatterPlot.displayName = 'ScatterPlot';

export { ScatterPlot };
export default ScatterPlot;
