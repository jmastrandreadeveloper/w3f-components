/**
 * MenuBar — barra de menús con desplegables y submenús (0022 L1, w3f-data-analysis).
 *
 * A diferencia de `Menu`: cada ítem tiene un `id` (se avisa el id, no el rótulo: «Suma» puede estar en dos menús),
 * los de una sola elección muestran ✓, y los desplegables se dibujan en `document.body` con posición fija (no los
 * corta una ventana con overflow ni los deforma el zoom del Desktop, que usa transform). Colores por variables CSS
 * (--w3f-menubar-*), con el estilo oscuro de la app por defecto.
 *
 * Teclado (0031 MWG6, guías `app-menus` y `menu` de Modern Web Guidance): la barra es una sola parada de Tab; ← / →
 * pasan de un menú a otro; ↓, Enter o Espacio abren el menú y entran en él; adentro ↑ / ↓ / Inicio / Fin recorren
 * los ítems, → abre un submenú (o pasa al menú siguiente), ← lo cierra (o pasa al anterior), Esc cierra de a un
 * nivel y devuelve el foco, Tab sale y cierra todo. Pasar el mouse por un ítem lo enfoca (el mouse y el teclado
 * marcan el mismo ítem). Se dejó la posición calculada con JS (y no CSS anchor positioning): el ancla puede estar
 * dentro del Desktop con zoom y anchor positioning no tiene en cuenta ese transform.
 *
 * @example
 * <MenuBar menus={[{ id: 'valores', label: 'Valores', items: [
 *     { id: 'agg', label: 'Función', items: [{ id: 'set:aggfunc=sum', label: 'Suma', checked: true }] },
 * ] }]} onSelect={(id) => console.log(id)} />
 */
import React from 'react';
import type { MenuBarProps } from './MenuBar.types';
export declare const MenuBar: React.FC<MenuBarProps>;
export default MenuBar;
//# sourceMappingURL=MenuBar.d.ts.map