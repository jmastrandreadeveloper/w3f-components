import type { SortState, TableColumn } from './Table.types';
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