import { useState, useEffect } from 'react';

/**
 * Hook para manejar el reloj en tiempo real.
 * Actualiza la fecha cada segundo.
 */
export const useClock = () => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timerID = setInterval(() => setDate(new Date()), 1000);
        return () => clearInterval(timerID);
    }, []);

    return {
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
    };
};
