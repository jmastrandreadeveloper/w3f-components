import type React from 'react';
/** Una opción de un desplegable: [rótulo, valor]. */
export type BlockOption = [string, string];
/** Definición de un bloque (el JSON de Blockly: message0, args0, colour, previousStatement…). En `args0`, un
 *  `field_dropdown` puede traer `options_from: "<lista>"` en vez de `options`: las opciones salen de
 *  `catalog.lists[<lista>]` y cambian sin redefinir el bloque (las columnas del dataset abierto). */
export interface BlockDef {
    type: string;
    message0: string;
    args0?: Record<string, unknown>[];
    message1?: string;
    args1?: Record<string, unknown>[];
    colour?: number | string;
    tooltip?: string;
    previousStatement?: null | string;
    nextStatement?: null | string;
    output?: null | string;
    inputsInline?: boolean;
    [k: string]: unknown;
}
export interface BlockCategory {
    name: string;
    colour?: number | string;
    /** Tipos de bloque (de `catalog.blocks`) que van en este cajón. */
    blocks: string[];
}
/** El catálogo de bloques de una ventana: lo arma Python (así las opciones salen de los datos abiertos). */
export interface BlockCatalog {
    categories: BlockCategory[];
    blocks: BlockDef[];
    lists?: Record<string, BlockOption[]>;
}
export interface BlocksProps {
    catalog: BlockCatalog;
    /** El armado (JSON de Blockly.serialization.workspaces.save). Controlado: uno nuevo desde afuera reemplaza el del lienzo. */
    program?: Record<string, unknown> | null;
    /** Cada cambio del armado (no de la vista), con una pausa corta: el JSON nuevo. */
    onProgramChange?: (program: Record<string, unknown>) => void;
    /** Igual que onProgramChange (para usarlo desde React) */
    onChange?: (program: Record<string, unknown>) => void;
    height?: number | string;
    theme?: 'dark' | 'light';
    /** Bloques redondeados al estilo Scratch (zelos, por defecto) o los clásicos (geras). */
    renderer?: 'zelos' | 'geras';
    locale?: 'es' | 'en';
    className?: string;
    style?: React.CSSProperties;
}
//# sourceMappingURL=Blocks.types.d.ts.map