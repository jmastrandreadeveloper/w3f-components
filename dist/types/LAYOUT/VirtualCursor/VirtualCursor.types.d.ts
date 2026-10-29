/** Una acción del cursor virtual (la arma Python: manualwin.Recorder). `k` dice cuál; el resto son sus datos. */
export interface CursorAction {
    k: string;
    [key: string]: unknown;
}
/** Un paso de la lección: el rótulo que se muestra junto al cursor y las acciones, en orden. Controlado: un `seq`
 *  nuevo lo ejecuta; `seq` 0 (o sin comando) = nada que hacer, el cursor se esconde. */
export interface CursorCommand {
    seq: number;
    label?: string;
    actions: CursorAction[];
    /** "highlight" (0022 B43, ventana Tutora): no hace nada, solo marca el control de la primera acción (o lo que hay
     *  que abrir antes) hasta que el usuario lo usa o llega otro comando. */
    mode?: 'run' | 'highlight';
    /** Multiplicador de los tiempos (1 = normal; 0 = sin pausas, para las pruebas). */
    speed?: number;
}
export interface VirtualCursorProps {
    command?: CursorCommand | null;
    /** Terminó el paso `seq`: ok, o el motivo por el que no se pudo (qué no estaba en pantalla). */
    onDone?: (seq: number, ok: boolean, detail: string) => void;
}
//# sourceMappingURL=VirtualCursor.types.d.ts.map