import React from 'react';
import type { GridWithDrawerProps } from './GridWithDrawer.types';
export type { GridWithDrawerProps, ToggleButtonProps } from './GridWithDrawer.types';
/**
 * GridWithDrawer Component - W3F Framework
 *
 * Grid con un panel lateral colapsable (drawer) y divisores redimensionables.
 *
 * @example
 * <GridWithDrawer
 *   templateColumns="250px 1fr"
 *   templateAreas="sidebar main"
 *   drawerAreaName="sidebar"
 *   dividers={[{ between: ['sidebar', 'main'], orientation: 'vertical', columnIndex: 0 }]}
 * >
 *   <div style={{ gridArea: 'sidebar' }}>Sidebar</div>
 *   <div style={{ gridArea: 'main' }}>Main</div>
 * </GridWithDrawer>
 */
declare const GridWithDrawer: React.FC<GridWithDrawerProps>;
export { GridWithDrawer };
export default GridWithDrawer;
//# sourceMappingURL=GridWithDrawer.d.ts.map