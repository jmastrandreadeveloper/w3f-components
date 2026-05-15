import React from 'react';
import type { PopUpProps } from './PopUp.types';
/**
 * PopUp — Diálogo modal que reutiliza la estética de Card.
 * Se renderiza en el root del DOM mediante createPortal.
 *
 * @example
 * <PopUp
 *   isOpen={open}
 *   onClose={() => setOpen(false)}
 *   title="Confirmar acción"
 *   onConfirm={handleConfirm}
 * >
 *   ¿Estás seguro de que deseas continuar?
 * </PopUp>
 */
export declare const PopUp: React.ForwardRefExoticComponent<PopUpProps & React.RefAttributes<HTMLDivElement>>;
export default PopUp;
//# sourceMappingURL=PopUp.d.ts.map