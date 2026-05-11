import React, { forwardRef, useMemo } from 'react';
import type { ProgressSpinnerProps } from './ProgressSpinner.types';
import { PROGRESS_SPINNER_DEFAULTS } from './ProgressSpinner.constants';
import {
    resolveSpinnerDiameter,
    resolveSpinnerColor,
    calcDashOffset,
    buildProgressSpinnerClasses,
} from './ProgressSpinner.utils';

const ProgressSpinner = forwardRef<HTMLDivElement, ProgressSpinnerProps>(({
    mode = PROGRESS_SPINNER_DEFAULTS.mode,
    value = PROGRESS_SPINNER_DEFAULTS.value,
    strokeWidth = PROGRESS_SPINNER_DEFAULTS.strokeWidth,
    size = PROGRESS_SPINNER_DEFAULTS.size,
    diameter,
    color = PROGRESS_SPINNER_DEFAULTS.color,
    ariaLabel,
    className = PROGRESS_SPINNER_DEFAULTS.className,
    unstyled = PROGRESS_SPINNER_DEFAULTS.unstyled,
}, ref) => {
    // Diámetro final (soporta size string, size number, o diameter deprecated)
    const finalDiameter = useMemo(
        () => resolveSpinnerDiameter(size, diameter),
        [size, diameter]
    );

    // Propiedades SVG
    const radius = (finalDiameter - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const center = finalDiameter / 2;

    // Color de trazo final
    const strokeColor = useMemo(() => resolveSpinnerColor(color), [color]);

    // Offset para el progreso (determinate)
    const strokeDashoffset = useMemo(
        () => calcDashOffset(mode, value, circumference),
        [mode, value, circumference]
    );

    // Clases del SVG
    const svgClass = mode === 'indeterminate' ? 'w3f-spinner-rotate' : '';

    // Color del círculo de fondo (solo modo determinate)
    const backgroundCircleColor = 'var(--w3f-outline-variant)';

    // Label de accesibilidad
    const accessibilityLabel =
        ariaLabel ||
        (mode === 'determinate'
            ? `Progreso: ${Math.round(value)}%`
            : 'Cargando');

    const wrapperClasses = buildProgressSpinnerClasses(unstyled, className);

    return (
        <div
            ref={ref}
            className={wrapperClasses}
            style={{ width: finalDiameter, height: finalDiameter }}
            role="status"
            aria-live="polite"
            aria-label={accessibilityLabel}
        >
            <svg
                width={finalDiameter}
                height={finalDiameter}
                viewBox={`0 0 ${finalDiameter} ${finalDiameter}`}
                className={svgClass}
                aria-hidden="true"
            >
                {/* Círculo de fondo para modo determinado */}
                {mode === 'determinate' && (
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        fill="none"
                        stroke={backgroundCircleColor}
                        strokeWidth={strokeWidth}
                    />
                )}

                {/* Círculo principal */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className={mode === 'indeterminate' ? 'w3f-spinner-path' : ''}
                    style={{
                        transformOrigin: 'center',
                        transition:
                            mode === 'determinate'
                                ? 'stroke-dashoffset var(--w3f-transition-normal) cubic-bezier(0.4, 0, 0.2, 1)'
                                : 'none',
                    }}
                />
            </svg>
        </div>
    );
});

ProgressSpinner.displayName = 'ProgressSpinner';

export { ProgressSpinner };
export default ProgressSpinner;
