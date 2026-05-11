import React from 'react';
import { BASE_CHART_CLASSES } from './constants';

interface ChartHeaderProps {
    title?: string;
    subtitle?: string;
}

/**
 * ChartHeader — renders title + subtitle above a chart.
 * Returns null if neither title nor subtitle is provided.
 */
export const ChartHeader: React.FC<ChartHeaderProps> = ({ title, subtitle }) => {
    if (!title && !subtitle) return null;

    return (
        <div className={BASE_CHART_CLASSES.header}>
            {title && <div className={BASE_CHART_CLASSES.title}>{title}</div>}
            {subtitle && <div className={BASE_CHART_CLASSES.subtitle}>{subtitle}</div>}
        </div>
    );
};

ChartHeader.displayName = 'ChartHeader';
