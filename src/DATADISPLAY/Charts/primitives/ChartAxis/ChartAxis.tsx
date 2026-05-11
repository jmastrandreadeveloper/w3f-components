import React from 'react';
import { AxisBottom, AxisLeft, AxisRight, AxisTop } from '@visx/axis';
import type { ChartAxisProps } from './ChartAxis.types';
import { CHART_AXIS_DEFAULTS } from './ChartAxis.constants';
import { buildAxisClasses } from './ChartAxis.utils';
import { useTickFormat } from './ChartAxis.hooks';

/**
 * W3F ChartAxis — thin primitive wrapper around `@visx/axis`.
 *
 * - Picks the correct axis component based on `orientation`.
 * - Applies W3F theming via CSS variables (no hardcoded colors).
 * - Forwards tick count, format, and label props.
 */
export const ChartAxis: React.FC<ChartAxisProps> = (props) => {
    const {
        scale,
        orientation,
        top,
        left,
        numTicks = CHART_AXIS_DEFAULTS.numTicks,
        tickFormat,
        label,
        labelOffset = CHART_AXIS_DEFAULTS.labelOffset,
        hideAxisLine = CHART_AXIS_DEFAULTS.hideAxisLine,
        hideTicks = CHART_AXIS_DEFAULTS.hideTicks,
        hideTickLabels = CHART_AXIS_DEFAULTS.hideTickLabels,
        tickRotate = 0,
        className,
    } = props;

    const format = useTickFormat(tickFormat);
    const rootClass = buildAxisClasses(orientation, className);

    const commonProps = {
        scale,
        top,
        left,
        numTicks,
        tickFormat: format,
        label,
        labelOffset,
        hideAxisLine,
        hideTicks,
        hideZero: false,
        stroke: 'var(--w3f-chart-axis-stroke)',
        tickStroke: 'var(--w3f-chart-axis-tick-stroke)',
        tickLabelProps: () => ({
            fill: 'var(--w3f-chart-axis-tick-label-color)',
            fontSize: 11,
            fontFamily: 'inherit',
            textAnchor:
                tickRotate !== 0 && (orientation === 'bottom' || orientation === 'top')
                    ? ('end' as const)
                    : orientation === 'left'
                      ? ('end' as const)
                      : orientation === 'right'
                        ? ('start' as const)
                        : ('middle' as const),
            dy: orientation === 'top' ? '-0.25em' : '0.25em',
            angle: tickRotate,
        }),
        labelProps: {
            fill: 'var(--w3f-chart-axis-label-color)',
            fontSize: 12,
            fontWeight: 500,
            textAnchor: 'middle' as const,
        },
    };

    const AxisComponent =
        orientation === 'top'
            ? AxisTop
            : orientation === 'right'
              ? AxisRight
              : orientation === 'bottom'
                ? AxisBottom
                : AxisLeft;

    // Hide tick labels by rendering an empty string.
    const finalTickFormat = hideTickLabels ? () => '' : format;

    return (
        <g className={rootClass}>
            <AxisComponent {...commonProps} tickFormat={finalTickFormat} />
        </g>
    );
};

ChartAxis.displayName = 'ChartAxis';

export default ChartAxis;
