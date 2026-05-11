import React, { useRef, useMemo } from 'react';
import { Group } from '@visx/group';
import { LinePath } from '@visx/shape';
import { curveMonotoneX, curveLinear } from '@visx/curve';
import { AxisBottom, AxisLeft } from '@visx/axis';
import type { LineChartProps, LineChartDataPoint } from './LineChart.types';
import { LINE_CHART_DEFAULTS, LINE_CHART_MARGIN } from './LineChart.constants';
import { buildLineChartClasses, buildLineScales, formatTick } from './LineChart.utils';
import { useChartDimensions } from './LineChart.hooks';
import { useBridgeBind } from '@w3f/bridge';

export type { LineChartProps, LineChartDataPoint } from './LineChart.types';

const LineChart = React.forwardRef<HTMLDivElement, LineChartProps>(
  (
    {
      data,
      width: propWidth,
      height: propHeight,
      color = LINE_CHART_DEFAULTS.color,
      curved = LINE_CHART_DEFAULTS.curved,
      showDots = LINE_CHART_DEFAULTS.showDots,
      unstyled = LINE_CHART_DEFAULTS.unstyled,
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
      LINE_CHART_DEFAULTS.width,
      LINE_CHART_DEFAULTS.height,
    );

    const margin = LINE_CHART_MARGIN;
    const innerWidth = Math.max(width - margin.left - margin.right, 0);
    const innerHeight = Math.max(height - margin.top - margin.bottom, 0);

    const { xScale, yScale } = useMemo(
      () => buildLineScales(data, innerWidth, innerHeight),
      [data, innerWidth, innerHeight],
    );

    const classes = useMemo(
      () => buildLineChartClasses(className, unstyled),
      [className, unstyled],
    );

    const getX = (d: LineChartDataPoint) => xScale(d.x) ?? 0;
    const getY = (d: LineChartDataPoint) => yScale(d.y) ?? 0;

    return (
      <div ref={ref} className={classes} {...rest}>
        <div ref={containerRef} className="w3f-chart__container">
          <svg width={width} height={height}>
            <Group top={margin.top} left={margin.left}>
              <LinePath
                data={data}
                x={getX}
                y={getY}
                stroke={color}
                strokeWidth={2}
                curve={curved ? curveMonotoneX : curveLinear}
              />
              {showDots &&
                data.map((d, i) => (
                  <circle
                    key={i}
                    cx={getX(d)}
                    cy={getY(d)}
                    r={4}
                    fill={color}
                    stroke="var(--w3f-surface, #fff)"
                    strokeWidth={2}
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

LineChart.displayName = 'LineChart';

export { LineChart };
export default LineChart;
