import type React from 'react';

// ─── FlexContainer types ──────────────────────────────────────────
export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export type FlexWrap = boolean | 'wrap' | 'nowrap' | 'wrap-reverse';
export type FlexJustify = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | string;
export type FlexAlign = 'start' | 'end' | 'center' | 'baseline' | 'stretch' | string;
export type FlexAlignContent = 'start' | 'end' | 'center' | 'between' | 'around' | 'stretch' | string;

export interface FlexContainerProps {
    children?: React.ReactNode;
    direction?: FlexDirection;
    wrap?: FlexWrap;
    justifyContent?: FlexJustify;
    alignItems?: FlexAlign;
    alignContent?: FlexAlignContent;
    gap?: string | number;
    rowGap?: string | number;
    columnGap?: string | number;
    width?: string;
    height?: string;
    padding?: string;
    margin?: string;
    inline?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

// ─── FlexItem types ───────────────────────────────────────────────
export type FlexAlignSelf = 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';

export interface FlexItemProps {
    children?: React.ReactNode;
    /** true/1 (clase) o número específico (style) */
    grow?: number | boolean;
    /** true/1 (clase) o número específico (style) */
    shrink?: number | boolean;
    /** 'first', 'last', 0-3 (clase) o número arbitrario (style) */
    order?: number | string;
    /** margin-left: auto */
    mlAuto?: boolean;
    /** margin-right: auto */
    mrAuto?: boolean;
    /** flex-basis (ej. '200px', '30%') */
    basis?: string;
    /** Alineación específica de este item */
    alignSelf?: FlexAlignSelf;
    className?: string;
    style?: React.CSSProperties;
}

// ─── FlexBoxItem types ────────────────────────────────────────────
export interface FlexBoxItemProps extends Omit<FlexItemProps, 'style'> {
    /** Color de fondo de la caja */
    bgColor?: string;
    style?: React.CSSProperties;
}
