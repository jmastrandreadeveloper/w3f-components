import React from 'react';
import type { AccordionHProps, AccordionItemHProps, AccordionSummaryHProps, AccordionDetailsHProps, AccordionActionsHProps } from './AccordionHorizontal.types';
export declare const AccordionDetailsH: React.FC<AccordionDetailsHProps>;
export declare const AccordionActionsH: React.FC<AccordionActionsHProps>;
export declare const AccordionSummaryH: React.FC<AccordionSummaryHProps>;
export declare const AccordionItemH: React.FC<AccordionItemHProps>;
/**
 * AccordionHorizontal Component - W3F Framework
 *
 * Variante horizontal del Accordion. Los paneles se expanden lateralmente
 * con el título en orientación vertical. En mobile, degrada a vertical.
 *
 * @example
 * <AccordionHorizontal variant="elevated" height="350px">
 *   <AccordionItemH id="panel1" color="primary">
 *     <AccordionSummaryH>Características</AccordionSummaryH>
 *     <AccordionDetailsH>
 *       <p>Contenido del panel</p>
 *     </AccordionDetailsH>
 *   </AccordionItemH>
 *   <AccordionItemH id="panel2" color="success">
 *     <AccordionSummaryH>Instalación</AccordionSummaryH>
 *     <AccordionDetailsH>
 *       <p>Pasos de instalación</p>
 *     </AccordionDetailsH>
 *   </AccordionItemH>
 * </AccordionHorizontal>
 */
export declare const AccordionHorizontal: React.ForwardRefExoticComponent<AccordionHProps & React.RefAttributes<HTMLDivElement>>;
export default AccordionHorizontal;
//# sourceMappingURL=AccordionHorizontal.d.ts.map