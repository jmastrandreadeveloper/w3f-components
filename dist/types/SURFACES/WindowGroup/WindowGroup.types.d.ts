import type React from 'react';
export interface WindowGroupPosition {
    x: number;
    y: number;
}
/** Post-it del grupo (0022 E8): texto y color (#rrggbb). Texto vacío = sin post-it. */
export interface WindowGroupNote {
    text: string;
    color: string;
}
export interface WindowGroupProps {
    /** Ventanas y otros elementos hijos que se mueven juntos. */
    children?: React.ReactNode;
    /** Etiqueta opcional mostrada en la barra de arrastre. */
    title?: string;
    /** Posición inicial del grupo dentro del canvas. Default: {x:0, y:0}. */
    initialPosition?: WindowGroupPosition;
    /** Estilos extra para el contenedor raíz. */
    style?: React.CSSProperties;
    /** Clase extra para el contenedor raíz. */
    className?: string;
    /** Al soltar el grupo después de arrastrarlo: su posición nueva (para guardarla). */
    onMove?: (position: WindowGroupPosition) => void;
    /** Paneles (PanelWindow) abiertos al montar (ej. al volver a abrir un proyecto). */
    initialOpenPanels?: string[];
    /** Cada vez que se abre o se cierra un panel: la lista de paneles abiertos. */
    onPanelsChange?: (openPanels: string[]) => void;
    /** Pedido del servidor para abrir paneles (ej. el Asistente en modo Automático abre el Historial): cada vez
     *  que cambia `n`, se abren los paneles de `panels`. */
    openPanelsRequest?: {
        panels: string[];
        n: number;
    } | null;
    /** Post-it: globo de color con este texto arriba de la ventana principal, con la punta hacia ella. */
    note?: string;
    /** Color del post-it (#rrggbb); también tiñe la barra de título de la ventana principal y la del grupo. */
    noteColor?: string;
    /** Ficha automática (varias líneas): se ve al pasar el mouse por la barra del grupo o por el post-it. */
    info?: string;
    /** Id del grupo en el escritorio (data-group-id): DesktopTree lo usa para cruzar `details` con el grupo. */
    groupId?: string;
    /** Con esto el post-it se edita (clic en el globo, o 📌 si no hay): Guardar / Quitar mandan la nota nueva. */
    onNoteChange?: (note: WindowGroupNote) => void;
}
//# sourceMappingURL=WindowGroup.types.d.ts.map