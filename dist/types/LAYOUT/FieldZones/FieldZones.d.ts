/**
 * FieldZones — la «lista de campos» de Excel / Power BI (0022 L3, w3f-data-analysis): las columnas a un lado y cuatro
 * zonas (Filtros, Columnas, Filas, Valores). Se arrastra una columna a una zona; dentro de una zona se reordena
 * arrastrando (soltando sobre otra ficha queda antes de ella); se quita con × o arrastrándola de vuelta a la lista.
 * Cada cambio avisa las zonas nuevas por `onChange` (el servidor decide si recalcula).
 *
 * Arrastrar con el mouse (HTML5 drag and drop): funciona igual dentro de una ventana con zoom (Desktop).
 * Colores por variables CSS (--w3f-fieldzones-*), con el estilo oscuro de la app por defecto.
 */
import React from 'react';
/** Las cuatro de la Tabla Dinámica; con `keys`, cualquier otra (0022 PB10: los estantes del gráfico). */
export type ZoneKey = 'filters' | 'columns' | 'rows' | 'values' | (string & {});
export type Zones = Record<ZoneKey, string[]>;
export interface FieldZonesProps {
    /** Las columnas que se pueden usar */
    fields: {
        value: string;
        label?: string;
    }[];
    zones?: Partial<Zones>;
    /** Cuántas fichas entran en cada zona (las de más empujan a la primera afuera) */
    limits?: Partial<Record<ZoneKey, number>>;
    /** «left»: la lista y las zonas una debajo de otra (angosto); «top»: la lista arriba y las zonas en 2 × 2 */
    layout?: 'left' | 'top';
    /** Texto extra de cada ficha (p. ej. la función de un Valor: «Suma») */
    badges?: Record<string, string>;
    /** Cada cambio (soltar, ×): las zonas nuevas. (No se llama onChange: w3f-python lo trata como el cambio de valor
     *  de un control y no manda el número de dataset del For) */
    onZonesChange?: (zones: Zones) => void;
    /** Igual que onZonesChange (para usarlo desde React) */
    onChange?: (zones: Zones) => void;
    /** Qué zonas se muestran (por defecto las cuatro); p. ej. el Agrupamiento usa solo rows y values */
    show?: ZoneKey[];
    /** Títulos propios de las zonas (p. ej. rows = «Agrupar por», values = «Calcular») */
    titles?: Partial<Record<ZoneKey, string>>;
    /** 0022 PB10: las zonas, en orden (por defecto filters, columns, rows, values); p. ej. los estantes de un gráfico */
    keys?: ZoneKey[];
    className?: string;
    style?: React.CSSProperties;
}
interface Drag {
    field: string;
    from: ZoneKey | 'list';
}
export declare function normalize(z: Partial<Zones> | undefined, keys?: ZoneKey[]): Zones;
/** Las zonas después de soltar `drag` en la zona `to`, antes de la ficha `before` (o al final). Pura (vitest). */
export declare function moveField(zones: Zones, drag: Drag, to: ZoneKey | 'list', before: string | null, limits?: Partial<Record<ZoneKey, number>>, keys?: ZoneKey[]): Zones;
export declare const FieldZones: React.FC<FieldZonesProps>;
export default FieldZones;
//# sourceMappingURL=FieldZones.d.ts.map