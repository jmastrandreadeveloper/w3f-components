import React from 'react';
/**
 * ScreenRecorder — graba la pestaña de la app (w3f-data-analysis GV: videos propios de las lecciones).
 *
 * Una barrita flotante: ● Grabar (o Ctrl + Shift + R) → el navegador pide permiso → 3-2-1 → graba. Mientras graba:
 * ⏸ / ▶, ■ Detener (o Ctrl + Shift + R otra vez), el tiempo, y se anotan los eventos para armar la cámara después:
 *   - el recorrido del cursor (unas 12 veces por segundo) y cada clic (con el rectángulo de su ventana),
 *   - Ctrl + Shift + F = foco: la ventana que está debajo del cursor (otra vez: vista general); Alt + arrastrar =
 *     un rectángulo de foco exacto,
 *   - Ctrl + Shift + C = la cámara sigue al cursor (sí / no),
 *   - Ctrl + Shift + M = un capítulo.
 * El cursor lleva un halo y cada clic una onda (salen en el video). Al detener, sube el video (webm) y los eventos
 * (json) por HTTP a `uploadUrl` y avisa con `onSaved(id)`. Sin audio: el audio lo agrega quien graba, después.
 *
 * `fake`: en las pruebas automáticas (sin permiso de grabar) graba un lienzo en vez de la pestaña.
 */
export interface ScreenRecorderProps {
    /** Se ve la barrita */
    open?: boolean;
    /** POST: ?id=…&kind=video|events (en desarrollo, al puerto del puente: localhost:8001) */
    uploadUrl?: string;
    /** Avisa que la grabación `id` quedó guardada */
    onSaved?: (id: string) => void;
    /** Cerrar la barrita (✕) */
    onClose?: () => void;
    fake?: boolean;
}
/** La dirección de subida: en desarrollo (Vite aparte) el puente está en localhost:8001, como en el bridge. */
export declare function resolveUpload(url: string): string;
export declare const ScreenRecorder: React.FC<ScreenRecorderProps>;
export default ScreenRecorder;
//# sourceMappingURL=ScreenRecorder.d.ts.map