import React from 'react';
import './GridWithDividers.css';
import type { GridWithDividersProps } from './GridWithDividers.types';
export type { GridWithDividersProps, DividerConfig, DividerProps, SliderControlProps, DividerOrientation, DividerPosition, GridDividerState, } from './GridWithDividers.types';
/**
 * GridWithDividers Component - W3F Framework
 *
 * Grid con divisores redimensionables entre áreas.
 *
 * @example
 * <GridWithDividers
 *   templateColumns="250px 1fr"
 *   templateAreas="sidebar main"
 *   dividers={[{ between: ['sidebar', 'main'], orientation: 'vertical', columnIndex: 0, initialSize: 250 }]}
 * >
 *   <GridAreaItem gridArea="sidebar">Sidebar</GridAreaItem>
 *   <GridAreaItem gridArea="main">Main</GridAreaItem>
 * </GridWithDividers>
 */
declare const GridWithDividers: React.FC<GridWithDividersProps>;
export { GridWithDividers };
export default GridWithDividers;
//# sourceMappingURL=GridWithDividers.d.ts.map