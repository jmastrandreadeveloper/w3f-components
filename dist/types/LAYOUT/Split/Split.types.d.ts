import type React from 'react';
export interface SplitProps {
    /** Dos hijos: el panel de la izquierda (ancho fijo, arrastrable) y el de la derecha (el resto). */
    children: React.ReactNode;
    /** Ancho del panel izquierdo en px (controlado desde afuera; cambia al soltar el separador). */
    size?: number;
    minSize?: number;
    maxSize?: number;
    /** Al soltar el separador: el ancho nuevo en px (para recordarlo). */
    onSizeChange?: (size: number) => void;
    /** Plegado: se ocultan el panel izquierdo y el separador, queda solo el de la derecha (el ancho se conserva
     *  para cuando se despliegue). w3f-data-analysis: la pestaña Proyecto muestra el escritorio solo; la pestaña
     *  Aprendiendo, la lección a la izquierda y el mismo escritorio a la derecha. */
    collapsed?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
//# sourceMappingURL=Split.types.d.ts.map