import type React from 'react';

export type BadgeColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'gray';

export type BadgePosition =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'middle-right'
  | 'middle-left';

export type BadgeSize = 'sm' | 'md' | 'lg';

export type BadgeVariant = 'solid' | 'outline' | 'soft' | 'dot';

export interface BadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'> {
  children?: React.ReactNode;
  color?: BadgeColor;
  position?: BadgePosition | null;
  size?: BadgeSize;
  variant?: BadgeVariant;
  className?: string;
  invisible?: boolean;
  ariaLabel?: string;
  max?: number;
  pulse?: boolean;
  animate?: boolean;
  /** When true, strips visual styles — compose appearance via trait classes. */
  unstyled?: boolean;
  /** Bridge binding ID — connects this component to business logic via the Bridge. */
  bindId?: string;
}

export interface BadgeWrapperProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  children: React.ReactNode;
  badgeContent?: React.ReactNode;
  badgeProps?: Omit<BadgeProps, 'children'> & { showZero?: boolean };
  className?: string;
  style?: React.CSSProperties;
  overlap?: boolean;
  /** Controls distance of the badge from the container corner via --w3f-badge-offset.
   *  Accepts any CSS length: '0px', '4px', '-2px'. Positive = closer to center, negative = further out. */
  offset?: string;
}
