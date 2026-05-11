import React, { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import type { RangeSliderProps } from './RangeSlider.types';
import { RANGE_SLIDER_CLASSES, RANGE_SLIDER_DEFAULTS } from './RangeSlider.constants';
import { snapToStep, getPercent, defaultFormatLabel } from './RangeSlider.utils';
import { useRangeSliderFormContext } from './RangeSlider.hooks';
import { useBridgeBind } from '@w3f/bridge';

const RangeSlider = forwardRef<HTMLDivElement, RangeSliderProps>(({
    name,
    min = RANGE_SLIDER_DEFAULTS.min,
    max = RANGE_SLIDER_DEFAULTS.max,
    step = RANGE_SLIDER_DEFAULTS.step,
    value: controlledValue,
    defaultMinValue,
    defaultMaxValue,
    onChange,
    formatLabel,
    disabled = RANGE_SLIDER_DEFAULTS.disabled,
    ariaLabel = RANGE_SLIDER_DEFAULTS.ariaLabel,
    error,
    className = RANGE_SLIDER_DEFAULTS.className,
    onBlur,
    unstyled = RANGE_SLIDER_DEFAULTS.unstyled,
    bindId,
    ...props
}, ref) => {
    const formContext = useRangeSliderFormContext();
    const isFormControlled = !!(formContext && name);
    const { dispatch } = useBridgeBind({ bindId });

    const [minVal, setMinVal] = useState(() => {
        const initial = defaultMinValue !== undefined ? defaultMinValue : min;
        return snapToStep(Math.max(min, Math.min(initial, max - step)), step);
    });

    const [maxVal, setMaxVal] = useState(() => {
        const initial = defaultMaxValue !== undefined ? defaultMaxValue : max;
        return snapToStep(Math.max(min + step, Math.min(initial, max)), step);
    });

    const [isDraggingMin, setIsDraggingMin] = useState(false);
    const [isDraggingMax, setIsDraggingMax] = useState(false);
    const [announcement, setAnnouncement] = useState('');

    const rangeRef = useRef<HTMLDivElement>(null);
    const minThumbRef = useRef<HTMLDivElement>(null);
    const maxThumbRef = useRef<HTMLDivElement>(null);

    const fieldValue = isFormControlled
        ? (formContext.values[name!] ?? { min: minVal, max: maxVal })
        : (controlledValue ?? { min: minVal, max: maxVal });

    const fieldError = isFormControlled ? formContext.errors[name!] : error;

    useEffect(() => {
        if (isFormControlled || controlledValue) {
            if (fieldValue.min !== undefined) setMinVal(fieldValue.min);
            if (fieldValue.max !== undefined) setMaxVal(fieldValue.max);
        }
    }, [fieldValue, isFormControlled, controlledValue]);

    const formatValue = useCallback(
        (value: number) => (formatLabel ? formatLabel(value) : defaultFormatLabel(value)),
        [formatLabel],
    );

    const notifyChange = useCallback(
        (newMin: number, newMax: number) => {
            const newValue = { min: newMin, max: newMax };
            if (isFormControlled && formContext && name) {
                const syntheticEvent = { target: { name, value: newValue, type: 'range' } };
                formContext.handleChange(syntheticEvent as any);
            }
            dispatch('change', { value: newValue as unknown as Record<string, unknown> });
            if (onChange && !disabled) onChange(newValue);
        },
        [isFormControlled, formContext, name, onChange, disabled, dispatch],
    );

    // Update progress bar
    useEffect(() => {
        const minPercent = getPercent(minVal, min, max);
        const maxPercent = getPercent(maxVal, min, max);
        if (rangeRef.current) {
            rangeRef.current.style.left = `${minPercent}%`;
            rangeRef.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, maxVal, min, max]);

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        const value = snapToStep(Math.min(+e.target.value, maxVal - step), step);
        setMinVal(value);
        setAnnouncement(`Valor mínimo: ${formatValue(value)}`);
        notifyChange(value, maxVal);
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        const value = snapToStep(Math.max(+e.target.value, minVal + step), step);
        setMaxVal(value);
        setAnnouncement(`Valor máximo: ${formatValue(value)}`);
        notifyChange(minVal, value);
    };

    const handleBlur = () => {
        if (isFormControlled && formContext && name) {
            const syntheticEvent = { target: { name } };
            formContext.handleBlur(syntheticEvent as any);
        }
        if (onBlur) onBlur();
    };

    const handleDrag = (isMinThumb: boolean) => (e: React.MouseEvent<HTMLDivElement>) => {
        if (disabled) return;
        e.preventDefault();

        const startX = e.clientX;
        const startVal = isMinThumb ? minVal : maxVal;
        const container = e.currentTarget.parentElement;
        if (!container) return;
        const containerWidth = container.getBoundingClientRect().width;

        isMinThumb ? setIsDraggingMin(true) : setIsDraggingMax(true);

        const handleMove = (moveEvent: MouseEvent) => {
            const deltaX = moveEvent.clientX - startX;
            const deltaPercent = (deltaX / containerWidth) * 100;
            const deltaValue = (deltaPercent / 100) * (max - min);
            const newValue = snapToStep(startVal + deltaValue, step);

            if (isMinThumb) {
                const clamped = Math.max(min, Math.min(newValue, maxVal - step));
                setMinVal(clamped);
                notifyChange(clamped, maxVal);
            } else {
                const clamped = Math.max(minVal + step, Math.min(newValue, max));
                setMaxVal(clamped);
                notifyChange(minVal, clamped);
            }
        };

        const handleEnd = () => {
            isMinThumb ? setIsDraggingMin(false) : setIsDraggingMax(false);
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', handleEnd);
            handleBlur();
        };

        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleEnd);
    };

    const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (disabled || isDraggingMin || isDraggingMax) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percent = (clickX / rect.width) * 100;
        const clickValue = min + (percent / 100) * (max - min);
        const distToMin = Math.abs(clickValue - minVal);
        const distToMax = Math.abs(clickValue - maxVal);
        e.preventDefault();

        if (distToMin <= distToMax) {
            const clamped = Math.max(min, snapToStep(Math.min(clickValue, maxVal - step), step));
            setMinVal(clamped);
            notifyChange(clamped, maxVal);
        } else {
            const clamped = Math.min(max, snapToStep(Math.max(clickValue, minVal + step), step));
            setMaxVal(clamped);
            notifyChange(minVal, clamped);
        }
    };

    const minPercent = getPercent(minVal, min, max);
    const maxPercent = getPercent(maxVal, min, max);
    const thumbsAreClose = Math.abs(maxPercent - minPercent) < 3;
    const hasError = Boolean(fieldError);

    return (
        <div ref={ref} style={{ padding: '2rem 0' }} className={className}>
            <div
                className={[
                    RANGE_SLIDER_CLASSES.wrapper,
                    unstyled && 'w3f-range-slider--unstyled',
                    !unstyled && disabled && RANGE_SLIDER_CLASSES.isDisabled,
                    !unstyled && hasError && RANGE_SLIDER_CLASSES.hasError,
                ]
                    .filter(Boolean)
                    .join(' ')}
                role="group"
                aria-label={ariaLabel}
            >
                {/* Screen reader announcements */}
                <div
                    className={RANGE_SLIDER_CLASSES.srOnly}
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {announcement}
                </div>

                {/* Min label */}
                <div
                    className={[
                        RANGE_SLIDER_CLASSES.labelMin,
                        (isDraggingMin || thumbsAreClose) && RANGE_SLIDER_CLASSES.labelVisible,
                        thumbsAreClose && RANGE_SLIDER_CLASSES.labelClose,
                    ]
                        .filter(Boolean)
                        .join(' ')}
                    style={{ left: `${minPercent}%` }}
                    aria-hidden="true"
                >
                    Min: {formatValue(minVal)}
                    <div className={RANGE_SLIDER_CLASSES.labelArrow} />
                </div>

                {/* Max label */}
                <div
                    className={[
                        RANGE_SLIDER_CLASSES.labelMax,
                        (isDraggingMax || thumbsAreClose) && RANGE_SLIDER_CLASSES.labelVisible,
                        thumbsAreClose && RANGE_SLIDER_CLASSES.labelClose,
                    ]
                        .filter(Boolean)
                        .join(' ')}
                    style={{ left: `${maxPercent}%` }}
                    aria-hidden="true"
                >
                    Max: {formatValue(maxVal)}
                    <div className={RANGE_SLIDER_CLASSES.labelArrow} />
                </div>

                {/* Track */}
                <div className={RANGE_SLIDER_CLASSES.track}>
                    <div ref={rangeRef} className={RANGE_SLIDER_CLASSES.active} />
                </div>

                {/* Custom thumbs */}
                <div
                    ref={minThumbRef}
                    className={[
                        RANGE_SLIDER_CLASSES.thumb,
                        isDraggingMin && RANGE_SLIDER_CLASSES.thumbDragging,
                        thumbsAreClose && RANGE_SLIDER_CLASSES.thumbCloseMin,
                    ]
                        .filter(Boolean)
                        .join(' ')}
                    style={{ left: `${minPercent}%` }}
                    onMouseDown={handleDrag(true)}
                    aria-hidden="true"
                />

                <div
                    ref={maxThumbRef}
                    className={[
                        RANGE_SLIDER_CLASSES.thumb,
                        isDraggingMax && RANGE_SLIDER_CLASSES.thumbDragging,
                        thumbsAreClose && RANGE_SLIDER_CLASSES.thumbCloseMax,
                    ]
                        .filter(Boolean)
                        .join(' ')}
                    style={{ left: `${maxPercent}%` }}
                    onMouseDown={handleDrag(false)}
                    aria-hidden="true"
                />

                {/* Clickable track overlay */}
                <div
                    className={RANGE_SLIDER_CLASSES.clickable}
                    onMouseDown={handleTrackClick}
                    aria-hidden="true"
                />

                {/* Accessible hidden range inputs */}
                <input
                    type="range"
                    name={name ? `${name}_min` : undefined}
                    min={min}
                    max={max}
                    step={step}
                    value={minVal}
                    onChange={handleMinChange}
                    onFocus={() => !disabled && setIsDraggingMin(true)}
                    onBlur={() => {
                        setIsDraggingMin(false);
                        handleBlur();
                    }}
                    disabled={disabled}
                    aria-label="Valor mínimo del rango"
                    aria-valuemin={min}
                    aria-valuemax={max}
                    aria-valuenow={minVal}
                    aria-valuetext={`Valor mínimo: ${formatValue(minVal)}`}
                    aria-invalid={hasError}
                    className={`${RANGE_SLIDER_CLASSES.inputA11y} ${RANGE_SLIDER_CLASSES.inputMin}`}
                />

                <input
                    type="range"
                    name={name ? `${name}_max` : undefined}
                    min={min}
                    max={max}
                    step={step}
                    value={maxVal}
                    onChange={handleMaxChange}
                    onFocus={() => !disabled && setIsDraggingMax(true)}
                    onBlur={() => {
                        setIsDraggingMax(false);
                        handleBlur();
                    }}
                    disabled={disabled}
                    aria-label="Valor máximo del rango"
                    aria-valuemin={min}
                    aria-valuemax={max}
                    aria-valuenow={maxVal}
                    aria-valuetext={`Valor máximo: ${formatValue(maxVal)}`}
                    aria-invalid={hasError}
                    className={`${RANGE_SLIDER_CLASSES.inputA11y} ${RANGE_SLIDER_CLASSES.inputMax}`}
                />

                {/* Value labels */}
                <div className={RANGE_SLIDER_CLASSES.valueLabelWrapper}>
                    <div className={RANGE_SLIDER_CLASSES.valueLabelGroup}>
                        <span className={RANGE_SLIDER_CLASSES.valueLabelText}>Valor mínimo</span>
                        <div className={RANGE_SLIDER_CLASSES.valueLabelValue}>
                            {formatValue(minVal)}
                        </div>
                    </div>
                    <div className={RANGE_SLIDER_CLASSES.valueLabelGroup}>
                        <span className={RANGE_SLIDER_CLASSES.valueLabelText}>Valor máximo</span>
                        <div className={RANGE_SLIDER_CLASSES.valueLabelValue}>
                            {formatValue(maxVal)}
                        </div>
                    </div>
                </div>
            </div>

            {fieldError && (
                <div className={RANGE_SLIDER_CLASSES.error} role="alert">
                    {fieldError}
                </div>
            )}
        </div>
    );
});

RangeSlider.displayName = 'RangeSlider';
export { RangeSlider };
export default RangeSlider;
