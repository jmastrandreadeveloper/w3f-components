import React, { forwardRef, useState, useRef, useEffect } from 'react';
import type { SlideToggleProps } from './SlideToggle.types';
import { SLIDE_TOGGLE_CLASSES, SLIDE_TOGGLE_DEFAULTS } from './SlideToggle.constants';
import { getSizeConfig, buildToggleClasses, buildTrackClasses, buildHandleClasses } from './SlideToggle.utils';
import { useSlideToggleFormContext } from './SlideToggle.hooks';
import { useBridgeBind } from '@w3f/bridge';

const SlideToggle = forwardRef<HTMLDivElement, SlideToggleProps>(({
    name,
    checked = SLIDE_TOGGLE_DEFAULTS.checked,
    onChange,
    disabled = SLIDE_TOGGLE_DEFAULTS.disabled,
    size = SLIDE_TOGGLE_DEFAULTS.size,
    variant = SLIDE_TOGGLE_DEFAULTS.variant,
    loading = SLIDE_TOGGLE_DEFAULTS.loading,
    label,
    labelPosition = SLIDE_TOGGLE_DEFAULTS.labelPosition,
    showIcon = SLIDE_TOGGLE_DEFAULTS.showIcon,
    error,
    helperText,
    className = SLIDE_TOGGLE_DEFAULTS.className,
    unstyled = SLIDE_TOGGLE_DEFAULTS.unstyled,
    bindId,
}, ref) => {
    const formContext = useSlideToggleFormContext();
    const isFormControlled = !!(formContext && name);
    const { dispatch } = useBridgeBind({ bindId });

    const toggleValue = isFormControlled
        ? Boolean(formContext.values[name!])
        : checked;
    const toggleError = isFormControlled ? formContext.errors[name!] : error;

    const { maxPosition } = getSizeConfig(size);

    const [isChecked, setIsChecked] = useState(toggleValue);
    const [isDragging, setIsDragging] = useState(false);
    const [handlePosition, setHandlePosition] = useState(toggleValue ? maxPosition : 0);

    const startX = useRef(0);
    const handleRef = useRef<HTMLSpanElement>(null);

    const handleToggleChange = (newState: boolean) => {
        setIsChecked(newState);
        setHandlePosition(newState ? maxPosition : 0);
        if (isFormControlled && formContext && name) {
            formContext.setFieldValue(name, newState);
        }
        dispatch('change', { value: newState });
        if (onChange) onChange(newState);
    };

    // Mouse drag
    const handleMouseDown = (e: React.MouseEvent<HTMLSpanElement>) => {
        if (disabled || loading) return;
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
        startX.current = e.clientX - handlePosition;
    };

    const handleMouseUp = () => {
        if (!isDragging) return;
        setIsDragging(false);
        const shouldBeChecked = handlePosition > maxPosition / 2;
        if (shouldBeChecked !== isChecked) {
            handleToggleChange(shouldBeChecked);
        } else {
            setHandlePosition(shouldBeChecked ? maxPosition : 0);
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        const newPos = e.clientX - startX.current;
        setHandlePosition(Math.max(0, Math.min(newPos, maxPosition)));
    };

    // Touch drag
    const handleTouchStart = (e: React.TouchEvent<HTMLSpanElement>) => {
        if (disabled || loading) return;
        e.stopPropagation();
        setIsDragging(true);
        startX.current = e.touches[0].clientX - handlePosition;
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (!isDragging) return;
        const newPos = e.touches[0].clientX - startX.current;
        setHandlePosition(Math.max(0, Math.min(newPos, maxPosition)));
    };

    const handleTouchEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);
        const shouldBeChecked = handlePosition > maxPosition / 2;
        if (shouldBeChecked !== isChecked) {
            handleToggleChange(shouldBeChecked);
        } else {
            setHandlePosition(shouldBeChecked ? maxPosition : 0);
        }
    };

    // Click & keyboard
    const handleClick = () => {
        if (disabled || loading || isDragging) return;
        handleToggleChange(!isChecked);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (disabled || loading) return;
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
        }
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('touchmove', handleTouchMove);
            document.addEventListener('touchend', handleTouchEnd);
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isDragging, handlePosition, isChecked]);

    // Sync with external value
    useEffect(() => {
        if (!isDragging && toggleValue !== isChecked) {
            setIsChecked(toggleValue);
            setHandlePosition(toggleValue ? maxPosition : 0);
        }
    }, [toggleValue, isDragging, maxPosition]);

    const hasError = Boolean(toggleError);

    const renderToggle = () => (
        <div
            className={buildToggleClasses(size, variant, disabled, loading, hasError, unstyled)}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            tabIndex={disabled || loading ? -1 : 0}
            role="switch"
            aria-checked={isChecked}
            aria-disabled={disabled}
            aria-label={label || 'Toggle switch'}
            aria-invalid={hasError}
        >
            <div className={buildTrackClasses(isChecked)}>
                <span
                    ref={handleRef}
                    className={buildHandleClasses(isDragging)}
                    style={{ transform: `translateX(${handlePosition}px)` }}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                />
            </div>
        </div>
    );

    const renderLabel = () => {
        if (!label) return null;
        const labelClasses = [
            SLIDE_TOGGLE_CLASSES.label,
            labelPosition === 'right' ? SLIDE_TOGGLE_CLASSES.labelRight : SLIDE_TOGGLE_CLASSES.labelLeft,
            (disabled || loading) ? SLIDE_TOGGLE_CLASSES.labelDisabled : '',
        ].filter(Boolean).join(' ');
        return (
            <span
                onClick={handleClick}
                className={labelClasses}
            >
                {label}
                {showIcon && (
                    <span
                        className={SLIDE_TOGGLE_CLASSES.checkIcon}
                        style={{ visibility: isChecked && !disabled && !loading ? 'visible' : 'hidden' }}
                    >
                        ✓
                    </span>
                )}
            </span>
        );
    };

    const renderMessages = () => {
        if (!toggleError && !helperText) return null;
        return (
            <div className={SLIDE_TOGGLE_CLASSES.messages}>
                {toggleError ? (
                    <p
                        className={`${SLIDE_TOGGLE_CLASSES.message} ${SLIDE_TOGGLE_CLASSES.messageError}`}
                        role="alert"
                    >
                        {toggleError}
                    </p>
                ) : helperText ? (
                    <p
                        className={`${SLIDE_TOGGLE_CLASSES.message} ${SLIDE_TOGGLE_CLASSES.messageHelper}`}
                    >
                        {helperText}
                    </p>
                ) : null}
            </div>
        );
    };

    if (!label) {
        return (
            <div ref={ref} className={className}>
                {renderToggle()}
                {renderMessages()}
            </div>
        );
    }

    return (
        <div ref={ref} className={className}>
            <div
                className={`${SLIDE_TOGGLE_CLASSES.container}${labelPosition === 'left' ? ` ${SLIDE_TOGGLE_CLASSES.containerLabelLeft}` : ''}`}
            >
                {renderToggle()}
                {renderLabel()}
            </div>
            {renderMessages()}
        </div>
    );
});

SlideToggle.displayName = 'SlideToggle';
export { SlideToggle };
export default SlideToggle;
