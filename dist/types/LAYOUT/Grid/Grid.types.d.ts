import type React from 'react';
export type GridAutoFlow = 'row' | 'column' | 'row dense' | 'column dense';
export type GridJustify = 'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly';
export type GridAlignContent = 'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly';
export type GridJustifyItems = 'start' | 'end' | 'center' | 'stretch';
export type GridAlignItems = 'start' | 'end' | 'center' | 'stretch' | 'baseline';
export type GridJustifySelf = 'start' | 'end' | 'center' | 'stretch';
export type GridAlignSelf = 'start' | 'end' | 'center' | 'stretch' | 'baseline';
export interface GridProps {
    children?: React.ReactNode;
    grid?: string;
    gridTemplate?: string;
    templateColumns?: string;
    templateRows?: string;
    templateAreas?: string;
    gap?: string;
    rowGap?: string;
    columnGap?: string;
    autoColumns?: string;
    autoRows?: string;
    autoFlow?: GridAutoFlow;
    justifyContent?: GridJustify;
    alignContent?: GridAlignContent;
    placeContent?: string;
    justifyItems?: GridJustifyItems;
    alignItems?: GridAlignItems;
    placeItems?: string;
    justifySelf?: GridJustifySelf;
    alignSelf?: GridAlignSelf;
    placeSelf?: string;
    gridRow?: string;
    gridColumn?: string;
    gridArea?: string;
    width?: string;
    height?: string;
    minWidth?: string;
    minHeight?: string;
    maxWidth?: string;
    maxHeight?: string;
    padding?: string;
    margin?: string;
    style?: React.CSSProperties;
    className?: string;
}
export interface GridAreaItemProps {
    children: React.ReactNode;
    /** Columnas que abarca (e.g., 3) -> w3f-col-span-3 */
    colSpan?: number | string;
    /** Asigna el ítem a un área con nombre */
    gridArea?: string;
    /** Shorthand grid-row-start / grid-row-end */
    gridRow?: string;
    /** Shorthand grid-column-start / grid-column-end */
    gridColumn?: string;
    justifySelf?: GridJustifySelf;
    alignSelf?: GridAlignSelf;
    placeSelf?: string;
    style?: React.CSSProperties;
    className?: string;
}
//# sourceMappingURL=Grid.types.d.ts.map