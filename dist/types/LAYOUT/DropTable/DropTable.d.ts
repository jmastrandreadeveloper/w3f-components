/**
 * DropTable — soltar una columna sobre la tabla misma (0022 L5, w3f-data-analysis). Envuelve el resultado de la
 * Tabla Dinámica: mientras se arrastra una ficha de FieldZones (MIME application/x-w3f-field) por encima, muestra
 * tres bandas (arriba = Columnas, izquierda = Filas, el resto = Valores) y, al soltar, avisa por `onFieldDrop` la
 * columna, de dónde venía y la zona. No cambia nada solo: el servidor decide (como FieldZones).
 *
 * @example
 * <DropTable onFieldDrop={({ field, from, zone }) => …}><table … /></DropTable>
 */
import React from 'react';
export type DropZone = 'columns' | 'rows' | 'values';
export interface FieldDrop {
    field: string;
    from: string;
    zone: DropZone;
}
export interface DropTableProps {
    children?: React.ReactNode;
    /** Alto de la banda de arriba (Columnas) y ancho de la de la izquierda (Filas), en px del contenedor. */
    band?: number;
    onFieldDrop?: (drop: FieldDrop) => void;
    /** Igual que onFieldDrop (para usarlo desde React) */
    onDrop?: (drop: FieldDrop) => void;
    className?: string;
    style?: React.CSSProperties;
}
/** La zona según dónde está el puntero dentro del contenedor (coordenadas relativas, en px). Pura (vitest). */
export declare function zoneAt(x: number, y: number, width: number, height: number, band: number): DropZone;
export declare const DropTable: React.FC<DropTableProps>;
export default DropTable;
//# sourceMappingURL=DropTable.d.ts.map