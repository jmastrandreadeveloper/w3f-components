import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import { Chord as VisxChord, Ribbon } from '@visx/chord';
import { arc as d3arc } from 'd3-shape';
import type { ChordInnerProps } from './Chord.types';
import { CHORD_DEFAULTS } from './Chord.constants';
import { buildChordClasses, buildTooltipContent } from './Chord.utils';
import { useChordColors, useChordInteraction } from './Chord.hooks';
import { ChartTooltip } from '../primitives/ChartTooltip';
import { BASE_CHART_CLASSES } from '../_base/constants';
import { ChartHeader } from '../_base/ChartHeader';

export const ChordInner: React.FC<ChordInnerProps> = (props) => {
    const {
        data, width, height, className,
        unstyled = CHORD_DEFAULTS.unstyled, bindId, ariaLabel, description, colorScheme, title, subtitle,
        showLabels = CHORD_DEFAULTS.showLabels,
        showTooltip = CHORD_DEFAULTS.showTooltip,
        padAngle = CHORD_DEFAULTS.padAngle,
        onHover, onSelect,
    } = props;

    const { matrix, labels } = data;
    const colors = useChordColors(labels.length, colorScheme);
    const { hoveredIndex, hoveredDatum, handleEnter, handleLeave, handleClick } = useChordInteraction(onHover, onSelect);

    const classes = useMemo(() => buildChordClasses(className, unstyled), [className, unstyled]);

    const radius = Math.min(width, height) / 2 * 0.8;
    const cx = width / 2;
    const cy = height / 2;

    const arcGen = useMemo(() => d3arc<any>(), []);

    if (labels.length === 0 || matrix.length === 0) {
        return (
            <div className={classes}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Empty chord'} />
            </div>
        );
    }

    return (
        <div className={classes} data-bind-id={bindId}>
            <ChartHeader title={title} subtitle={subtitle} />
            <div className={BASE_CHART_CLASSES.container} style={{ position: 'relative' }}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Chord diagram'}>
                    {description && <desc>{description}</desc>}
                    <Group top={cy} left={cx}>
                        <VisxChord matrix={matrix} padAngle={padAngle}>
                            {({ chords }) => (
                                <g>
                                    {/* Outer group arcs */}
                                    {chords.groups.map((group, i) => {
                                        const pathStr = arcGen({
                                            startAngle: group.startAngle,
                                            endAngle: group.endAngle,
                                            innerRadius: radius - 10,
                                            outerRadius: radius,
                                        }) ?? '';

                                        return (
                                            <g key={`group-${i}`}>
                                                <path d={pathStr} fill={colors[i]} stroke={colors[i]} />
                                                {showLabels && (() => {
                                                    const angle = (group.startAngle + group.endAngle) / 2;
                                                    const textR = radius + 14;
                                                    const x = Math.cos(angle - Math.PI / 2) * textR;
                                                    const y = Math.sin(angle - Math.PI / 2) * textR;
                                                    return (
                                                        <text
                                                            x={x}
                                                            y={y}
                                                            fontSize={11}
                                                            fontWeight={500}
                                                            fill="var(--w3f-text, #333)"
                                                            textAnchor={angle > Math.PI ? 'end' : 'start'}
                                                            dominantBaseline="central"
                                                            pointerEvents="none"
                                                        >
                                                            {labels[i]}
                                                        </text>
                                                    );
                                                })()}
                                            </g>
                                        );
                                    })}
                                    {/* Inner ribbons */}
                                    {chords.map((chord, i) => {
                                        const isHovered = hoveredIndex === i;
                                        const opacity = hoveredIndex != null && !isHovered ? 0.15 : 0.65;
                                        const src = labels[chord.source.index];
                                        const tgt = labels[chord.target.index];
                                        const val = chord.source.value;
                                        const datum = { source: src, target: tgt, value: val };

                                        return (
                                            <Ribbon
                                                key={`ribbon-${i}`}
                                                chord={chord}
                                                radius={radius - 10}
                                                fill={colors[chord.source.index]}
                                                opacity={opacity}
                                                style={{ transition: 'opacity 120ms ease-out', cursor: onSelect ? 'pointer' : undefined }}
                                                onMouseEnter={() => handleEnter(datum, i)}
                                                onMouseLeave={handleLeave}
                                                onClick={onSelect ? () => handleClick(datum, i) : undefined}
                                            />
                                        );
                                    })}
                                </g>
                            )}
                        </VisxChord>
                    </Group>
                </svg>

                {showTooltip && hoveredDatum != null && (
                    <ChartTooltip left={cx} top={10} visible offsetY={0}>
                        {buildTooltipContent(hoveredDatum.source, hoveredDatum.target, hoveredDatum.value)}
                    </ChartTooltip>
                )}
            </div>
        </div>
    );
};

ChordInner.displayName = 'ChordInner';
export default ChordInner;
