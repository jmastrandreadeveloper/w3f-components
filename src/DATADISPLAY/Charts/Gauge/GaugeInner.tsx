import React, { useMemo } from 'react';
import type { GaugeInnerProps } from './Gauge.types';
import { GAUGE_DEFAULTS } from './Gauge.constants';
import { buildGaugeClasses, arcPath, needlePath } from './Gauge.utils';
import { useGaugeScale, useGaugeColor } from './Gauge.hooks';
import { BASE_CHART_CLASSES } from '../_base/constants';
import { ChartHeader } from '../_base/ChartHeader';

export const GaugeInner: React.FC<GaugeInnerProps> = (props) => {
    const {
        value, width, height, className,
        unstyled = GAUGE_DEFAULTS.unstyled, bindId, ariaLabel, description, title, subtitle,
        min = GAUGE_DEFAULTS.min, max = GAUGE_DEFAULTS.max,
        color = GAUGE_DEFAULTS.color, thresholds,
        showValue = GAUGE_DEFAULTS.showValue,
        showMinMax = GAUGE_DEFAULTS.showMinMax,
        highlightIndex,
        formatValue,
    } = props;

    const scale = useGaugeScale(min, max);
    const fillColor = useGaugeColor(value, color, thresholds);
    const classes = useMemo(() => buildGaugeClasses(className, unstyled), [className, unstyled]);

    const cx = width / 2;
    const cy = height * 0.72;
    const outerR = Math.min(width / 2, height * 0.65) * 0.9;
    const innerR = outerR * 0.7;
    const needleLen = outerR * 0.85;

    const startAngle = -Math.PI / 2;
    const endAngle = Math.PI / 2;
    const valueAngle = scale(value) as number;
    const needle = needlePath(cx, cy, needleLen, valueAngle);
    const fmt = formatValue ?? ((v: number) => v.toFixed(0));

    // Build threshold segments (sorted ascending)
    const segments = useMemo(() => {
        if (!thresholds || thresholds.length === 0) return null;
        const sorted = [...thresholds].sort((a, b) => a.value - b.value);
        return sorted.map((t, i) => {
            const from = i === 0 ? min : sorted[i - 1].value;
            const to = t.value;
            return { color: t.color, fromAngle: scale(from) as number, toAngle: scale(to) as number };
        });
    }, [thresholds, min, scale]);

    return (
        <div className={classes} data-bind-id={bindId}>
            <ChartHeader title={title} subtitle={subtitle} />
            <div className={BASE_CHART_CLASSES.container}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? `Gauge: ${value}`}>
                    {description && <desc>{description}</desc>}

                    {segments ? (
                        /* Threshold arcs — each segment colored, highlightIndex dims others */
                        segments.map((seg, i) => (
                            <path
                                key={i}
                                d={arcPath(cx, cy, outerR, innerR, seg.fromAngle, seg.toAngle)}
                                fill={seg.color}
                                opacity={highlightIndex != null && highlightIndex !== i ? 0.25 : 1}
                                style={{ transition: 'opacity 150ms ease-out' }}
                            />
                        ))
                    ) : (
                        <>
                            {/* Background arc */}
                            <path d={arcPath(cx, cy, outerR, innerR, startAngle, endAngle)} fill="var(--w3f-chart-grid-stroke, #e2e8f0)" opacity={0.4} />
                            {/* Filled arc */}
                            <path d={arcPath(cx, cy, outerR, innerR, startAngle, valueAngle)} fill={fillColor} />
                        </>
                    )}

                    {/* Value progress overlay when using threshold segments */}
                    {segments && (
                        <path
                            d={arcPath(cx, cy, outerR * 0.96, innerR * 1.04, startAngle, valueAngle)}
                            fill="rgba(0,0,0,0.18)"
                        />
                    )}

                    {/* Needle */}
                    <path d={needle} fill="var(--w3f-chart-text-color, #1e293b)" />
                    <circle cx={cx} cy={cy} r={6} fill="var(--w3f-chart-text-color, #1e293b)" />
                    <circle cx={cx} cy={cy} r={3} fill="#fff" />

                    {/* Value label */}
                    {showValue && (
                        <text
                            x={cx} y={cy + outerR * 0.35}
                            textAnchor="middle"
                            fontSize={Math.max(16, outerR * 0.22)}
                            fontWeight={700}
                            fill="var(--w3f-chart-text-color, #1e293b)"
                        >
                            {fmt(value)}
                        </text>
                    )}

                    {/* Min / Max labels */}
                    {showMinMax && (
                        <>
                            <text
                                x={cx - outerR - 4} y={cy + 4}
                                textAnchor="end"
                                fontSize={10}
                                fill="var(--w3f-chart-secondary-text-color, #94a3b8)"
                            >
                                {min}
                            </text>
                            <text
                                x={cx + outerR + 4} y={cy + 4}
                                textAnchor="start"
                                fontSize={10}
                                fill="var(--w3f-chart-secondary-text-color, #94a3b8)"
                            >
                                {max}
                            </text>
                        </>
                    )}
                </svg>
            </div>
        </div>
    );
};

GaugeInner.displayName = 'GaugeInner';
export default GaugeInner;
