"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import React, { useMemo, useRef, useEffect } from "react";
import { ArrowUp, ArrowDown, ArrowUpDown, Search } from "lucide-react";
import Pagination from "../../NAVIGATION/Pagination/Pagination";
import { PAGE_SIZE_OPTIONS, TABLE_DEFAULTS } from "./Table.constants";
import { buildContainerClasses, buildTableClasses } from "./Table.utils";
import {
  useTableSort,
  useTableFilter,
  useTablePagination,
  useColumnResize,
  useColumnReorder
} from "./Table.hooks";
const Table = React.forwardRef(({
  data = [],
  columns = [],
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
}, ref) => {
  const headerRowRef = useRef(null);
  const { sortState, handleSort } = useTableSort();
  const { globalFilter, handleFilterChange, filteredData } = useTableFilter(data, columns);
  const { columnWidths, initWidths, handleResizeMouseDown, widthsInitializedRef } = useColumnResize();
  const { orderedColumns, handleDragMouseDown } = useColumnReorder(columns);
  const sortedData = useMemo(() => {
    if (!sortState.key || !sortState.direction) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortState.key];
      const bVal = b[sortState.key];
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      let comparison;
      if (typeof aVal === "number" && typeof bVal === "number") {
        comparison = aVal - bVal;
      } else {
        comparison = String(aVal).localeCompare(String(bVal), void 0, { numeric: true, sensitivity: "base" });
      }
      return sortState.direction === "desc" ? -comparison : comparison;
    });
  }, [filteredData, sortState]);
  const {
    currentPage,
    setCurrentPage,
    pageSize,
    totalPages,
    handlePageSizeChange,
    resetPage
  } = useTablePagination(sortedData.length, initialPageSize);
  useEffect(() => {
    resetPage();
  }, [sortState, globalFilter, resetPage]);
  const paginatedData = useMemo(() => {
    if (!enablePagination) return sortedData;
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize, enablePagination]);
  useEffect(() => {
    if (enableColumnResize && !widthsInitializedRef.current) {
      initWidths(headerRowRef.current);
    }
  }, [enableColumnResize, columns, initWidths, widthsInitializedRef]);
  const displayColumns = enableColumnReorder ? orderedColumns : columns;
  const containerClasses = buildContainerClasses(className, unstyled);
  const tableClassList = buildTableClasses(size, variant, color, enableColumnResize, unstyled);
  const renderSortIcon = (columnKey) => {
    if (sortState.key === columnKey) {
      if (sortState.direction === "asc") return /* @__PURE__ */ jsx(ArrowUp, { size: 14 });
      if (sortState.direction === "desc") return /* @__PURE__ */ jsx(ArrowDown, { size: 14 });
    }
    return /* @__PURE__ */ jsx(ArrowUpDown, { size: 14 });
  };
  return /* @__PURE__ */ jsxs("div", { ref, className: containerClasses, ...rest, children: [
    enableFiltering && /* @__PURE__ */ jsx("div", { className: "w3f-table-toolbar", children: /* @__PURE__ */ jsxs("div", { className: "w3f-table-filter", children: [
      /* @__PURE__ */ jsx("span", { className: "w3f-table-filter-icon", children: /* @__PURE__ */ jsx(Search, { size: 16 }) }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          className: "w3f-table-filter-input",
          placeholder: "Buscar...",
          value: globalFilter,
          onChange: handleFilterChange,
          "aria-label": "Filtrar tabla"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: ["w3f-table-wrapper", maxHeight ? "w3f-table-wrapper-scrollable" : ""].filter(Boolean).join(" "),
        style: maxHeight ? { maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight } : void 0,
        children: /* @__PURE__ */ jsxs("table", { className: tableClassList, children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { ref: headerRowRef, children: displayColumns.map((col) => {
            const isSortable = enableSorting && col.sortable !== false && !col.cell;
            const isSorted = sortState.key === col.accessorKey;
            const width = enableColumnResize ? columnWidths[col.accessorKey] : void 0;
            return /* @__PURE__ */ jsxs(
              "th",
              {
                "data-column-key": col.accessorKey,
                className: [
                  isSortable ? "w3f-table-sortable" : "",
                  isSorted ? "w3f-table-sorted" : "",
                  enableColumnReorder ? "w3f-table-draggable" : ""
                ].filter(Boolean).join(" "),
                style: width ? { width: `${width}px` } : void 0,
                onClick: isSortable ? () => handleSort(col.accessorKey) : void 0,
                onMouseDown: enableColumnReorder ? (e) => handleDragMouseDown(e, col.accessorKey, headerRowRef) : void 0,
                "aria-sort": isSorted ? sortState.direction === "asc" ? "ascending" : "descending" : void 0,
                children: [
                  /* @__PURE__ */ jsxs("span", { className: "w3f-table-header-content", children: [
                    col.header,
                    isSortable && /* @__PURE__ */ jsx("span", { className: "w3f-table-sort-icon", children: renderSortIcon(col.accessorKey) })
                  ] }),
                  enableColumnResize && /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "w3f-table-resize-handle",
                      onMouseDown: (e) => handleResizeMouseDown(e, col.accessorKey)
                    }
                  )
                ]
              },
              col.accessorKey
            );
          }) }) }),
          /* @__PURE__ */ jsx("tbody", { children: paginatedData.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: displayColumns.length, className: "w3f-table-empty", children: "No se encontraron resultados" }) }) : paginatedData.map((row, rowIndex) => {
            const isSelected = selectedRowKey != null && row[selectedRowKey] === selectedRowValue;
            return /* @__PURE__ */ jsx(
              "tr",
              {
                onClick: onRowClick ? () => onRowClick(row, rowIndex) : void 0,
                style: {
                  cursor: onRowClick ? "pointer" : void 0,
                  backgroundColor: isSelected ? "var(--w3f-primary-50, #eff6ff)" : void 0,
                  outline: isSelected ? "2px solid var(--w3f-primary, #3b82f6)" : void 0,
                  outlineOffset: "-2px"
                },
                children: displayColumns.map((col) => /* @__PURE__ */ jsx("td", { children: col.cell ? col.cell(row) : row[col.accessorKey] }, col.accessorKey))
              },
              row.id ?? rowIndex
            );
          }) })
        ] })
      }
    ),
    enablePagination && /* @__PURE__ */ jsxs("div", { className: "w3f-table-pagination", children: [
      /* @__PURE__ */ jsxs("div", { className: "w3f-table-pagination-info", children: [
        /* @__PURE__ */ jsx("span", { children: sortedData.length === 0 ? "0 resultados" : `${(currentPage - 1) * pageSize + 1}-${Math.min(currentPage * pageSize, sortedData.length)} de ${sortedData.length}` }),
        /* @__PURE__ */ jsx("span", { children: "|" }),
        /* @__PURE__ */ jsxs("label", { children: [
          "Filas:",
          /* @__PURE__ */ jsx(
            "select",
            {
              className: "w3f-table-page-size-select",
              value: pageSize,
              onChange: handlePageSizeChange,
              "aria-label": "Filas por p\xE1gina",
              children: PAGE_SIZE_OPTIONS.map((opt) => /* @__PURE__ */ jsx("option", { value: opt, children: opt }, opt))
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        Pagination,
        {
          count: totalPages,
          page: currentPage,
          onChange: (_e, newPage) => setCurrentPage(newPage),
          size: "sm",
          showFirstButton: true,
          showLastButton: true,
          ...paginationProps
        }
      )
    ] })
  ] });
});
Table.displayName = "Table";
var Table_default = Table;
export {
  Table,
  Table_default as default
};
//# sourceMappingURL=Table.js.map
