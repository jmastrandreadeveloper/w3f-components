import React, { useRef, useMemo } from 'react';
import { Group } from '@visx/group';
import { Pie } from '@visx/shape';
import type { PieChartProps, PieChartDataPoint } from './PieChart.types';
import { PIE_CHART_DEFAULTS } from './PieChart.constants';
import { buildPieChartClasses, getSliceColor, getSliceValue } from './PieChart.utils';
import { useChartDimensions, useHoveredIndex } from './PieChart.hooks';
import { useBridgeBind } from '@w3f/bridge';

export type { PieChartProps, PieChartDataPoint } from './PieChart.types';

const PieChart = React.forwardRef<HTMLDivElement, PieChartProps>(
  (
    {
      data,
      width: propWidth,
      height: propHeight,
      donut = PIE_CHART_DEFAULTS.donut,
      unstyled = PIE_CHART_DEFAULTS.unstyled,
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
      PIE_CHART_DEFAULTS.width,
      PIE_CHART_DEFAULTS.height,
    );
    const { hoveredIndex, onEnter, onLeave } = useHoveredIndex();

    const radius = Math.min(width, height) / 2 - 10;
    const innerRadius = donut ? radius * 0.55 : 0;
    const centerX = width / 2;
    const centerY = height / 2;

    const classes = useMemo(
      () => buildPieChartClasses(className, unstyled),
      [className, unstyled],
    );

    return (
      <div ref={ref} className={classes} {...rest}>
        <div ref={containerRef} className="w3f-chart__container">
          <svg width={width} height={height}>
            <Group top={centerY} left={centerX}>
              <Pie<PieChartDataPoint>
                data={data}
                pieValue={getSliceValue}
                outerRadius={radius}
                innerRadius={innerRadius}
                padAngle={0.01}
              >
                {(pie) =>
                  pie.arcs.map((arc, i) => {
                    const pathD = pie.path(arc) ?? '';
                    return (
                      <g key={arc.data.label}>
                        <path
                          d={pathD}
                          fill={getSliceColor(arc.data, i)}
                          opacity={hoveredIndex === i ? 0.8 : 1}
                          onMouseEnter={() => onEnter(i)}
                          onMouseLeave={onLeave}
                          style={{ cursor: 'pointer', transition: 'opacity 0.15s' }}
                        />
                        {radius > 60 && (
                          <text
                            x={pie.path.centroid(arc)[0]}
                            y={pie.path.centroid(arc)[1]}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fill="#fff"
                            fontSize={11}
                            fontWeight={600}
                            pointerEvents="none"
                          >
                            {arc.data.label}
                          </text>
                        )}
                      </g>
                    );
                  })
                }
              </Pie>
            </Group>
          </svg>
        </div>
      </div>
    );
  },
);

PieChart.displayName = 'PieChart';

export { PieChart };
export default PieChart;
