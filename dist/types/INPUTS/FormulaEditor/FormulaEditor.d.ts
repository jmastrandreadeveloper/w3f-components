/**
 * FormulaEditor — un casillero de fórmulas con colores, autocompletar y marcas (0022 M8.5a de w3f-data-analysis):
 * las [columnas] y las funciones conocidas van en color y las desconocidas marcadas (title con el motivo), los
 * paréntesis sin cerrar o de más se señalan; al escribir «[» se ofrecen las columnas y al escribir letras, las
 * funciones (↑ ↓, Enter / Tab inserta, Esc cierra, Ctrl + espacio abre); debajo, la firma y qué hace la función en
 * la que está el cursor. Es un <textarea> de verdad (controlado) con una capa coloreada detrás: funciona con el
 * `bind=` de w3f-python y con las pruebas en pantalla (fill), y se estira como cualquier casillero.
 *
 * @example
 * <FormulaEditor value={f} onChange={setF} columns={['ventas', 'costo']}
 *                functions={[{ name: 'SUMA', sig: 'SUMA([columna])', doc: 'La suma de la columna en el grupo.' }]} />
 */
import React from 'react';
import type { FormulaCompletion, FormulaCompletionItem, FormulaEditorProps, FormulaFunction, FormulaMode, FormulaToken } from './FormulaEditor.types';
/** El texto en trozos clasificados: [columnas], funciones (las que van seguidas de «(»), palabras clave, textos,
 *  números, paréntesis (los que no cierran o sobran, marcados). Puro: vitest. Con `columns` / `functions` vacíos no
 *  se marca nada como desconocido. */
export declare function tokenize(text: string, columns?: string[], functions?: FormulaFunction[], mode?: FormulaMode): FormulaToken[];
/** Qué se puede completar donde está el cursor: dentro de un «[» abierto, las columnas que contengan lo escrito;
 *  en una palabra, las funciones que empiecen así (y en SQL, también las columnas). null si nada. Puro: vitest. */
export declare function completionAt(text: string, caret: number, columns?: string[], functions?: FormulaFunction[], mode?: FormulaMode): FormulaCompletion | null;
/** El texto con lo elegido en lugar del trozo, y dónde queda el cursor. Puro: vitest. */
export declare function applyCompletion(text: string, c: {
    start: number;
    end: number;
}, item: FormulaCompletionItem): {
    text: string;
    caret: number;
};
/** La función conocida en la que está el cursor (el «(» abierto más cercano que sigue a un nombre). Puro: vitest. */
export declare function enclosingFunction(text: string, caret: number, functions?: FormulaFunction[]): FormulaFunction | null;
declare const FormulaEditor: React.ForwardRefExoticComponent<FormulaEditorProps & React.RefAttributes<HTMLTextAreaElement>>;
export { FormulaEditor };
export default FormulaEditor;
//# sourceMappingURL=FormulaEditor.d.ts.map