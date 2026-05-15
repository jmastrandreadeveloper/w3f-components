import type { BadgeColor, BadgePosition, BadgeSize, BadgeVariant } from './Badge.types';
export declare const BADGE_COLORS: Record<BadgeColor, string>;
export declare const BADGE_POSITIONS: Record<BadgePosition, string>;
export declare const BADGE_SIZES: Record<BadgeSize, string>;
export declare const BADGE_VARIANTS: Record<BadgeVariant, string>;
export declare const BADGE_DEFAULTS: {
    readonly color: BadgeColor;
    readonly size: BadgeSize;
    readonly variant: BadgeVariant;
    readonly position: BadgePosition | null;
    readonly max: 99;
    readonly pulse: false;
    readonly animate: false;
    readonly invisible: false;
    readonly ariaLabel: "";
    readonly className: "";
    readonly unstyled: false;
};
//# sourceMappingURL=Badge.constants.d.ts.map