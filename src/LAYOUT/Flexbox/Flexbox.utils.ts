import type { FlexWrap } from './Flexbox.types';
import {
    STANDARD_DIRECTIONS,
    STANDARD_JUSTIFY,
    STANDARD_ALIGN,
    STANDARD_ALIGN_CONTENT,
} from './Flexbox.constants';

// ─── FlexItem utilities ──────────────────────────────────────────

const mapGrowToClass = (grow?: number | boolean): string => {
    if (grow === true || grow === 1) return 'w3f-flex-grow';
    if (grow === false || grow === 0) return 'w3f-flex-grow-0';
    return '';
};

const mapShrinkToClass = (shrink?: number | boolean): string => {
    if (shrink === true || shrink === 1) return 'w3f-flex-shrink';
    if (shrink === false || shrink === 0) return 'w3f-flex-shrink-0';
    return '';
};

const mapOrderToClass = (order?: number | string): string => {
    const orderStr = String(order);
    if (orderStr === 'first') return 'w3f-order-first';
    if (orderStr === 'last') return 'w3f-order-last';
    if (['0', 'none'].includes(orderStr)) return 'w3f-order-none';
    if (['1', '2', '3'].includes(orderStr)) return `w3f-order-${orderStr}`;
    return '';
};

const mapAutoMarginsToClass = ({ mlAuto, mrAuto }: { mlAuto?: boolean; mrAuto?: boolean }): string => {
    const classes: string[] = [];
    if (mlAuto) classes.push('w3f-ml-auto');
    if (mrAuto) classes.push('w3f-mr-auto');
    return classes.join(' ');
};

export const buildFlexItemClassNames = ({
    grow,
    shrink,
    order,
    mlAuto,
    mrAuto,
    className,
}: {
    grow?: number | boolean;
    shrink?: number | boolean;
    order?: number | string;
    mlAuto?: boolean;
    mrAuto?: boolean;
    className?: string;
}): string => {
    return [
        mapGrowToClass(grow),
        mapShrinkToClass(shrink),
        mapOrderToClass(order),
        mapAutoMarginsToClass({ mlAuto, mrAuto }),
        className,
    ].filter(Boolean).join(' ');
};

// ─── FlexContainer utilities ─────────────────────────────────────

const mapDirectionToClass = (dir?: string): string => {
    if (dir === 'row') return 'w3f-flex-row';
    if (dir === 'row-reverse') return 'w3f-flex-row-reverse';
    if (dir === 'column') return 'w3f-flex-col';
    if (dir === 'column-reverse') return 'w3f-flex-col-reverse';
    return '';
};

const mapWrapToClass = (wrap?: FlexWrap): string => {
    if (wrap === true || wrap === 'wrap') return 'w3f-flex-wrap';
    if (wrap === false || wrap === 'nowrap') return 'w3f-flex-nowrap';
    if (wrap === 'wrap-reverse') return 'w3f-flex-wrap-reverse';
    return '';
};

const mapJustifyToClass = (justify?: string): string => {
    if (justify && (STANDARD_JUSTIFY as readonly string[]).includes(justify)) {
        return `w3f-justify-${justify}`;
    }
    return '';
};

const mapAlignItemsToClass = (align?: string): string => {
    if (align && (STANDARD_ALIGN as readonly string[]).includes(align)) {
        return `w3f-items-${align}`;
    }
    return '';
};

const mapAlignContentToClass = (alignContent?: string): string => {
    if (alignContent && (STANDARD_ALIGN_CONTENT as readonly string[]).includes(alignContent)) {
        return `w3f-content-${alignContent}`;
    }
    return '';
};

export const buildFlexContainerClassNames = ({
    direction,
    wrap,
    justifyContent,
    alignItems,
    alignContent,
    inline,
    className,
}: {
    direction?: string;
    wrap?: FlexWrap;
    justifyContent?: string;
    alignItems?: string;
    alignContent?: string;
    inline?: boolean;
    className?: string;
}): string => {
    return [
        inline ? 'w3f-inline-flex' : 'w3f-flex',
        mapDirectionToClass(direction),
        mapWrapToClass(wrap),
        mapJustifyToClass(justifyContent),
        mapAlignItemsToClass(alignItems),
        mapAlignContentToClass(alignContent),
        className,
    ].filter(Boolean).join(' ');
};

/**
 * Construye los estilos inline solo para valores no estándar.
 */
export const buildFlexContainerInlineStyles = ({
    direction,
    wrap,
    justifyContent,
    alignItems,
    alignContent,
    gap,
    rowGap,
    columnGap,
    width,
    height,
    padding,
    margin,
    style,
}: {
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
}): React.CSSProperties => {
    const isStandardDir = (STANDARD_DIRECTIONS as readonly string[]).includes(direction || '');
    const isStandardJustify = (STANDARD_JUSTIFY as readonly string[]).includes(justifyContent || '');
    const isStandardAlign = (STANDARD_ALIGN as readonly string[]).includes(alignItems || '');
    const isStandardAlignContent = (STANDARD_ALIGN_CONTENT as readonly string[]).includes(alignContent || '');

    const flexStyle: Record<string, any> = {
        flexDirection: !isStandardDir ? direction : undefined,
        justifyContent: !isStandardJustify ? justifyContent : undefined,
        alignItems: !isStandardAlign ? alignItems : undefined,
        alignContent: !isStandardAlignContent ? alignContent : undefined,
        gap,
        rowGap,
        columnGap,
        width,
        height,
        padding,
        margin,
        ...style,
    };

    // Limpieza de undefined
    Object.keys(flexStyle).forEach(key => {
        if (flexStyle[key] === undefined) delete flexStyle[key];
    });

    return flexStyle;
};

/**
 * Construye los estilos inline del FlexItem.
 */
export const buildFlexItemInlineStyles = ({
    grow,
    shrink,
    order,
    basis,
    alignSelf,
    style,
}: {
    grow?: number | boolean;
    shrink?: number | boolean;
    order?: number | string;
    basis?: string;
    alignSelf?: string;
    style?: React.CSSProperties;
}): React.CSSProperties => {
    const itemStyle: Record<string, any> = {
        flexGrow: (typeof grow === 'number' && grow !== 0 && grow !== 1) ? grow : undefined,
        flexShrink: (typeof shrink === 'number' && shrink !== 0 && shrink !== 1) ? shrink : undefined,
        order: (typeof order === 'number' && ![0, 1, 2, 3].includes(order)) ? order : undefined,
        flexBasis: basis,
        alignSelf,
        ...style,
    };

    Object.keys(itemStyle).forEach(key => {
        if (itemStyle[key] === undefined) delete itemStyle[key];
    });

    return itemStyle;
};
