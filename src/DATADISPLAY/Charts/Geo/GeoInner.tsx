import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import { Mercator, Graticule } from '@visx/geo';
import type { GeoInnerProps, GeoFeatureDatum } from './Geo.types';
import { GEO_DEFAULTS } from './Geo.constants';
import { buildGeoClasses, buildTooltipContent } from './Geo.utils';
import { useGeoColorScale, useGeoInteraction } from './Geo.hooks';
import { ChartTooltip } from '../primitives/ChartTooltip';
import { BASE_CHART_CLASSES } from '../_base/constants';
import { ChartHeader } from '../_base/ChartHeader';

import './Geo.css';

export const GeoInner: React.FC<GeoInnerProps> = (props) => {
    const {
        data, width, height, className,
        unstyled = GEO_DEFAULTS.unstyled,
        bindId, ariaLabel, description, colorScheme, title, subtitle,
        showTooltip = GEO_DEFAULTS.showTooltip,
        showGraticule = GEO_DEFAULTS.showGraticule,
        fillDefault = GEO_DEFAULTS.fillDefault,
        strokeColor = GEO_DEFAULTS.strokeColor,
        strokeWidth = GEO_DEFAULTS.strokeWidth,
        onHover, onSelect,
    } = props;

    // Build value lookup: feature id → datum
    const valueMap = useMemo(() => {
        const map = new Map<string, GeoFeatureDatum>();
        for (const v of data.values) {
            map.set(v.id, v);
        }
        return map;
    }, [data.values]);

    // Extract numeric values for color scale
    const numericValues = useMemo(
        () => data.values.map((v) => v.value),
        [data.values],
    );

    const colorScale = useGeoColorScale(numericValues, colorScheme);
    const { hoveredIndex, handleEnter, handleLeave, handleClick } = useGeoInteraction(onHover, onSelect);
    const classes = useMemo(() => buildGeoClasses(className, unstyled), [className, unstyled]);

    const geojsonFeatures = data.geojson?.features;

    if (!geojsonFeatures || geojsonFeatures.length === 0) {
        return (
            <div className={classes}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Empty geo chart'} />
            </div>
        );
    }

    const centerX = width / 2;
    const centerY = height / 2;

    return (
        <div className={classes} data-bind-id={bindId}>
            <ChartHeader title={title} subtitle={subtitle} />
            <div className={BASE_CHART_CLASSES.container} style={{ position: 'relative' }}>
                <svg width={width} height={height} className={BASE_CHART_CLASSES.svg} role="img" aria-label={ariaLabel ?? 'Choropleth map'}>
                    {description && <desc>{description}</desc>}
                    <Mercator<any>
                        data={geojsonFeatures}
                        fitSize={[[width, height], data.geojson as any]}
                    >
                        {(mercator) => (
                            <Group>
                                {showGraticule && (
                                    <Graticule
                                        graticule={(g) => mercator.path(g) || ''}
                                        stroke="var(--w3f-border-light, #ddd)"
                                        strokeWidth={0.3}
                                        strokeOpacity={0.4}
                                    />
                                )}
                                {mercator.features.map(({ feature, path }, i) => {
                                    const featureId = feature.id ?? feature.properties?.iso_a3 ?? feature.properties?.id ?? feature.properties?.name ?? String(i);
                                    const match = valueMap.get(String(featureId));
                                    const fillColor = match ? colorScale(match.value) : fillDefault;
                                    const isHovered = hoveredIndex === i;
                                    const dimmed = hoveredIndex != null && !isHovered;

                                    const datum: GeoFeatureDatum = match ?? {
                                        id: String(featureId),
                                        value: 0,
                                        label: feature.properties?.name ?? String(featureId),
                                    };

                                    return (
                                        <path
                                            key={`geo-${i}`}
                                            d={path || ''}
                                            fill={fillColor}
                                            stroke={strokeColor}
                                            strokeWidth={isHovered ? strokeWidth * 2 : strokeWidth}
                                            opacity={dimmed ? 0.6 : 1}
                                            style={{ transition: 'opacity 120ms ease-out, stroke-width 120ms ease-out', cursor: onSelect ? 'pointer' : 'default' }}
                                            onMouseEnter={() => handleEnter(datum, i)}
                                            onMouseLeave={handleLeave}
                                            onClick={onSelect ? () => handleClick(datum, i) : undefined}
                                        />
                                    );
                                })}
                            </Group>
                        )}
                    </Mercator>
                </svg>

                {showTooltip && hoveredIndex != null && (() => {
                    const feature = geojsonFeatures[hoveredIndex];
                    if (!feature) return null;
                    const featureId = feature.id ?? feature.properties?.iso_a3 ?? feature.properties?.id ?? feature.properties?.name ?? String(hoveredIndex);
                    const match = valueMap.get(String(featureId));
                    const datum: GeoFeatureDatum = match ?? {
                        id: String(featureId),
                        value: 0,
                        label: feature.properties?.name ?? String(featureId),
                    };
                    return (
                        <ChartTooltip
                            left={centerX}
                            top={centerY}
                            visible
                            offsetY={-24}
                        >
                            {buildTooltipContent(datum)}
                        </ChartTooltip>
                    );
                })()}
            </div>
        </div>
    );
};

GeoInner.displayName = 'GeoInner';
export default GeoInner;
