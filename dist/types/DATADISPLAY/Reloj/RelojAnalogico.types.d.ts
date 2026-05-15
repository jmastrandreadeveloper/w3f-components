export interface HandAngles {
    second: number;
    minute: number;
    hour: number;
}
export interface RelojAnalogicoProps {
    /** Tamaño del reloj en píxeles (diámetro) */
    size?: number;
    /** Mostrar marcas de horas y minutos */
    showTics?: boolean;
    /** Mostrar todos los números (1-12) o solo 12,3,6,9 */
    showAllNumbers?: boolean;
    /** Array específico de números a mostrar */
    numbersToShow?: number[];
    /** Mostrar la manecilla de segundos */
    showSeconds?: boolean;
    /** Clases CSS adicionales */
    className?: string;
    /** If true, removes all visual/preset styles — only structural CSS remains. */
    unstyled?: boolean;
}
//# sourceMappingURL=RelojAnalogico.types.d.ts.map