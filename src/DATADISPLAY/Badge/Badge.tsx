import React from 'react';
import type { BadgeProps } from './Badge.types';
import { buildBadgeClasses } from './Badge.utils';
import { useBadgeContent } from './Badge.hooks';
import { BADGE_DEFAULTS } from './Badge.constants';
import { useBridgeBind } from '@w3f/bridge';

export type { BadgeColor, BadgePosition, BadgeSize, BadgeVariant, BadgeProps } from './Badge.types';

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      color = BADGE_DEFAULTS.color,
      position = BADGE_DEFAULTS.position,
      size = BADGE_DEFAULTS.size,
      variant = BADGE_DEFAULTS.variant,
      className = BADGE_DEFAULTS.className,
      invisible = BADGE_DEFAULTS.invisible,
      ariaLabel = BADGE_DEFAULTS.ariaLabel,
      max = BADGE_DEFAULTS.max,
      pulse = BADGE_DEFAULTS.pulse,
      animate = BADGE_DEFAULTS.animate,
      unstyled = BADGE_DEFAULTS.unstyled,
      bindId,
      ...rest
    },
    ref,
  ) => {
    useBridgeBind({ bindId });
    if (invisible) return null;

    const { processed, effectiveAriaLabel } = useBadgeContent(children, max, variant, ariaLabel);

    const badgeClasses = React.useMemo(
      () => buildBadgeClasses(color, size, variant, position, pulse, animate, className, unstyled),
      [color, size, variant, position, pulse, animate, className, unstyled],
    );

    return (
      <span
        ref={ref}
        className={badgeClasses}
        role="status"
        aria-label={effectiveAriaLabel}
        {...rest}
      >
        {processed}
      </span>
    );
  },
);

Badge.displayName = 'Badge';

export { Badge };
export default Badge;
