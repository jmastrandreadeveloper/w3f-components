import type React from 'react';
import type { MasonryVariant, MasonryItemSize, MasonryBreakpoints } from './Masonry.types';
import { MSN_CLASSES, MSN_DEFAULTS } from './Masonry.constants';

// ── Container ──────────────────────────────────────────────────
export function buildMasonryRootClasses(
  variant:   MasonryVariant,
  className?: string,
  unstyled?: boolean,
): string {
  const base = MSN_CLASSES.root;
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(' ');
  const varCls = {
    column: MSN_CLASSES.varColumn,
    flex:   MSN_CLASSES.varFlex,
    grid:   MSN_CLASSES.varGrid,
  }[variant];
  return [base, varCls, className].filter(Boolean).join(' ');
}

export function buildMasonryRootStyle(
  variant: MasonryVariant,
  opts: {
    columns?:         MasonryBreakpoints;
    gap?:             string;
    padding?:         string;
    baseColumnWidth?: string;
    minCardWidth?:    string;
    gridColumns?:     number;
    style?:           React.CSSProperties;
  },
): React.CSSProperties {
  const gap     = opts.gap     ?? MSN_DEFAULTS.gap;
  const padding = opts.padding ?? MSN_DEFAULTS.padding;

  if (variant === 'column') {
    const { xs = 1, sm = 2, md = 3, lg = 4, xl } = opts.columns ?? MSN_DEFAULTS.columns;
    return {
      padding,
      columnGap:             gap,
      '--w3f-msn-cols-xs':   xs,
      '--w3f-msn-cols-sm':   sm,
      '--w3f-msn-cols-md':   md,
      '--w3f-msn-cols-lg':   lg,
      '--w3f-msn-cols-xl':   xl ?? lg,
      '--w3f-msn-gap':       gap,
      ...opts.style,
    } as React.CSSProperties;
  }

  if (variant === 'flex') {
    const base = opts.baseColumnWidth ?? MSN_DEFAULTS.baseColumnWidth;
    return {
      padding,
      gap,
      '--w3f-msn-base': base,
      '--w3f-msn-gap':  gap,
      ...opts.style,
    } as React.CSSProperties;
  }

  // grid
  const min  = opts.minCardWidth ?? MSN_DEFAULTS.minCardWidth;
  const cols = opts.gridColumns
    ? `repeat(${opts.gridColumns}, 1fr)`
    : `repeat(auto-fit, minmax(${min}, 1fr))`;

  return {
    padding,
    gap,
    gridTemplateColumns: cols,
    ...opts.style,
  };
}

// ── Item ───────────────────────────────────────────────────────
export function buildMasonryItemClasses(
  variant:    MasonryVariant,
  size:       MasonryItemSize,
  className?: string,
): string {
  // Size classes only matter for flex & grid
  const sizeClass = variant !== 'column'
    ? ({
        small:  MSN_CLASSES.itemSmall,
        medium: MSN_CLASSES.itemMedium,
        large:  MSN_CLASSES.itemLarge,
        full:   MSN_CLASSES.itemFull,
      }[size] ?? '')
    : '';

  return [MSN_CLASSES.item, sizeClass, className].filter(Boolean).join(' ');
}

// ── Card ───────────────────────────────────────────────────────
export function buildMasonryCardClasses(
  hover:      boolean,
  className?: string,
): string {
  return [
    MSN_CLASSES.card,
    hover ? MSN_CLASSES.cardHover : '',
    className,
  ].filter(Boolean).join(' ');
}
