import React from 'react';
import { GridRows, GridColumns } from '@visx/grid';
import type { ChartGridProps } from './ChartGrid.types';
import { CHART_GRID_DEFAULTS } from './ChartGrid.constants';
import { buildGridClasses } from './ChartGrid.utils';

/**
 * W3F ChartGrid — draws horizontal/vertical reference lines inside
 * the plot area. Theming comes from `--w3f-chart-grid-*` CSS vars.
 */
export const ChartGrid: React.FC<ChartGridProps> = (props) => {
    const {
        xScale,
        yScale,
        width,
        height,
        top = 0,
        left = 0,
        axis = CHART_GRID_DEFAULTS.axis,
        numTicks = CHART_GRID_DEFAULTS.numTicks,
        className,
    } = props;

    const rootClass = buildGridClasses(axis, className);

    const commonProps = {
        stroke: 'var(--w3f-chart-grid-stroke)',
        strokeDasharray: 'var(--w3f-chart-grid-stroke-dasharray)' as unknown as string,
        strokeOpacity: 1,
        numTicks,
    };

    const drawRows = (axis === 'rows' || axis === 'both') && yScale;
    const drawCols = (axis === 'columns' || axis === 'both') && xScale;

    return (
        <g className={rootClass} transform={`translate(${left}, ${top})`}>
            {drawRows && (
                <GridRows
                    scale={yScale}
                    width={width}
                    height={height}
                    {...commonProps}
                />
            )}
            {drawCols && (
                <GridColumns
                    scale={xScale}
                    width={width}
                    height={height}
                    {...commonProps}
                />
            )}
        </g>
    );
};

ChartGrid.displayName = 'ChartGrid';

export default ChartGrid;
