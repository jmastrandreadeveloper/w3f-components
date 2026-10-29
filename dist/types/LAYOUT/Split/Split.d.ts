/**
 * Split — dos paneles lado a lado con un separador arrastrable (0022 B27, w3f-data-analysis).
 *
 * El panel de la izquierda tiene un ancho fijo (`size`, px) y el de la derecha ocupa el resto. Arrastrar el
 * separador cambia el ancho mientras se mueve el mouse y, al soltar, avisa por `onSizeChange` (así la app lo
 * recuerda por ventana). Funciona dentro de un Desktop con zoom (transform: scale): el delta del mouse se divide
 * por la escala del lienzo, leída del primer ancestro con transform (como Window).
 *
 * @example
 * <Split size={300} minSize={180} maxSize={700} onSizeChange={(w) => save(w)}>
 *     <div>panel</div>
 *     <div>resultado</div>
 * </Split>
 */
import React from 'react';
import type { SplitProps } from './Split.types';
export declare const Split: React.FC<SplitProps>;
export default Split;
//# sourceMappingURL=Split.d.ts.map