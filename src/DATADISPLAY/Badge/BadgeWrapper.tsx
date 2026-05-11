import React from 'react';
import type { BadgeProps, BadgeWrapperProps } from './Badge.types';
import Badge from './Badge';

export type { BadgeWrapperProps } from './Badge.types';

const BadgeWrapper = React.forwardRef<HTMLDivElement, BadgeWrapperProps>(({
    children,
    badgeContent,
    badgeProps = {},
    className = '',
    style = {},
    overlap = true,
    offset,
    ...rest
}, ref) => {

    const shouldShowBadge = React.useMemo(() => {
        if (badgeProps.invisible) return false;
        if (badgeContent === null || badgeContent === undefined) {
            return badgeProps.variant === 'dot';
        }
        if (badgeContent === 0) {
            return badgeProps.showZero === true;
        }
        return true;
    }, [badgeContent, badgeProps]);

    const wrapperStyle = React.useMemo<React.CSSProperties>(() => ({
        position: 'relative',
        display: 'inline-block',
        verticalAlign: 'middle',
        ...(offset !== undefined ? { '--w3f-badge-offset': offset } as React.CSSProperties : {}),
        ...style,
    }), [style, offset]);

    const wrapperClasses = React.useMemo(() => {
        const classes = ['w3f-badge-wrapper'];
        if (className) classes.push(className);
        return classes.join(' ');
    }, [className]);

    const enhancedBadgeProps = React.useMemo<BadgeProps>(() => {
        const defaultPosition = overlap ? 'top-right' : null;
        return {
            position: defaultPosition,
            ...badgeProps,
        } as BadgeProps;
    }, [badgeProps, overlap]);

    return (
        <div
            ref={ref}
            className={wrapperClasses}
            style={wrapperStyle}
            {...rest}
        >
            {children}
            {shouldShowBadge && (
                <Badge {...enhancedBadgeProps}>
                    {badgeContent}
                </Badge>
            )}
        </div>
    );
});

BadgeWrapper.displayName = 'BadgeWrapper';

export { BadgeWrapper };
export default BadgeWrapper;
