import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import { Wordcloud as VisxWordcloud } from '@visx/wordcloud';
import { scaleLinear } from '@visx/scale';
import type { WordCloudInnerProps, WordCloudDatum } from './WordCloud.types';
import { WORDCLOUD_DEFAULTS } from './WordCloud.constants';
import { buildWordCloudClasses, buildTooltipContent } from './WordCloud.utils';
import { useWordCloudColors, useWordCloudInteraction } from './WordCloud.hooks';
import { ChartTooltip } from '../primitives/ChartTooltip';
import { BASE_CHART_CLASSES } from '../_base/constants';
import { ChartHeader } from '../_base/ChartHeader';

export const WordCloudInner: React.FC<WordCloudInnerProps> = (props) => {
    const {
        data, width, height, className,
        unstyled = WORDCLOUD_DEFAULTS.unstyled, bindId, ariaLabel, description, colorScheme, title, subtitle,
        showTooltip = WORDCLOUD_DEFAULTS.showTooltip,
        fontFamily = WORDCLOUD_DEFAULTS.fontFamily,
        fontMinSize = WORDCLOUD_DEFAULTS.fontMinSize,
        fontMaxSize = WORDCLOUD_DEFAULTS.fontMaxSize,
        spiral = WORDCLOUD_DEFAULTS.spiral,
        rotate = 0,
        padding = WORDCLOUD_DEFAULTS.padding,
        onHover, onSelect,
    } = props;

    const colors = useWordCloudColors(data.length, colorScheme);
    const { hoveredIndex, handleEnter, handleLeave, handleClick } = useWordCloudInteraction(onHover, onSelect);

    const classes = useMemo(() => buildWordCloudClasses(className, unstyled), [className, unstyled]);

    const fontScale = useMemo(() => {
        const values = data.map((d) => d.value);
        const minVal = Math.min(...values);
        const maxVal = Math.max(...values);
        return scaleLinear<number>({
            domain: [minVal, maxVal],
            range: [fontMinSize, fontMaxSize],
        });
    }, [data, fontMinSize, fontMaxSize]);

    const rotateFn = useMemo(() => {
        if (typeof rotate === 'function') return rotate;
        return () => rotate;
    }, [rotate]);

    // Build a lookup from text to original index for color mapping
    const wordIndexMap = useMemo(() => {
        const map = new Map<string, number>();
        data.forEach((d, i) => map.set(d.text, i));
        return map;
    }, [data]);

    if (data.length === 0) {
        return (
            <div className={classes}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Empty word cloud'} />
            </div>
        );
    }

    return (
        <div className={classes} data-bind-id={bindId}>
            <ChartHeader title={title} subtitle={subtitle} />
            <div className={BASE_CHART_CLASSES.container} style={{ position: 'relative' }}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Word cloud'}>
                    {description && <desc>{description}</desc>}
                    <VisxWordcloud
                        width={width}
                        height={height}
                        words={data as WordCloudDatum[]}
                        fontSize={(d) => fontScale(d.value)}
                        font={fontFamily}
                        padding={padding}
                        spiral={spiral}
                        rotate={(d) => rotateFn(d as unknown as WordCloudDatum)}
                    >
                        {(cloud) => (
                            <Group top={height / 2} left={width / 2}>
                                {cloud.map((word, i) => {
                                    const originalIndex = wordIndexMap.get(word.text!) ?? i;
                                    const datum = data[originalIndex];
                                    const isHovered = hoveredIndex === originalIndex;
                                    const opacity = hoveredIndex != null && !isHovered ? 0.5 : 1;

                                    return (
                                        <text
                                            key={`${word.text}-${i}`}
                                            transform={`translate(${word.x}, ${word.y}) rotate(${word.rotate})`}
                                            fontSize={word.size}
                                            fontFamily={word.font}
                                            textAnchor="middle"
                                            fill={colors[originalIndex]}
                                            opacity={opacity}
                                            style={{ transition: 'opacity 120ms ease-out', cursor: onSelect ? 'pointer' : 'default' }}
                                            onMouseEnter={() => handleEnter(datum, originalIndex)}
                                            onMouseLeave={handleLeave}
                                            onClick={onSelect ? () => handleClick(datum, originalIndex) : undefined}
                                        >
                                            {word.text}
                                        </text>
                                    );
                                })}
                            </Group>
                        )}
                    </VisxWordcloud>
                </svg>

                {showTooltip && hoveredIndex != null && (() => {
                    const datum = data[hoveredIndex];
                    if (!datum) return null;
                    return (
                        <ChartTooltip
                            left={width / 2}
                            top={height / 2}
                            visible offsetY={-12}
                        >
                            {buildTooltipContent(datum)}
                        </ChartTooltip>
                    );
                })()}
            </div>
        </div>
    );
};

WordCloudInner.displayName = 'WordCloudInner';
export default WordCloudInner;
