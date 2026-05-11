import React, { forwardRef, useRef, useCallback } from 'react';
import { Plus } from 'lucide-react';
import type { SpeedDialProps, SpeedDialActionProps } from './SpeedDial.types';
import {
    SPEED_DIAL_DEFAULTS,
    SPEED_DIAL_ACTION_DEFAULTS,
    SPEED_DIAL_CLASSES,
} from './SpeedDial.constants';
import {
    buildSpeedDialClasses,
    buildFabClasses,
    buildActionsClasses,
    buildActionFabClasses,
    buildActionTooltipClasses,
    buildOffsetStyle,
    defaultTooltipPlacement,
} from './SpeedDial.utils';
import {
    useSpeedDialOpen,
    useSpeedDialHover,
    useSpeedDialEscKey,
} from './SpeedDial.hooks';

// ─────────────────────────────────────────────────────────────────────────────
// SpeedDialAction
// ─────────────────────────────────────────────────────────────────────────────

const SpeedDialAction: React.FC<SpeedDialActionProps> = ({
    icon,
    tooltipTitle,
    tooltipOpen = SPEED_DIAL_ACTION_DEFAULTS.tooltipOpen,
    tooltipPlacement,
    onClick,
    color,
    disabled = SPEED_DIAL_ACTION_DEFAULTS.disabled,
    className = SPEED_DIAL_ACTION_DEFAULTS.className,
    _direction = SPEED_DIAL_ACTION_DEFAULTS._direction,
    _onActionClick,
    ...rest
}) => {
    const placement = tooltipPlacement || defaultTooltipPlacement(_direction);
    const fabClasses = buildActionFabClasses(color, className);
    const tooltipClasses = buildActionTooltipClasses(placement, tooltipOpen);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) onClick(e);
        if (_onActionClick) _onActionClick(e);
    };

    return (
        <div className={SPEED_DIAL_CLASSES.action}>
            <button
                className={fabClasses}
                onClick={handleClick}
                disabled={disabled}
                aria-label={tooltipTitle}
                {...rest}
            >
                {icon}
            </button>
            {tooltipTitle && <span className={tooltipClasses}>{tooltipTitle}</span>}
        </div>
    );
};

SpeedDialAction.displayName = 'SpeedDialAction';

// ─────────────────────────────────────────────────────────────────────────────
// SpeedDial
// ─────────────────────────────────────────────────────────────────────────────

const SpeedDial = forwardRef<HTMLDivElement, SpeedDialProps>(
    (
        {
            ariaLabel,
            children,
            icon,
            openIcon,
            direction = SPEED_DIAL_DEFAULTS.direction,
            open: openProp,
            defaultOpen = SPEED_DIAL_DEFAULTS.defaultOpen,
            onOpen,
            onClose,
            hidden = SPEED_DIAL_DEFAULTS.hidden,
            color = SPEED_DIAL_DEFAULTS.color,
            size = SPEED_DIAL_DEFAULTS.size,
            position = SPEED_DIAL_DEFAULTS.position,
            offset,
            openOnHover = SPEED_DIAL_DEFAULTS.openOnHover,
            backdrop = SPEED_DIAL_DEFAULTS.backdrop,
            unstyled = SPEED_DIAL_DEFAULTS.unstyled,
            className = SPEED_DIAL_DEFAULTS.className,
            ...rest
        },
        ref,
    ) => {
        const containerRef = useRef<HTMLDivElement>(null);

        const mergedRef = useCallback(
            (node: HTMLDivElement | null) => {
                (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
                if (typeof ref === 'function') ref(node);
                else if (ref)
                    (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
            },
            [ref],
        );

        const { isOpen, handleOpen, handleClose, handleToggle, handleActionClick } =
            useSpeedDialOpen(openProp, defaultOpen, onOpen, onClose);

        const { handleMouseEnter, handleMouseLeave, handleFocus, handleBlur } =
            useSpeedDialHover(
                openOnHover,
                handleOpen,
                handleClose as Parameters<typeof useSpeedDialHover>[2],
                containerRef,
            );

        useSpeedDialEscKey(
            isOpen,
            handleClose as Parameters<typeof useSpeedDialEscKey>[1],
        );

        const handleBackdropClick = useCallback(
            (event: React.MouseEvent) => {
                (handleClose as (e: React.MouseEvent, r: 'backdropClick') => void)(
                    event,
                    'backdropClick',
                );
            },
            [handleClose],
        );

        const containerClasses = buildSpeedDialClasses(position, isOpen, hidden, className, unstyled);
        const fabClasses = buildFabClasses(color, size);
        const actionsClasses = buildActionsClasses(direction);
        const offsetStyle = buildOffsetStyle(position, offset);
        const hasOpenIcon = !!openIcon;
        const defaultIcon = icon || <Plus size={24} />;

        const actions = React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) return child;
            return React.cloneElement(
                child as React.ReactElement<SpeedDialActionProps>,
                {
                    _direction: direction,
                    _onActionClick: handleActionClick,
                },
            );
        });

        return (
            <>
                {backdrop && isOpen && (
                    <div
                        className={SPEED_DIAL_CLASSES.backdrop}
                        onClick={handleBackdropClick}
                    />
                )}
                <div
                    ref={mergedRef}
                    className={containerClasses}
                    style={offsetStyle}
                    role="presentation"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    {...rest}
                >
                    <div className={actionsClasses} role="menu">
                        {actions}
                    </div>

                    <button
                        className={fabClasses}
                        onClick={handleToggle}
                        aria-label={ariaLabel}
                        aria-expanded={isOpen}
                        aria-haspopup="menu"
                    >
                        <span
                            className={[
                                SPEED_DIAL_CLASSES.icon,
                                !hasOpenIcon && SPEED_DIAL_CLASSES.iconRotate,
                            ]
                                .filter(Boolean)
                                .join(' ')}
                        >
                            {hasOpenIcon ? (
                                <>
                                    <span className={SPEED_DIAL_CLASSES.iconDefault}>
                                        {defaultIcon}
                                    </span>
                                    <span className={SPEED_DIAL_CLASSES.iconOpen}>
                                        {openIcon}
                                    </span>
                                </>
                            ) : (
                                <span className={SPEED_DIAL_CLASSES.iconDefault}>
                                    {defaultIcon}
                                </span>
                            )}
                        </span>
                    </button>
                </div>
            </>
        );
    },
);

SpeedDial.displayName = 'SpeedDial';

export { SpeedDial, SpeedDialAction };
export default SpeedDial;
