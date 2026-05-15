import React from 'react';
import type { FlexContainerProps, FlexItemProps, FlexBoxItemProps } from './Flexbox.types';
export type { FlexContainerProps, FlexItemProps, FlexBoxItemProps, FlexDirection, FlexWrap, FlexJustify, FlexAlign, FlexAlignContent, FlexAlignSelf, } from './Flexbox.types';
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
declare const FlexContainer: React.FC<FlexContainerProps>;
/**
 * FlexItem Component - W3F Framework
 *
 * Elemento flex con soporte para grow, shrink, order y alineación.
 */
declare const FlexItem: React.FC<FlexItemProps>;
/**
 * FlexBoxItem Component - W3F Framework
 *
 * Caja visual que actúa como un FlexItem con estilos predefinidos.
 */
declare const FlexBoxItem: React.FC<FlexBoxItemProps>;
export { FlexContainer, FlexItem, FlexBoxItem };
export default FlexContainer;
//# sourceMappingURL=Flexbox.d.ts.map