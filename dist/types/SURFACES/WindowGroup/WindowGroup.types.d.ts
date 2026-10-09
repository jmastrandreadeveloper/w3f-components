import type React from 'react';
export interface WindowGroupPosition {
    x: number;
    y: number;
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
}
//# sourceMappingURL=WindowGroup.types.d.ts.map