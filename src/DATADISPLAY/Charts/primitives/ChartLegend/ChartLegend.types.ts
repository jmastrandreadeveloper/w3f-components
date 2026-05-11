export interface ChartLegendItem {
    /** Stable id used as key. */
    id: string;
    /** Visible label. */
    label: string;
    /** Swatch color. */
    color: string;
    /** Whether the series is currently hidden (toggled off). */
    disabled?: boolean;
}

export type ChartLegendSwatchShape = 'square' | 'circle' | 'line';

export interface ChartLegendProps {
    /** Legend items to render. */
    items: readonly ChartLegendItem[];
    /** Shape of the color swatch. Defaults to 'square'. */
    swatchShape?: ChartLegendSwatchShape;
    /** Horizontal or vertical layout. Defaults to 'horizontal'. */
    direction?: 'horizontal' | 'vertical';
    /** Called when an item is clicked (for toggling series). */
    onToggle?: (item: ChartLegendItem, index: number) => void;
    /** Extra className. */
    className?: string;
}
