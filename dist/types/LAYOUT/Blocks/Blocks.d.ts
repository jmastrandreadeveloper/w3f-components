/**
 * Blocks — armar algo encastrando bloques, al estilo Scratch (Blockly envuelto en React; 0022 Q1 / FC3 / M8 de
 * w3f-data-analysis). El catálogo de bloques (cajones, definiciones y listas de opciones) viene de afuera, en JSON:
 * así las opciones salen de las columnas abiertas y un bloque nuevo no necesita tocar este componente. Cada cambio
 * del armado avisa por `onProgramChange` el JSON de Blockly, que Python valida y traduce (nunca se ejecuta como
 * código). Tema oscuro de la app por defecto; bloques redondeados (zelos).
 *
 * @example
 * <Blocks catalog={{ categories: [{ name: 'Datos', colour: 200, blocks: ['desde'] }],
 *                    blocks: [{ type: 'desde', message0: 'desde %1', colour: 200, nextStatement: null,
 *                               args0: [{ type: 'field_dropdown', name: 'TABLA', options_from: 'tablas' }] }],
 *                    lists: { tablas: [['ventas', 'ventas']] } }}
 *         onProgramChange={(p) => send(p)} />
 */
import React from 'react';
import type { BlockCatalog, BlockDef, BlockOption, BlocksProps } from './Blocks.types';
/** El cajón de herramientas de Blockly para el catálogo (puro: vitest). */
export declare function buildToolbox(catalog: BlockCatalog): {
    kind: string;
    contents: {
        kind: string;
        name: string;
        colour: string | undefined;
        contents: {
            kind: string;
            type: string;
        }[];
    }[];
};
/** La definición JSON de cada bloque con los desplegables «options_from» resueltos a una función que lee las listas
 *  vivas (puro salvo por las funciones; vitest comprueba la forma). */
export declare function buildBlockDefs(catalog: BlockCatalog, lists: () => Record<string, BlockOption[]>): BlockDef[];
export declare const Blocks: React.FC<BlocksProps>;
export default Blocks;
//# sourceMappingURL=Blocks.d.ts.map