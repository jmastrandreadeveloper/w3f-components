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
}
//# sourceMappingURL=WindowGroup.types.d.ts.map