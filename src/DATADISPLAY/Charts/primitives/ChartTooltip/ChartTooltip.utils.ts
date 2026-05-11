import { CHART_TOOLTIP_CLASSES } from './ChartTooltip.constants';

export function buildTooltipClasses(
    visible: boolean,
    className?: string,
): string {
    const parts: string[] = [CHART_TOOLTIP_CLASSES.root];
    if (!visible) parts.push(CHART_TOOLTIP_CLASSES.hidden);
    if (className) parts.push(className);
    return parts.join(' ');
}
