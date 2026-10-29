/**
 * FileBridge — los archivos de una app que corre en un servidor (0022 W1 de w3f-data-analysis): cuando Python pide un
 * archivo (`pick`), muestra un cuadro para elegirlo o soltarlo y lo sube con una barra de avance; cuando Python
 * prepara uno (`download`), el navegador lo baja. Intenta abrir el selector de archivos solo (vale mientras dura el
 * permiso del clic que lo pidió); si el navegador no lo deja, queda el botón «Elegir archivo…».
 *
 * @example
 * <FileBridge pick={{ seq: 3, title: 'Abrir proyecto', accept: '.w3fda', url: '/_da/upload' }}
 *             onDone={(seq, ok, detail) => send(seq, ok, detail)} />
 */
import React from 'react';
import type { FileBridgeProps, FilePick } from './FileBridge.types';
/** ¿Este seq de descarga ya se bajó en esta pestaña? (al reconectar, el servidor vuelve a mandar el estado) */
export declare function seenDownload(seq: number, store?: Storage | null): boolean;
/** La URL de subida con el nombre y el seq. */
export declare function uploadUrl(pick: FilePick, name: string): string;
export declare function FileBridge({ pick, download, onDone }: FileBridgeProps): React.ReactElement | null;
export default FileBridge;
//# sourceMappingURL=FileBridge.d.ts.map