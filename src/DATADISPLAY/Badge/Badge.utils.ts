import type { BadgeColor, BadgePosition, BadgeSize, BadgeVariant } from './Badge.types';
import {
  BADGE_COLORS,
  BADGE_POSITIONS,
  BADGE_SIZES,
  BADGE_VARIANTS,
} from './Badge.constants';

export function buildBadgeClasses(
  color: BadgeColor,
  size: BadgeSize,
  variant: BadgeVariant,
  position: BadgePosition | null,
  pulse: boolean,
  animate: boolean,
  className: string,
  unstyled?: boolean,
): string {
  if (unstyled) {
    return [
      'w3f-badge',
      'w3f-badge--unstyled',
      position ? BADGE_POSITIONS[position] : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');
  }

  return [
    'w3f-badge',
    BADGE_COLORS[color] || BADGE_COLORS.primary,
    BADGE_SIZES[size] || BADGE_SIZES.md,
    BADGE_VARIANTS[variant] || '',
    position ? BADGE_POSITIONS[position] : '',
    pulse ? 'w3f-badge-pulse' : '',
    animate ? 'w3f-badge-animate' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export function processContent(
  children: React.ReactNode,
  max: number,
  variant: BadgeVariant,
): React.ReactNode {
  if (variant === 'dot') return null;
  if (typeof children === 'number' && children > max) return `${max}+`;
  return children;
}

export function getAriaLabel(
  ariaLabel: string,
  variant: BadgeVariant,
  children: React.ReactNode,
  processedContent: React.ReactNode,
): string | undefined {
  if (ariaLabel) return ariaLabel;
  if (variant === 'dot') return 'Notification indicator';
  if (typeof children === 'number') return `${processedContent} notifications`;
  return undefined;
}
