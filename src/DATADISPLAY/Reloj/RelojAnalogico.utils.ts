import React from 'react';
import type { HandAngles } from './RelojAnalogico.types';

/**
 * Build CSS classes for the RelojAnalogico component.
 */
export const buildRelojClasses = (
    unstyled?: boolean,
    className?: string,
): string => {
    const base = 'w3f-clock-analog';
    if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(' ');
    return [base, 'w3f-position-container', className].filter(Boolean).join(' ');
};

/** Estilo base para las manecillas */
export const HAND_BASE_STYLE: React.CSSProperties = {
    transformOrigin: '50% 100%',
};

/**
 * Calcula los ángulos de las manecillas basándose en la hora actual.
 */
export const calculateAngles = (hours: number, minutes: number, seconds: number): HandAngles => ({
    second: (seconds / 60) * 360,
    minute: ((minutes + seconds / 60) / 60) * 360,
    hour: ((hours % 12) / 12) * 360 + (minutes / 60) * 30,
});

/**
 * Determina qué números mostrar en el reloj.
 */
export const getVisibleNumbers = (
    showAllNumbers: boolean,
    numbersToShow?: number[]
): number[] => {
    if (numbersToShow) return numbersToShow;
    if (showAllNumbers) return [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    return [12, 3, 6, 9];
};

/**
 * Calcula el estilo de posición para un número de hora.
 */
export const buildHourNumberStyle = (
    hourIndex: number,
    clockRadius: number
): React.CSSProperties => {
    const angle = hourIndex * 30; // 360 / 12 = 30
    const radians = (angle - 90) * (Math.PI / 180);
    const distance = clockRadius * 0.8;
    const x = Math.cos(radians) * distance;
    const y = Math.sin(radians) * distance;

    return {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
        color: 'var(--w3f-on-surface)',
        userSelect: 'none',
    };
};

/**
 * Genera las marcas (tics) de minutos u horas del reloj.
 */
export const generateTics = (isHourTic: boolean, clockRadius: number): React.CSSProperties[] => {
    const totalTics = isHourTic ? 12 : 60;
    const ticColor = isHourTic
        ? 'var(--w3f-clock-tic-hour-color)'
        : 'var(--w3f-clock-tic-minute-color)';

    const ticLength = isHourTic ? clockRadius * 0.05 : clockRadius * 0.025;
    const ticWidth = isHourTic ? clockRadius * 0.015 : clockRadius * 0.005;
    const marginFromEdge = clockRadius * 0.15;
    const ticDistanceFromCenter = clockRadius - marginFromEdge;

    const styles: React.CSSProperties[] = [];

    for (let i = 0; i < totalTics; i++) {
        if (!isHourTic && i % 5 === 0) continue;

        const angle = i * (360 / totalTics);
        styles.push({
            position: 'absolute',
            width: `${ticWidth}px`,
            height: `${ticLength}px`,
            backgroundColor: ticColor,
            left: '50%',
            top: '50%',
            transformOrigin: `50% ${-ticDistanceFromCenter + (ticLength / 2)}px`,
            transform: `translate(-50%, -50%) rotate(${angle}deg) translate(0, ${-ticDistanceFromCenter + (ticLength / 2)}px)`,
        });
    }

    return styles;
};
