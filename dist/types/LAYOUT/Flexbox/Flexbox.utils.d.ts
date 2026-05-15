import type { FlexWrap } from './Flexbox.types';
export declare const buildFlexItemClassNames: ({ grow, shrink, order, mlAuto, mrAuto, className, }: {
    grow?: number | boolean;
    shrink?: number | boolean;
    order?: number | string;
    mlAuto?: boolean;
    mrAuto?: boolean;
    className?: string;
}) => string;
export declare const buildFlexContainerClassNames: ({ direction, wrap, justifyContent, alignItems, alignContent, inline, className, }: {
    direction?: string;
    wrap?: FlexWrap;
    justifyContent?: string;
    alignItems?: string;
    alignContent?: string;
    inline?: boolean;
    className?: string;
}) => string;
/**
 * Construye los estilos inline solo para valores no estándar.
 */
export declare const buildFlexContainerInlineStyles: ({ direction, wrap, justifyContent, alignItems, alignContent, gap, rowGap, columnGap, width, height, padding, margin, style, }: {
    direction?: string;
    wrap?: FlexWrap;
    justifyContent?: string;
    alignItems?: string;
    alignContent?: string;
    gap?: string | number;
    rowGap?: string | number;
    columnGap?: string | number;
    width?: string;
    height?: string;
    padding?: string;
    margin?: string;
    style?: React.CSSProperties;
}) => React.CSSProperties;
/**
 * Construye los estilos inline del FlexItem.
 */
export declare const buildFlexItemInlineStyles: ({ grow, shrink, order, basis, alignSelf, style, }: {
    grow?: number | boolean;
    shrink?: number | boolean;
    order?: number | string;
    basis?: string;
    alignSelf?: string;
    style?: React.CSSProperties;
}) => React.CSSProperties;
//# sourceMappingURL=Flexbox.utils.d.ts.map