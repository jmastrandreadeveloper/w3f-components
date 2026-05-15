import React from 'react';
import type { StepperProps, StepProps, StepLabelProps, StepContentProps, StepConnectorProps } from './Stepper.types';
declare const StepConnector: React.FC<StepConnectorProps>;
declare const StepLabel: React.FC<StepLabelProps>;
declare const StepContent: React.FC<StepContentProps>;
declare const Step: React.FC<StepProps>;
/**
 * Stepper Component - W3F Framework
 *
 * Indicador de progreso de pasos. Soporta orientación horizontal/vertical,
 * labels alternativos, modo no-lineal y contenido anidado con Form/LiveForm.
 *
 * @example
 * // Horizontal básico
 * <Stepper activeStep={step}>
 *   <Step><StepLabel>Datos personales</StepLabel></Step>
 *   <Step><StepLabel>Dirección</StepLabel></Step>
 *   <Step><StepLabel>Confirmación</StepLabel></Step>
 * </Stepper>
 *
 * @example
 * // Vertical con contenido y formulario
 * <Stepper activeStep={step} orientation="vertical">
 *   <Step>
 *     <StepLabel>Información</StepLabel>
 *     <StepContent>
 *       <Form initialValues={{ name: '' }} onSubmit={handleSubmit}>
 *         <Input name="name" label="Nombre" />
 *         <Button type="submit">Siguiente</Button>
 *       </Form>
 *     </StepContent>
 *   </Step>
 * </Stepper>
 */
declare const Stepper: React.ForwardRefExoticComponent<StepperProps & React.RefAttributes<HTMLDivElement>>;
export { Stepper, Step, StepLabel, StepContent, StepConnector };
export default Stepper;
//# sourceMappingURL=Stepper.d.ts.map