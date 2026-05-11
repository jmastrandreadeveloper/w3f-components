import type React from 'react';

// ─── Grid auto flow values ────────────────────────────────────────
export type GridAutoFlow = 'row' | 'column' | 'row dense' | 'column dense';

// ─── Grid alignment values ────────────────────────────────────────
export type GridJustify = 'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly';
export type GridAlignContent = 'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly';
export type GridJustifyItems = 'start' | 'end' | 'center' | 'stretch';
export type GridAlignItems = 'start' | 'end' | 'center' | 'stretch' | 'baseline';
export type GridJustifySelf = 'start' | 'end' | 'center' | 'stretch';
export type GridAlignSelf = 'start' | 'end' | 'center' | 'stretch' | 'baseline';

// ─── Props del componente Grid ────────────────────────────────────
export interface GridProps {
    children?: React.ReactNode;
    // Shorthands principales
    grid?: string;
    gridTemplate?: string;
    // Template / Tracks
    templateColumns?: string;
    templateRows?: string;
    templateAreas?: string;
    // Spacing
    gap?: string;
    rowGap?: string;
    columnGap?: string;
    // Auto
    autoColumns?: string;
    autoRows?: string;
    autoFlow?: GridAutoFlow;
    // Alignment Container
    justifyContent?: GridJustify;
    alignContent?: GridAlignContent;
    placeContent?: string;
    // Alignment Items (Default)
    justifyItems?: GridJustifyItems;
    alignItems?: GridAlignItems;
    placeItems?: string;
    // Alignment Items (Self)
    justifySelf?: GridJustifySelf;
    alignSelf?: GridAlignSelf;
    placeSelf?: string;
    // Item Position
    gridRow?: string;
    gridColumn?: string;
    gridArea?: string;
    // Dimensions
    width?: string;
    height?: string;
    minWidth?: string;
    minHeight?: string;
    maxWidth?: string;
    maxHeight?: string;
    // Padding & Margin
    padding?: string;
    margin?: string;
    // Other
    style?: React.CSSProperties;
    className?: string;
}

// ─── Props del componente GridAreaItem ─────────────────────────────
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
