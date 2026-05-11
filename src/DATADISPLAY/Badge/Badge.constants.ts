import type { BadgeColor, BadgePosition, BadgeSize, BadgeVariant } from './Badge.types';

export const BADGE_COLORS: Record<BadgeColor, string> = {
  primary: 'w3f-bg-primary',
  secondary: 'w3f-bg-secondary',
  success: 'w3f-bg-success',
  warning: 'w3f-bg-warning',
  danger: 'w3f-bg-danger',
  info: 'w3f-bg-info',
  gray: 'w3f-bg-gray',
};

export const BADGE_POSITIONS: Record<BadgePosition, string> = {
  'top-right': 'badge-top-right',
  'top-left': 'badge-top-left',
  'top-center': 'badge-top-center',
  'bottom-right': 'badge-bottom-right',
  'bottom-left': 'badge-bottom-left',
  'bottom-center': 'badge-bottom-center',
  'middle-right': 'badge-middle-right',
  'middle-left': 'badge-middle-left',
};

export const BADGE_SIZES: Record<BadgeSize, string> = {
  sm: 'w3f-badge-sm',
  md: 'w3f-badge-md',
  lg: 'w3f-badge-lg',
};

export const BADGE_VARIANTS: Record<BadgeVariant, string> = {
  solid: '',
  outline: 'w3f-badge-outline',
  soft: 'w3f-badge-soft',
  dot: 'w3f-badge-dot',
};

export const BADGE_DEFAULTS = {
  color: 'primary' as BadgeColor,
  size: 'md' as BadgeSize,
  variant: 'solid' as BadgeVariant,
  position: null as BadgePosition | null,
  max: 99,
  pulse: false,
  animate: false,
  invisible: false,
  ariaLabel: '',
  className: '',
  unstyled: false,
} as const;
