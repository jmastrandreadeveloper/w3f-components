import React from 'react';
import type { WindowGroupNote } from './WindowGroup.types';
/** Colores del post-it (el primero es el que se propone al agregar uno). */
export declare const NOTE_COLORS: {
    value: string;
    label: string;
}[];
export declare const NOTE_MAX_CHARS = 200;
/** Solo colores #rgb / #rrggbb (el color va a un estilo: nada de texto libre). */
export declare function safeNoteColor(color?: string | null): string;
interface GroupNoteProps {
    note?: string;
    noteColor?: string;
    info?: string;
    onNoteChange?: (note: WindowGroupNote) => void;
    /** Mientras se arrastra el grupo no se muestra la ficha. */
    isDragging: boolean;
    /** Ficha o editor abiertos: el grupo pasa por encima de los demás. */
    onRaise: (raised: boolean) => void;
    children: React.ReactNode;
}
/**
 * Post-it del grupo (0022 E8): un globo de color con la nota, en la franja de arriba de la ventana principal y con
 * la punta hacia ella; un clic lo edita (texto y color). Al pasar el mouse por la barra o el globo, la ficha
 * automática (`info`: qué es, de dónde sale, pasos, filas). Sin nota, un 📌 en la barra agrega una.
 */
export declare function GroupNote({ note, noteColor, info, onNoteChange, isDragging, onRaise, children }: GroupNoteProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=WindowGroup.note.d.ts.map