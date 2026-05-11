import React, { useMemo, useRef, useEffect } from 'react';
import { ArrowUp, ArrowDown, ArrowUpDown, Search } from 'lucide-react';
import Pagination from '../../NAVIGATION/Pagination/Pagination';
import type { TableProps, TableColumn, SortState } from './Table.types';
import { PAGE_SIZE_OPTIONS, TABLE_DEFAULTS } from './Table.constants';
import { buildContainerClasses, buildTableClasses } from './Table.utils';
import {
    useTableSort,
    useTableFilter,
    useTablePagination,
    useColumnResize,
    useColumnReorder,
} from './Table.hooks';

/**
 * Componente Table - Tabla de datos avanzada.
 * Soporta sorting, filtering, paginación, resize y reordenamiento de columnas.
 */
const Table = React.forwardRef(<T extends Record<string, unknown>>(
    {
        data = [] as T[],
        columns = [] as TableColumn<T>[],
        enableSorting = TABLE_DEFAULTS.enableSorting,
        enableFiltering = TABLE_DEFAULTS.enableFiltering,
        enablePagination = TABLE_DEFAULTS.enablePagination,
        enableColumnResize = TABLE_DEFAULTS.enableColumnResize,
        enableColumnReorder = TABLE_DEFAULTS.enableColumnReorder,
        maxHeight,
        pageSize: initialPageSize = TABLE_DEFAULTS.pageSize,
        variant = TABLE_DEFAULTS.variant,
        size = TABLE_DEFAULTS.size,
        color = TABLE_DEFAULTS.color,
        className = TABLE_DEFAULTS.className,
        paginationProps = {},
        unstyled = TABLE_DEFAULTS.unstyled,
        onRowClick,
        selectedRowKey,
        selectedRowValue,
        ...rest
    }: TableProps<T>,
    ref: React.Ref<HTMLDivElement>
) => {
    const headerRowRef = useRef<HTMLTableRowElement>(null);

    // Hooks
    const { sortState, handleSort } = useTableSort();
    const { globalFilter, handleFilterChange, filteredData } = useTableFilter(data, columns);
    const { columnWidths, initWidths, handleResizeMouseDown, widthsInitializedRef } = useColumnResize();
    const { orderedColumns, handleDragMouseDown } = useColumnReorder(columns);

    // Sorted data
    const sortedData = useMemo(() => {
        if (!sortState.key || !sortState.direction) return filteredData;
        return [...filteredData].sort((a, b) => {
            const aVal = a[sortState.key!];
            const bVal = b[sortState.key!];
            if (aVal == null && bVal == null) return 0;
            if (aVal == null) return 1;
            if (bVal == null) return -1;

            let comparison: number;
            if (typeof aVal === 'number' && typeof bVal === 'number') {
                comparison = aVal - bVal;
            } else {
                comparison = String(aVal).localeCompare(String(bVal), undefined, { numeric: true, sensitivity: 'base' });
            }
            return sortState.direction === 'desc' ? -comparison : comparison;
        });
    }, [filteredData, sortState]);

    // Pagination
    const {
        currentPage, setCurrentPage, pageSize,
        totalPages, handlePageSizeChange, resetPage
    } = useTablePagination(sortedData.length, initialPageSize);

    // Reset page on sort/filter
    useEffect(() => { resetPage(); }, [sortState, globalFilter, resetPage]);

    const paginatedData = useMemo(() => {
        if (!enablePagination) return sortedData;
        const start = (currentPage - 1) * pageSize;
        return sortedData.slice(start, start + pageSize);
    }, [sortedData, currentPage, pageSize, enablePagination]);

    // Init column widths
    useEffect(() => {
        if (enableColumnResize && !widthsInitializedRef.current) {
            initWidths(headerRowRef.current);
        }
    }, [enableColumnResize, columns, initWidths, widthsInitializedRef]);

    // Columns to render
    const displayColumns = enableColumnReorder ? orderedColumns : columns;

    // Classes
    const containerClasses = buildContainerClasses(className, unstyled);
    const tableClassList = buildTableClasses(size, variant, color, enableColumnResize, unstyled);

    const renderSortIcon = (columnKey: string) => {
        if (sortState.key === columnKey) {
            if (sortState.direction === 'asc') return <ArrowUp size={14} />;
            if (sortState.direction === 'desc') return <ArrowDown size={14} />;
        }
        return <ArrowUpDown size={14} />;
    };

    return (
        <div ref={ref} className={containerClasses} {...rest}>
            {enableFiltering && (
                <div className="w3f-table-toolbar">
                    <div className="w3f-table-filter">
                        <span className="w3f-table-filter-icon">
                            <Search size={16} />
                        </span>
                        <input
                            type="text"
                            className="w3f-table-filter-input"
                            placeholder="Buscar..."
                            value={globalFilter}
                            onChange={handleFilterChange}
                            aria-label="Filtrar tabla"
                        />
                    </div>
                </div>
            )}

            <div
                className={['w3f-table-wrapper', maxHeight ? 'w3f-table-wrapper-scrollable' : ''].filter(Boolean).join(' ')}
                style={maxHeight ? { maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight } : undefined}
            >
                <table className={tableClassList}>
                    <thead>
                        <tr ref={headerRowRef}>
                            {displayColumns.map((col) => {
                                const isSortable = enableSorting && col.sortable !== false && !col.cell;
                                const isSorted = sortState.key === col.accessorKey;
                                const width = enableColumnResize ? columnWidths[col.accessorKey] : undefined;

                                return (
                                    <th
                                        key={col.accessorKey}
                                        data-column-key={col.accessorKey}
                                        className={[
                                            isSortable ? 'w3f-table-sortable' : '',
                                            isSorted ? 'w3f-table-sorted' : '',
                                            enableColumnReorder ? 'w3f-table-draggable' : '',
                                        ].filter(Boolean).join(' ')}
                                        style={width ? { width: `${width}px` } : undefined}
                                        onClick={isSortable ? () => handleSort(col.accessorKey) : undefined}
                                        onMouseDown={enableColumnReorder ? (e) => handleDragMouseDown(e, col.accessorKey, headerRowRef) : undefined}
                                        aria-sort={isSorted ? (sortState.direction === 'asc' ? 'ascending' : 'descending') : undefined}
                                    >
                                        <span className="w3f-table-header-content">
                                            {col.header}
                                            {isSortable && (
                                                <span className="w3f-table-sort-icon">
                                                    {renderSortIcon(col.accessorKey)}
                                                </span>
                                            )}
                                        </span>
                                        {enableColumnResize && (
                                            <div
                                                className="w3f-table-resize-handle"
                                                onMouseDown={(e) => handleResizeMouseDown(e, col.accessorKey)}
                                            />
                                        )}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.length === 0 ? (
                            <tr>
                                <td colSpan={displayColumns.length} className="w3f-table-empty">
                                    No se encontraron resultados
                                </td>
                            </tr>
                        ) : (
                            paginatedData.map((row, rowIndex) => {
                                const isSelected = selectedRowKey != null
                                    && row[selectedRowKey] === selectedRowValue;
                                return (
                                    <tr
                                        key={(row as Record<string, unknown>).id as string ?? rowIndex}
                                        onClick={onRowClick ? () => onRowClick(row, rowIndex) : undefined}
                                        style={{
                                            cursor: onRowClick ? 'pointer' : undefined,
                                            backgroundColor: isSelected ? 'var(--w3f-primary-50, #eff6ff)' : undefined,
                                            outline: isSelected ? '2px solid var(--w3f-primary, #3b82f6)' : undefined,
                                            outlineOffset: '-2px',
                                        }}
                                    >
                                        {displayColumns.map((col) => (
                                            <td key={col.accessorKey}>
                                                {col.cell ? col.cell(row) : (row[col.accessorKey] as React.ReactNode)}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {enablePagination && (
                <div className="w3f-table-pagination">
                    <div className="w3f-table-pagination-info">
                        <span>
                            {sortedData.length === 0
                                ? '0 resultados'
                                : `${(currentPage - 1) * pageSize + 1}-${Math.min(currentPage * pageSize, sortedData.length)} de ${sortedData.length}`
                            }
                        </span>
                        <span>|</span>
                        <label>
                            Filas:
                            <select
                                className="w3f-table-page-size-select"
                                value={pageSize}
                                onChange={handlePageSizeChange}
                                aria-label="Filas por página"
                            >
                                {PAGE_SIZE_OPTIONS.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={(_e: React.MouseEvent, newPage: number) => setCurrentPage(newPage)}
                        size="sm"
                        showFirstButton
                        showLastButton
                        {...paginationProps}
                    />
                </div>
            )}
        </div>
    );
}) as <T extends Record<string, unknown>>(props: TableProps<T> & React.RefAttributes<HTMLDivElement>) => React.ReactElement | null;

(Table as React.FC).displayName = 'Table';

export { Table };
export default Table;
