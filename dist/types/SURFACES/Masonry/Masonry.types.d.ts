import type { ReactNode, CSSProperties, MouseEvent } from 'react';
export type MasonryVariant = 'column' | 'flex' | 'grid';
export type MasonryItemSize = 'small' | 'medium' | 'large' | 'full';
export interface MasonryBreakpoints {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
}
export interface MasonryProps {
    /** Layout algorithm */
    variant?: MasonryVariant;
    /** column variant — column count per breakpoint */
    columns?: MasonryBreakpoints;
    /** flex variant — base item width (e.g. '280px') */
    baseColumnWidth?: string;
    /** grid variant — minimum card width for auto-fit (e.g. '280px') */
    minCardWidth?: string;
    /** grid variant — explicit column count (overrides auto-fit) */
    gridColumns?: number;
    gap?: string;
    padding?: string;
    children?: ReactNode;
    /** If true, removes all visual/preset styles — only structural CSS remains. */
    unstyled?: boolean;
    className?: string;
    style?: CSSProperties;
}
export interface MasonryItemProps {
    /** Width hint — applies in flex & grid modes */
    size?: MasonryItemSize;
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
}
export interface MasonryCardProps {
    /** Card heading */
    title?: string;
    /** CSS gradient string for the visual header strip */
    gradient?: string;
    /** Height of the gradient header */
    headerHeight?: string;
    /** Enable lift-on-hover effect */
    hover?: boolean;
    /** Width hint — applies in flex & grid modes */
    size?: MasonryItemSize;
    /** Form integration: hidden <input name> */
    name?: string;
    /** Form integration: hidden <input value> */
    value?: string | number;
    onClick?: (e: MouseEvent<HTMLDivElement>) => void;
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
}
export interface MasonryContextValue {
    variant: MasonryVariant;
}
//# sourceMappingURL=Masonry.types.d.ts.map