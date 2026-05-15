import React from 'react';
import type { HandAngles } from './RelojAnalogico.types';
/**
 * Build CSS classes for the RelojAnalogico component.
 */
export declare const buildRelojClasses: (unstyled?: boolean, className?: string) => string;
/** Estilo base para las manecillas */
export declare const HAND_BASE_STYLE: React.CSSProperties;
/**
 * Calcula los ángulos de las manecillas basándose en la hora actual.
 */
export declare const calculateAngles: (hours: number, minutes: number, seconds: number) => HandAngles;
/**
 * Determina qué números mostrar en el reloj.
 */
export declare const getVisibleNumbers: (showAllNumbers: boolean, numbersToShow?: number[]) => number[];
/**
 * Calcula el estilo de posición para un número de hora.
 */
export declare const buildHourNumberStyle: (hourIndex: number, clockRadius: number) => React.CSSProperties;
/**
 * Genera las marcas (tics) de minutos u horas del reloj.
 */
export declare const generateTics: (isHourTic: boolean, clockRadius: number) => React.CSSProperties[];
//# sourceMappingURL=RelojAnalogico.utils.d.ts.map