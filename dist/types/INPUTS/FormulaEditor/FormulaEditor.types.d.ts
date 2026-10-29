import type React from 'react';
/** Una función que el editor conoce: nombre, firma (SUMA([columna])), qué hace y un ejemplo. */
export interface FormulaFunction {
    name: string;
    sig?: string;
    doc?: string;
    example?: string;
}
export type FormulaMode = 'expr' | 'sql';
export interface FormulaEditorProps {
    /** El texto de la fórmula (controlado). */
    value?: string;
    /** Cada cambio del texto (el nuevo texto completo). */
    onChange?: (value: string) => void;
    /** Las columnas de los datos: en modo `expr` se escriben [columna]; en `sql`, sueltas. */
    columns?: string[];
    /** Las funciones conocidas (se colorean y se completan; una desconocida se marca). */
    functions?: FormulaFunction[];
    /** `expr` (fórmula con [columnas], funciones y VAR / RETURN) o `sql` (expresión SQL). */
    mode?: FormulaMode;
    /** Alto inicial en renglones (el casillero se puede estirar). */
    rows?: number;
    placeholder?: string;
    readOnly?: boolean;
    disabled?: boolean;
    spellCheck?: boolean;
    /** Un error del servidor (en castellano): se muestra debajo del casillero. */
    error?: string;
    className?: string;
    /** Estilo del casillero (fondo, borde, letra); el relleno y la letra se aplican igual a las dos capas. */
    style?: React.CSSProperties;
    'aria-label'?: string;
    name?: string;
    id?: string;
}
/** Un trozo del texto ya clasificado (para colorear). */
export interface FormulaToken {
    type: 'column' | 'column-unknown' | 'func' | 'func-unknown' | 'keyword' | 'string' | 'number' | 'op' | 'paren' | 'paren-bad' | 'ident' | 'ws' | 'text';
    text: string;
    /** Para las marcas: por qué está mal (el title del trozo). */
    title?: string;
}
/** Lo que se puede completar en la posición del cursor. */
export interface FormulaCompletion {
    /** El trozo del texto que se reemplaza. */
    start: number;
    end: number;
    kind: 'column' | 'function';
    items: FormulaCompletionItem[];
}
export interface FormulaCompletionItem {
    label: string;
    /** Lo que se inserta en lugar del trozo. */
    insert: string;
    /** Dónde queda el cursor dentro de lo insertado (desde el final: 0 = al final, 1 = antes del último carácter). */
    caretBack?: number;
    detail?: string;
    doc?: string;
}
//# sourceMappingURL=FormulaEditor.types.d.ts.map