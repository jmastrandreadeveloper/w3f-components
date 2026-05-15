/**
 * Construye las clases CSS del Grid (Contenedor).
 */
export declare const buildGridClassNames: ({ cols, className, }: {
    cols?: number | string;
    className?: string;
}) => string;
/**
 * Construye las clases CSS de un GridAreaItem (Hijo).
 */
export declare const buildGridItemClassNames: ({ colSpan, className, }: {
    colSpan?: number | string;
    className?: string;
}) => string;
/**
 * Construye los estilos inline del Grid.
 */
export declare const buildGridInlineStyles: (props: Record<string, any>) => React.CSSProperties;
/**
 * Construye los estilos inline de un GridAreaItem.
 */
export declare const buildGridItemInlineStyles: ({ gridArea, gridRow, gridColumn, justifySelf, alignSelf, placeSelf, style, }: {
    gridArea?: string;
    gridRow?: string;
    gridColumn?: string;
    justifySelf?: string;
    alignSelf?: string;
    placeSelf?: string;
    style?: React.CSSProperties;
}) => React.CSSProperties;
//# sourceMappingURL=Grid.utils.d.ts.map