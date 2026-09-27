import type { SortState, TableColumn, TableQuery } from './Table.types';
export declare const useTableSort: () => {
    sortState: SortState;
    handleSort: (columnKey: string) => void;
};
export declare const useTableFilter: <T extends Record<string, unknown>>(data: T[], columns: TableColumn<T>[]) => {
    globalFilter: string;
    handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    filteredData: T[];
};
export declare const useTablePagination: (totalItems: number, initialPageSize: number) => {
    currentPage: number;
    setCurrentPage: import("react").Dispatch<import("react").SetStateAction<number>>;
    pageSize: number;
    totalPages: number;
    handlePageSizeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    resetPage: () => void;
};
/**
 * Modo manual: avisa con `onQueryChange` cada cambio de página, filas por página, orden o búsqueda.
 * - Al montar pide su página una vez: si la tabla se remonta (recarga en caliente, ventana que se vuelve
 *   a montar) su estado vuelve a página 1 / sin búsqueda y el servidor tiene que mandar esa página.
 * - La búsqueda espera FILTER_DEBOUNCE_MS después de la última tecla.
 * - Si cambian el orden o la búsqueda estando en otra página, vuelve a la 1 y avisa una sola vez.
 * - Nunca repite la última consulta enviada (React.StrictMode corre los efectos dos veces en desarrollo).
 */
export declare const useManualQuery: (manual: boolean, currentPage: number, pageSize: number, sortState: SortState, globalFilter: string, setCurrentPage: (page: number) => void, onQueryChange?: (query: TableQuery) => void) => void;
export declare const useColumnResize: () => {
    columnWidths: Record<string, number>;
    initWidths: (headerRow: HTMLTableRowElement | null) => void;
    handleResizeMouseDown: (e: React.MouseEvent, columnKey: string) => void;
    widthsInitializedRef: import("react").RefObject<boolean>;
};
export declare const useColumnReorder: <T extends Record<string, unknown>>(columns: TableColumn<T>[]) => {
    columnOrder: string[];
    orderedColumns: TableColumn<T>[];
    handleDragMouseDown: (e: React.MouseEvent<HTMLTableCellElement>, columnKey: string, headerRowRef: React.RefObject<HTMLTableRowElement | null>) => void;
};
//# sourceMappingURL=Table.hooks.d.ts.map