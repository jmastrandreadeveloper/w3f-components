import React, { useRef, useMemo, useId } from 'react';
import { Group } from '@visx/group';
import { AreaClosed, LinePath } from '@visx/shape';
import { curveMonotoneX } from '@visx/curve';
import { LinearGradient } from '@visx/gradient';
import { AxisBottom, AxisLeft } from '@visx/axis';
import type { AreaChartProps, AreaChartDataPoint } from './AreaChart.types';
import { AREA_CHART_DEFAULTS, AREA_CHART_MARGIN } from './AreaChart.constants';
import { buildAreaChartClasses, buildAreaScales, formatTick } from './AreaChart.utils';
import { useChartDimensions } from './AreaChart.hooks';
import { useBridgeBind } from '@w3f/bridge';

export type { AreaChartProps, AreaChartDataPoint } from './AreaChart.types';

const AreaChart = React.forwardRef<HTMLDivElement, AreaChartProps>(
  (
    {
      data,
      width: propWidth,
      height: propHeight,
      color = AREA_CHART_DEFAULTS.color,
      gradient = AREA_CHART_DEFAULTS.gradient,
      unstyled = AREA_CHART_DEFAULTS.unstyled,
      bindId,
      className,
      ...rest
    },
    ref,
  ) => {
    useBridgeBind({ bindId });
    const containerRef = useRef<HTMLDivElement>(null);
    const gradientId = useId();
    const { width, height } = useChartDimensions(
      containerRef,
      propWidth,
      propHeight,
      AREA_CHART_DEFAULTS.width,
      AREA_CHART_DEFAULTS.height,
    );

    const margin = AREA_CHART_MARGIN;
    const innerWidth = Math.max(width - margin.left - margin.right, 0);
    const innerHeight = Math.max(height - margin.top - margin.bottom, 0);

    const { xScale, yScale } = useMemo(
      () => buildAreaScales(data, innerWidth, innerHeight),
      [data, innerWidth, innerHeight],
    );

    const classes = useMemo(
      () => buildAreaChartClasses(className, unstyled),
      [className, unstyled],
    );

    const getX = (d: AreaChartDataPoint) => xScale(d.x) ?? 0;
    const getY = (d: AreaChartDataPoint) => yScale(d.y) ?? 0;

    const safeGradientId = gradientId.replace(/:/g, '_');

    return (
      <div ref={ref} className={classes} {...rest}>
        <div ref={containerRef} className="w3f-chart__container">
          <svg width={width} height={height}>
            {gradient && (
              <LinearGradient
                id={safeGradientId}
                from={color}
                to={color}
                fromOpacity={0.4}
                toOpacity={0.05}
              />
            )}
            <Group top={margin.top} left={margin.left}>
              <AreaClosed
                data={data}
                x={getX}
                y={getY}
                yScale={yScale}
                curve={curveMonotoneX}
                fill={gradient ? `url(#${safeGradientId})` : color}
                fillOpacity={gradient ? 1 : 0.3}
              />
              <LinePath
                data={data}
                x={getX}
                y={getY}
                stroke={color}
                strokeWidth={2}
                curve={curveMonotoneX}
              />
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

AreaChart.displayName = 'AreaChart';

export { AreaChart };
export default AreaChart;
