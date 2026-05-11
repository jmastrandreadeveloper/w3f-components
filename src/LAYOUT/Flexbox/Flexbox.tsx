import React from 'react';
import type { FlexContainerProps, FlexItemProps, FlexBoxItemProps } from './Flexbox.types';
import { FLEX_CONTAINER_DEFAULTS, FLEX_BOX_ITEM_DEFAULTS } from './Flexbox.constants';
import {
    buildFlexContainerClassNames,
    buildFlexContainerInlineStyles,
    buildFlexItemClassNames,
    buildFlexItemInlineStyles,
} from './Flexbox.utils';

export type {
    FlexContainerProps,
    FlexItemProps,
    FlexBoxItemProps,
    FlexDirection,
    FlexWrap,
    FlexJustify,
    FlexAlign,
    FlexAlignContent,
    FlexAlignSelf,
} from './Flexbox.types';

/**
 * FlexContainer Component - W3F Framework
 *
 * Contenedor flex configurable con soporte para clases CSS y estilos inline.
 *
 * @example
 * <FlexContainer direction="row" justifyContent="between" gap="16px">
 *   <FlexItem grow={1}>Contenido</FlexItem>
 * </FlexContainer>
 */
const FlexContainer: React.FC<FlexContainerProps> = ({
    children,
    direction = FLEX_CONTAINER_DEFAULTS.direction,
    wrap = FLEX_CONTAINER_DEFAULTS.wrap,
    justifyContent = FLEX_CONTAINER_DEFAULTS.justifyContent,
    alignItems = FLEX_CONTAINER_DEFAULTS.alignItems,
    alignContent = FLEX_CONTAINER_DEFAULTS.alignContent,
    gap,
    rowGap,
    columnGap,
    width,
    height,
    padding,
    margin,
    inline = FLEX_CONTAINER_DEFAULTS.inline,
    className = '',
    style = {},
    ...rest
}) => {
    const classNames = buildFlexContainerClassNames({
        direction, wrap, justifyContent, alignItems, alignContent, inline, className,
    });

    const flexStyle = buildFlexContainerInlineStyles({
        direction, wrap, justifyContent, alignItems, alignContent,
        gap, rowGap, columnGap, width, height, padding, margin, style,
    });

    return (
        <div className={classNames} style={flexStyle} {...rest}>
            {children}
        </div>
    );
};

FlexContainer.displayName = 'FlexContainer';

/**
 * FlexItem Component - W3F Framework
 *
 * Elemento flex con soporte para grow, shrink, order y alineación.
 */
const FlexItem: React.FC<FlexItemProps> = ({
    children,
    grow,
    shrink,
    order,
    mlAuto,
    mrAuto,
    basis,
    alignSelf,
    className = '',
    style = {},
    ...rest
}) => {
    const classNames = buildFlexItemClassNames({
        grow, shrink, order, mlAuto, mrAuto, className,
    });

    const itemStyle = buildFlexItemInlineStyles({
        grow, shrink, order, basis, alignSelf, style,
    });

    return (
        <div className={classNames} style={itemStyle} {...rest}>
            {children}
        </div>
    );
};

FlexItem.displayName = 'FlexItem';

/**
 * FlexBoxItem Component - W3F Framework
 *
 * Caja visual que actúa como un FlexItem con estilos predefinidos.
 */
const FlexBoxItem: React.FC<FlexBoxItemProps> = ({
    children,
    bgColor = FLEX_BOX_ITEM_DEFAULTS.bgColor,
    style = {},
    className = '',
    ...rest
}) => {
    const boxStyles: React.CSSProperties = {
        backgroundColor: bgColor,
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        minHeight: '50px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
    };

    return (
        <FlexItem style={boxStyles} className={className} {...rest}>
            {children}
        </FlexItem>
    );
};

FlexBoxItem.displayName = 'FlexBoxItem';

export { FlexContainer, FlexItem, FlexBoxItem };
export default FlexContainer;
