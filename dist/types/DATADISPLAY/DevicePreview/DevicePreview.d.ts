import React from 'react';
/**
 * DevicePreview — muestra una página HTML como se vería en un navegador de escritorio, en un teléfono o en los dos,
 * lado a lado (w3f-data-analysis: vista previa del tablero Web). Adentro va un <iframe> con el ancho real de cada
 * dispositivo (1280 px / 390 px): las reglas @media / @container de la página se aplican de verdad. Cada marco se
 * achica para entrar en el espacio que tiene (sin barras de desplazamiento afuera; adentro, la página se desplaza).
 *
 * @example
 * <DevicePreview html={copiaDelTablero} device="both" title="Ventas 2026" />
 */
export type DevicePreviewDevice = 'web' | 'phone' | 'both';
export interface DevicePreviewProps {
    /** El documento HTML completo que se muestra (una copia autocontenida) */
    html?: string;
    /** O una dirección (si no hay `html`) */
    src?: string;
    /** web, teléfono o los dos */
    device?: DevicePreviewDevice;
    /** El texto de la barra de direcciones del navegador */
    title?: string;
    /** Ancho del navegador y del teléfono, en px de la página */
    webWidth?: number;
    phoneWidth?: number;
    phoneHeight?: number;
    className?: string;
    style?: React.CSSProperties;
}
export declare const DevicePreview: React.FC<DevicePreviewProps>;
export default DevicePreview;
//# sourceMappingURL=DevicePreview.d.ts.map