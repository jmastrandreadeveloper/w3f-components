import React, { useMemo } from 'react';
import Text from '../Text/Text';
import type { RelojAnalogicoProps } from './RelojAnalogico.types';
import {
    HAND_BASE_STYLE,
    calculateAngles,
    getVisibleNumbers,
    buildHourNumberStyle,
    generateTics,
    buildRelojClasses,
} from './RelojAnalogico.utils';
import { RELOJ_DEFAULTS } from './RelojAnalogico.constants';
import { useClock } from './RelojAnalogico.hooks';

/**
 * Componente RelojAnalogico
 * Muestra un reloj analógico funcional con manecillas de hora, minuto y segundo.
 */
const RelojAnalogico: React.FC<RelojAnalogicoProps> = ({
    size = RELOJ_DEFAULTS.size,
    showTics = RELOJ_DEFAULTS.showTics,
    showAllNumbers = RELOJ_DEFAULTS.showAllNumbers,
    numbersToShow,
    showSeconds = RELOJ_DEFAULTS.showSeconds,
    className = RELOJ_DEFAULTS.className,
    unstyled = RELOJ_DEFAULTS.unstyled,
}) => {
    const { hours, minutes, seconds } = useClock();

    const angles = useMemo(
        () => calculateAngles(hours, minutes, seconds),
        [hours, minutes, seconds]
    );

    const clockRadius = size / 2;

    const visibleNumbers = useMemo(
        () => getVisibleNumbers(showAllNumbers, numbersToShow),
        [showAllNumbers, numbersToShow]
    );

    const hourNumbers = useMemo(() => {
        return [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((hour, index) => {
            if (!visibleNumbers.includes(hour)) return null;

            const numberStyle = buildHourNumberStyle(index, clockRadius);

            return (
                <Text
                    key={`hour-${hour}`}
                    style={numberStyle}
                    customClasses={`w3f-text-${showAllNumbers ? 'xl' : '2xl'} w3f-font-display`}
                    element="div"
                    content={hour}
                />
            );
        }).filter(Boolean);
    }, [clockRadius, visibleNumbers, showAllNumbers]);

    const ticElements = useMemo(() => {
        if (!showTics) return null;
        const minuteTics = generateTics(false, clockRadius);
        const hourTics = generateTics(true, clockRadius);

        return (
            <>
                {minuteTics.map((style, i) => (
                    <div key={`tic-m-${i}`} style={style} />
                ))}
                {hourTics.map((style, i) => (
                    <div key={`tic-h-${i}`} style={style} />
                ))}
            </>
        );
    }, [showTics, clockRadius]);

    return (
        <div
            className={buildRelojClasses(unstyled, className)}
            style={{ width: `${size}px`, height: `${size}px` }}
            role="img"
            aria-label={`Reloj analógico mostrando ${hours % 12 || 12}:${minutes.toString().padStart(2, '0')}`}
        >
            {hourNumbers}
            {ticElements}

            {/* Manecilla de la Hora */}
            <div
                className="w3f-clock-analog-hand w3f-clock-hour-hand"
                style={{
                    ...HAND_BASE_STYLE,
                    transform: `translate(-50%, -100%) rotate(${angles.hour}deg)`,
                    backgroundColor: 'var(--w3f-clock-hour-hand-color)',
                    height: `${size * 0.20}px`,
                    width: `${size * 0.02}px`,
                    zIndex: 10,
                }}
                aria-hidden="true"
            />

            {/* Manecilla del Minuto */}
            <div
                className="w3f-clock-analog-hand w3f-clock-minute-hand"
                style={{
                    ...HAND_BASE_STYLE,
                    transform: `translate(-50%, -100%) rotate(${angles.minute}deg)`,
                    backgroundColor: 'var(--w3f-clock-minute-hand-color)',
                    height: `${size * 0.35}px`,
                    width: `${size * 0.015}px`,
                    zIndex: 20,
                }}
                aria-hidden="true"
            />

            {/* Manecilla del Segundo */}
            {showSeconds && (
                <div
                    className="w3f-clock-analog-hand w3f-clock-second-hand"
                    style={{
                        ...HAND_BASE_STYLE,
                        transform: `translate(-50%, -100%) rotate(${angles.second}deg)`,
                        backgroundColor: 'var(--w3f-clock-second-hand-color)',
                        height: `${size * 0.45}px`,
                        width: `${size * 0.005}px`,
                        zIndex: 30,
                    }}
                    aria-hidden="true"
                />
            )}

            {/* Punto Central */}
            <div className="w3f-clock-center-dot" aria-hidden="true" />
        </div>
    );
};

RelojAnalogico.displayName = 'RelojAnalogico';

export { RelojAnalogico };
export default RelojAnalogico;
