import React from 'react';
import type { MasonryProps, MasonryItemProps, MasonryCardProps } from './Masonry.types';
/**
 * Layout wrapper for custom content inside a Masonry grid.
 * In column mode: applies `break-inside: avoid`.
 * In flex/grid mode: applies the size-based width/span class.
 */
export declare const MasonryItem: React.FC<MasonryItemProps>;
/**
 * Card component for use inside Masonry.
 * Handles gradient header, title, hover effect, and optional
 * hidden input for form data integration.
 */
export declare const MasonryCard: React.FC<MasonryCardProps>;
/**
 * Masonry layout container. Three variants:
 * - `column` (default): CSS column-count, responsive breakpoints
 * - `flex`: flexbox wrap with size-based widths (small/medium/large/full)
 * - `grid`: CSS Grid auto-fit with size-based column spans
 *
 * Supports arbitrary children — use MasonryCard or MasonryItem
 * for layout-aware children, or any React element as freeform content.
 */
export declare const Masonry: React.ForwardRefExoticComponent<MasonryProps & React.RefAttributes<HTMLDivElement>>;
export default Masonry;
//# sourceMappingURL=Masonry.d.ts.map