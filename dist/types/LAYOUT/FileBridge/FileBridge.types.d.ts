/** Pedido de un archivo (la app en la nube: no hay diálogo de Windows en el servidor). Controlado: un `seq` nuevo
 *  abre el cuadro; `seq` 0 o null = nada. */
export interface FilePick {
    seq: number;
    /** Qué se pide: «Seleccionar archivo CSV», «Abrir proyecto»… */
    title?: string;
    /** Extensiones aceptadas (atributo accept del input), p. ej. ".csv,.txt". */
    accept?: string;
    /** Adónde se sube (POST con el archivo en el cuerpo; `name` y `seq` van en la query). */
    url: string;
    /** Archivos que ya están en el servidor (se eligen sin subirlos): `onDone(seq, true, "nube:" + name)`. */
    files?: {
        name: string;
        label?: string;
    }[];
}
/** Bajar un archivo que preparó la app. Un `seq` nuevo lo baja una vez. */
export interface FileDownload {
    seq: number;
    url: string;
    name?: string;
}
export interface FileBridgeProps {
    pick?: FilePick | null;
    download?: FileDownload | null;
    /** Terminó el pedido `seq`: ok = el archivo se subió; si no, el motivo («cancelado», el error). */
    onDone?: (seq: number, ok: boolean, detail: string) => void;
}
//# sourceMappingURL=FileBridge.types.d.ts.map