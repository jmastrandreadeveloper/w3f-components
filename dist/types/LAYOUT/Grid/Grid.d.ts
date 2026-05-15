import React from 'react';
import type { GridProps, GridAreaItemProps } from './Grid.types';
export type { GridProps, GridAreaItemProps, GridAutoFlow, GridJustify, GridAlignContent, GridJustifyItems, GridAlignItems, GridJustifySelf, GridAlignSelf, } from './Grid.types';
/**
 * Grid Component - W3F Framework
 *
 * Wrapper de CSS Grid totalmente configurable.
 *
 * @example
 * <Grid templateColumns="1fr 1fr" gap="16px">
 *   <GridAreaItem colSpan={2}>Full width</GridAreaItem>
 *   <div>Col 1</div>
 *   <div>Col 2</div>
 * </Grid>
 */
declare const Grid: React.FC<GridProps>;
/**
 * GridAreaItem Component - W3F Framework
 *
 * Item de Grid con soporte para posicionamiento y span por clase.
 */
declare const GridAreaItem: React.FC<GridAreaItemProps>;
export { Grid, GridAreaItem };
export default Grid;
//# sourceMappingURL=Grid.d.ts.map