import React from 'react';
import type { DashboardProps, DashboardTileProps } from './Dashboard.types';
/** Marca el contenido de una tarjeta del Dashboard (su lugar sale de `layout` por `tileId`). */
export declare const DashboardTile: React.FC<DashboardTileProps>;
/**
 * Dashboard — tarjetas en una grilla que se mueven (arrastrando su barra) y cambian de tamaño (esquina de abajo a la
 * derecha). Al soltar, el layout se acomoda sin tarjetas encimadas y se avisa con `onLayoutChange`. Funciona con el
 * zoom del Desktop (mide la escala de la grilla). Con `fullscreen` se dibuja en toda la pantalla (portal a body).
 *
 * @example
 * <Dashboard layout={[{ id: 'a', x: 0, y: 0, w: 6, h: 4, title: 'Ventas' }]} onLayoutChange={guardar}>
 *   <DashboardTile tileId="a"><Bar data={…} /></DashboardTile>
 * </Dashboard>
 */
export declare const Dashboard: React.FC<DashboardProps>;
export default Dashboard;
//# sourceMappingURL=Dashboard.d.ts.map