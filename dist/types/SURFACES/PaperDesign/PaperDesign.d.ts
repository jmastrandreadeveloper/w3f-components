import React from 'react';
import type { PaperDesignProps } from './PaperDesign.types';
/**
 * PaperDesign — Hoja cuadriculada con grid CSS interno.
 *
 * Extiende Paper con un sistema de layout en grid para ubicar
 * componentes alineados a la cuadrícula. Ideal para prototipar
 * formularios, dashboards o layouts en papel cuadriculado.
 *
 * @example
 * // Grid de 3 columnas dentro del papel
 * <PaperDesign columns={3} gap="md" gridColor="primary">
 *   <Input label="Nombre" />
 *   <Input label="Apellido" />
 *   <Input label="Email" />
 * </PaperDesign>
 *
 * @example
 * // Con template areas
 * <PaperDesign
 *   gridTemplateAreas={`
 *     header header
 *     sidebar content
 *   `}
 *   gridTemplateColumns="200px 1fr"
 * >
 *   <div style={{ gridArea: 'header' }}>Header</div>
 *   <div style={{ gridArea: 'sidebar' }}>Sidebar</div>
 *   <div style={{ gridArea: 'content' }}>Content</div>
 * </PaperDesign>
 */
export declare const PaperDesign: React.FC<PaperDesignProps>;
export default PaperDesign;
//# sourceMappingURL=PaperDesign.d.ts.map