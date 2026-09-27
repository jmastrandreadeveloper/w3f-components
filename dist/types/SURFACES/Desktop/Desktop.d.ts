import React from 'react';
import type { DesktopProps } from './Desktop.types';
/**
 * Desktop Component - W3F Framework
 *
 * Entorno de escritorio para gestionar ventanas (Window) con:
 * - z-index dinámico (ventana con foco al frente)
 * - Zoom con rueda del mouse hacia el cursor (zoomable=true)
 * - Slider de zoom en toolbar inferior (showZoomControls=true)
 * - Pan arrastrando el fondo con cursor grab (pannable=true)
 * - Canvas interno grande para posicionar ventanas libremente
 *
 * @example
 * <Desktop zoomable pannable background="#1a1a2e" height="600px">
 *   <Window key="w1" title="Editor" initialPosition={{x:30,y:20}}>...</Window>
 *   <Window key="w2" title="Terminal" initialPosition={{x:400,y:100}}>...</Window>
 * </Desktop>
 */
declare const Desktop: React.ForwardRefExoticComponent<DesktopProps & React.RefAttributes<HTMLDivElement>>;
export { Desktop };
export default Desktop;
//# sourceMappingURL=Desktop.d.ts.map