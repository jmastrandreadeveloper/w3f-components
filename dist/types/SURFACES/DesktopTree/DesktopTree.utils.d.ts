/**
 * DesktopTree — lee lo que hay en un Desktop (sin estado propio de la app): cada WindowGroup con su título, su nota
 * (post-it) y sus ventanas; las ventanas sueltas, aparte. Se recorre el DOM del canvas, así que cualquier ventana
 * nueva aparece sola.
 */
/** Una acción de lo que le pasó a un elemento (DesktopTree `details`): el texto y, si hay, su código. */
export interface DesktopTreeAction {
    label: string;
    code?: string;
    /** 'python' | 'sql' | 'text' (solo cambia el rótulo del recuadro). */
    lang?: string;
}
/** {id del grupo (data-group-id; "" = ventanas sueltas): {window_id (data-wid; "" = el grupo mismo): acciones}} */
export type DesktopTreeDetails = Record<string, Record<string, DesktopTreeAction[]>>;
export interface DesktopTreeItem {
    /** Clave estable mientras no cambie el orden ni el título. */
    key: string;
    label: string;
    kind: 'group' | 'window';
    /** Texto del post-it del grupo (WindowGroup `note`). */
    note?: string;
    /** Color del post-it. */
    noteColor?: string;
    minimized?: boolean;
    children?: DesktopTreeItem[];
    /** Lo que le pasó (de `details`). */
    actions?: DesktopTreeAction[];
}
export interface DesktopScan {
    items: DesktopTreeItem[];
    /** Elemento de cada clave (para ir a él). */
    els: Map<string, HTMLElement>;
}
/** Lo que hay en el canvas del Desktop, en el orden en que aparece. */
export declare function scanDesktop(canvas: HTMLElement, details?: DesktopTreeDetails | null): DesktopScan;
/** Los ítems cuyo título (o el de alguna ventana, o la nota) contiene `query`; los grupos, con lo que coincide. */
export declare function filterTree(items: DesktopTreeItem[], query: string): DesktopTreeItem[];
/** Firma para no volver a dibujar si nada cambió. */
export declare const treeSignature: (items: DesktopTreeItem[]) => string;
//# sourceMappingURL=DesktopTree.utils.d.ts.map