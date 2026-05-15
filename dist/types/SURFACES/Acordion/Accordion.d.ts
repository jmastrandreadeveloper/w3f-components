import React from 'react';
import type { AccordionProps, AccordionItemProps, AccordionSummaryProps, AccordionDetailsProps, AccordionActionsProps } from './Accordion.types';
export declare const AccordionDetails: React.FC<AccordionDetailsProps>;
export declare const AccordionActions: React.FC<AccordionActionsProps>;
export declare const AccordionSummary: React.FC<AccordionSummaryProps>;
export declare const AccordionItem: React.FC<AccordionItemProps>;
/**
 * Accordion Component - W3F Framework
 *
 * Sistema de acordeón con soporte para expansión única o múltiple.
 * Compatible con Form y LiveForm en AccordionDetails.
 *
 * @example
 * <Accordion>
 *   <AccordionItem id="panel1">
 *     <AccordionSummary>¿Qué es el framework?</AccordionSummary>
 *     <AccordionDetails><p>Contenido aquí</p></AccordionDetails>
 *   </AccordionItem>
 * </Accordion>
 *
 * @example
 * // Con formulario integrado
 * <Accordion variant="elevated">
 *   <AccordionItem id="form-panel" color="primary">
 *     <AccordionSummary>Agregar usuario</AccordionSummary>
 *     <AccordionDetails>
 *       <Form initialValues={{ name: '' }} onSubmit={handleSubmit}>
 *         <Input name="name" label="Nombre" />
 *         <Button type="submit">Guardar</Button>
 *       </Form>
 *     </AccordionDetails>
 *     <AccordionActions>
 *       <Button variant="outlined">Cerrar</Button>
 *     </AccordionActions>
 *   </AccordionItem>
 * </Accordion>
 */
export declare const Accordion: React.ForwardRefExoticComponent<AccordionProps & React.RefAttributes<HTMLDivElement>>;
export default Accordion;
//# sourceMappingURL=Accordion.d.ts.map