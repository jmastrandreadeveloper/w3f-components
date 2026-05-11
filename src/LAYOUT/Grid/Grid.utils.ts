import { GRID_CLASSES, VALID_GRID_COLS, VALID_COL_SPANS } from './Grid.constants';

/**
 * Mapea la propiedad 'cols' a la clase CSS correspondiente.
 */
const mapColsToClass = (cols?: number | string): string => {
    if (cols) {
        const colsStr = String(cols);
        if ((VALID_GRID_COLS as readonly string[]).includes(colsStr)) {
            return `w3f-grid-cols-${colsStr}`;
        }
    }
    return '';
};

/**
 * Construye las clases CSS del Grid (Contenedor).
 */
export const buildGridClassNames = ({
    cols,
    className,
}: {
    cols?: number | string;
    className?: string;
}): string => {
    const classes: string[] = [GRID_CLASSES.base];
    classes.push(mapColsToClass(cols));
    if (className) classes.push(className);
    return classes.filter(Boolean).join(' ');
};

/**
 * Construye las clases CSS de un GridAreaItem (Hijo).
 */
export const buildGridItemClassNames = ({
    colSpan,
    className,
}: {
    colSpan?: number | string;
    className?: string;
}): string => {
    const classes: string[] = [];

    if (colSpan) {
        const spanStr = String(colSpan);
        if ((VALID_COL_SPANS as readonly string[]).includes(spanStr)) {
            classes.push(`w3f-col-span-${spanStr}`);
        }
    }

    if (className) classes.push(className);

    return classes.filter(Boolean).join(' ');
};

/**
 * Construye los estilos inline del Grid.
 */
export const buildGridInlineStyles = (props: Record<string, any>): React.CSSProperties => {
    const {
        grid, gridTemplate, templateColumns, templateRows, templateAreas,
        gap, rowGap, columnGap, autoColumns, autoRows, autoFlow,
        justifyContent, alignContent, placeContent,
        justifyItems, alignItems, placeItems,
        justifySelf, alignSelf, placeSelf,
        gridRow, gridColumn, gridArea,
        width, height, minWidth, minHeight, maxWidth, maxHeight,
        padding, margin, style,
    } = props;

    const gridStyle: Record<string, any> = {
        display: 'grid',
        grid,
        gridTemplate,
        gridTemplateColumns: templateColumns,
        gridTemplateRows: templateRows,
        gridTemplateAreas: templateAreas
            ? templateAreas.trim().split('\n').map((row: string) => `"${row.trim()}"`).join(' ')
            : undefined,
        gap,
        rowGap,
        columnGap,
        gridAutoColumns: autoColumns,
        gridAutoRows: autoRows,
        gridAutoFlow: autoFlow,
        justifyContent,
        alignContent,
        placeContent,
        justifyItems,
        alignItems,
        placeItems,
        justifySelf,
        alignSelf,
        placeSelf,
        gridRow,
        gridColumn,
        gridArea,
        width,
        height,
        minWidth,
        minHeight,
        maxWidth,
        maxHeight,
        padding,
        margin,
        ...style,
    };

    Object.keys(gridStyle).forEach(key => {
        if (gridStyle[key] === undefined) delete gridStyle[key];
    });

    return gridStyle;
};

/**
 * Construye los estilos inline de un GridAreaItem.
 */
export const buildGridItemInlineStyles = ({
    gridArea,
    gridRow,
    gridColumn,
    justifySelf,
    alignSelf,
    placeSelf,
    style,
}: {
    gridArea?: string;
    gridRow?: string;
    gridColumn?: string;
    justifySelf?: string;
    alignSelf?: string;
    placeSelf?: string;
    style?: React.CSSProperties;
}): React.CSSProperties => {
    const itemStyle: Record<string, any> = {
        gridArea,
        gridRow,
        gridColumn,
        justifySelf,
        alignSelf,
        placeSelf,
        ...style,
    };

    Object.keys(itemStyle).forEach(key => {
        if (itemStyle[key] === undefined) delete itemStyle[key];
    });

    return itemStyle;
};
