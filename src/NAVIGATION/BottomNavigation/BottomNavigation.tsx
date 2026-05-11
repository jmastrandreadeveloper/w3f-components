import React, { forwardRef, useMemo } from 'react';
import type { BottomNavigationProps, BottomNavigationActionProps } from './BottomNavigation.types';
import { BOTTOM_NAV_DEFAULTS, BOTTOM_NAV_ACTION_DEFAULTS, BOTTOM_NAV_CLASSES } from './BottomNavigation.constants';
import { buildBottomNavClasses, buildActionClasses, formatBadge } from './BottomNavigation.utils';
import {
    BottomNavContext,
    useBottomNav,
    useBottomNavAction,
    useBottomNavContext,
} from './BottomNavigation.hooks';

// ─────────────────────────────────────────────────────────────────────────────
// BottomNavigationAction
// ─────────────────────────────────────────────────────────────────────────────

const BottomNavigationAction: React.FC<BottomNavigationActionProps> = ({
    icon,
    label,
    value,
    showLabel: showLabelProp,
    disabled = BOTTOM_NAV_ACTION_DEFAULTS.disabled,
    badge,
    className = BOTTOM_NAV_ACTION_DEFAULTS.className,
    onClick,
    ...props
}) => {
    const ctx = useBottomNavAction();
    const isActive = ctx.value === value;
    const showLabel = showLabelProp !== undefined ? showLabelProp : ctx.showLabels;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled) return;
        if (onClick) onClick(e);
        if (ctx.onChange && value !== undefined) ctx.onChange(e, value);
    };

    const cls = useMemo(
        () => buildActionClasses(isActive, disabled, showLabel, className),
        [isActive, disabled, showLabel, className],
    );

    return (
        <button
            className={cls}
            onClick={handleClick}
            disabled={disabled}
            role="tab"
            aria-selected={isActive}
            aria-label={label}
            {...props}
        >
            <span className={BOTTOM_NAV_CLASSES.icon}>
                {icon}
                {badge !== undefined && badge !== null && (
                    <span className={BOTTOM_NAV_CLASSES.badge}>{formatBadge(badge)}</span>
                )}
            </span>
            {label && (showLabel || isActive) && (
                <span className={BOTTOM_NAV_CLASSES.label}>{label}</span>
            )}
        </button>
    );
};

BottomNavigationAction.displayName = 'BottomNavigationAction';

// ─────────────────────────────────────────────────────────────────────────────
// BottomNavigation
// ─────────────────────────────────────────────────────────────────────────────

const BottomNavigation = forwardRef<HTMLElement, BottomNavigationProps>(({
    value: valueProp,
    defaultValue,
    onChange,
    showLabels = BOTTOM_NAV_DEFAULTS.showLabels,
    color = BOTTOM_NAV_DEFAULTS.color,
    variant = BOTTOM_NAV_DEFAULTS.variant,
    fixed = BOTTOM_NAV_DEFAULTS.fixed,
    disabled = BOTTOM_NAV_DEFAULTS.disabled,
    unstyled = BOTTOM_NAV_DEFAULTS.unstyled,
    className = BOTTOM_NAV_DEFAULTS.className,
    children,
    ...props
}, ref) => {
    const { currentValue, handleChange } = useBottomNav(valueProp, defaultValue, onChange, disabled);
    const ctxValue = useBottomNavContext(currentValue, handleChange, showLabels, color);

    const cls = useMemo(
        () => buildBottomNavClasses(variant, color, fixed, disabled, className, unstyled),
        [variant, color, fixed, disabled, className, unstyled],
    );

    return (
        <BottomNavContext.Provider value={ctxValue}>
            <nav ref={ref} className={cls} role="tablist" {...props}>
                {children}
            </nav>
        </BottomNavContext.Provider>
    );
});

BottomNavigation.displayName = 'BottomNavigation';

export { BottomNavigation, BottomNavigationAction };
export default BottomNavigation;
