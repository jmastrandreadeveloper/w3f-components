import React, { createContext, useContext, memo, forwardRef } from 'react';
import type {
  MasonryProps, MasonryItemProps, MasonryCardProps,
  MasonryContextValue,
} from './Masonry.types';
import { MSN_CLASSES, MSN_DEFAULTS } from './Masonry.constants';
import {
  buildMasonryRootClasses, buildMasonryRootStyle,
  buildMasonryItemClasses, buildMasonryCardClasses,
} from './Masonry.utils';

// ── Context ────────────────────────────────────────────────────
const MasonryCtx = createContext<MasonryContextValue>({ variant: 'column' });

// ── MasonryItem ────────────────────────────────────────────────
/**
 * Layout wrapper for custom content inside a Masonry grid.
 * In column mode: applies `break-inside: avoid`.
 * In flex/grid mode: applies the size-based width/span class.
 */
export const MasonryItem: React.FC<MasonryItemProps> = memo(({
  size = MSN_DEFAULTS.size,
  children,
  className,
  style,
}) => {
  const { variant } = useContext(MasonryCtx);
  const cls = buildMasonryItemClasses(variant, size, className);
  return (
    <div className={cls} style={style}>
      {children}
    </div>
  );
});
MasonryItem.displayName = 'MasonryItem';

// ── MasonryCard ────────────────────────────────────────────────
/**
 * Card component for use inside Masonry.
 * Handles gradient header, title, hover effect, and optional
 * hidden input for form data integration.
 */
export const MasonryCard: React.FC<MasonryCardProps> = memo(({
  title,
  gradient,
  headerHeight = MSN_DEFAULTS.headerHeight,
  hover        = MSN_DEFAULTS.hover,
  size         = MSN_DEFAULTS.size,
  name,
  value,
  onClick,
  children,
  className,
  style,
}) => {
  const { variant } = useContext(MasonryCtx);
  const itemCls = buildMasonryItemClasses(variant, size);
  const cardCls = buildMasonryCardClasses(hover, className);

  return (
    <div className={itemCls} style={style}>
      <div
        className={cardCls}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(e as unknown as React.MouseEvent<HTMLDivElement>); } : undefined}
      >
        {gradient && (
          <div
            className={MSN_CLASSES.cardHeader}
            style={{ height: headerHeight, background: gradient }}
          />
        )}

        <div className={MSN_CLASSES.cardBody}>
          {title && <h3 className={MSN_CLASSES.cardTitle}>{title}</h3>}
          {children}
          {/* Form integration — hidden input */}
          {name !== undefined && (
            <input
              type="hidden"
              name={name}
              value={value !== undefined ? String(value) : ''}
            />
          )}
        </div>
      </div>
    </div>
  );
});
MasonryCard.displayName = 'MasonryCard';

// ── Masonry ────────────────────────────────────────────────────
/**
 * Masonry layout container. Three variants:
 * - `column` (default): CSS column-count, responsive breakpoints
 * - `flex`: flexbox wrap with size-based widths (small/medium/large/full)
 * - `grid`: CSS Grid auto-fit with size-based column spans
 *
 * Supports arbitrary children — use MasonryCard or MasonryItem
 * for layout-aware children, or any React element as freeform content.
 */
export const Masonry = forwardRef<HTMLDivElement, MasonryProps>(({
  variant         = MSN_DEFAULTS.variant,
  columns,
  baseColumnWidth,
  minCardWidth,
  gridColumns,
  gap,
  padding,
  children,
  unstyled        = MSN_DEFAULTS.unstyled,
  className,
  style,
}, ref) => {
  const rootCls   = buildMasonryRootClasses(variant, className, unstyled);
  const rootStyle = buildMasonryRootStyle(variant, {
    columns, gap, padding, baseColumnWidth, minCardWidth, gridColumns, style,
  });

  return (
    <MasonryCtx.Provider value={{ variant }}>
      <div ref={ref} className={rootCls} style={rootStyle}>
        {children}
      </div>
    </MasonryCtx.Provider>
  );
});
Masonry.displayName = 'Masonry';

export default Masonry;
