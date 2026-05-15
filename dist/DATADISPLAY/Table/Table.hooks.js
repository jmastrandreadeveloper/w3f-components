import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { MIN_COLUMN_WIDTH, DRAG_DEAD_ZONE } from "./Table.constants";
const useTableSort = () => {
  const [sortState, setSortState] = useState({ key: null, direction: null });
  const handleSort = useCallback((columnKey) => {
    setSortState((prev) => {
      if (prev.key !== columnKey) return { key: columnKey, direction: "asc" };
      if (prev.direction === "asc") return { key: columnKey, direction: "desc" };
      return { key: null, direction: null };
    });
  }, []);
  return { sortState, handleSort };
};
const useTableFilter = (data, columns) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const handleFilterChange = useCallback((e) => {
    setGlobalFilter(e.target.value);
  }, []);
  const filteredData = useMemo(() => {
    if (!globalFilter.trim()) return data;
    const search = globalFilter.toLowerCase().trim();
    return data.filter(
      (row) => columns.some((col) => {
        if (col.cell) return false;
        const value = row[col.accessorKey];
        if (value == null) return false;
        return String(value).toLowerCase().includes(search);
      })
    );
  }, [data, columns, globalFilter]);
  return { globalFilter, handleFilterChange, filteredData };
};
const useTablePagination = (totalItems, initialPageSize) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(totalItems / pageSize)),
    [totalItems, pageSize]
  );
  const handlePageSizeChange = useCallback((e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  }, []);
  const resetPage = useCallback(() => setCurrentPage(1), []);
  return { currentPage, setCurrentPage, pageSize, totalPages, handlePageSizeChange, resetPage };
};
const useColumnResize = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const resizeRef = useRef(null);
  const widthsInitializedRef = useRef(false);
  const initWidths = useCallback((headerRow) => {
    if (widthsInitializedRef.current || !headerRow) return;
    const cells = headerRow.querySelectorAll("th");
    if (cells.length === 0) return;
    const widths = {};
    cells.forEach((cell) => {
      const key = cell.getAttribute("data-column-key");
      if (key) widths[key] = cell.offsetWidth;
    });
    if (Object.keys(widths).length > 0) {
      setColumnWidths(widths);
      widthsInitializedRef.current = true;
    }
  }, []);
  const handleResizeMouseDown = useCallback((e, columnKey) => {
    e.stopPropagation();
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = columnWidths[columnKey] || 100;
    resizeRef.current = { columnKey, startX, startWidth };
    document.body.classList.add("w3f-table-resizing");
    const onMouseMove = (moveEvent) => {
      const delta = moveEvent.clientX - startX;
      const newWidth = Math.max(MIN_COLUMN_WIDTH, startWidth + delta);
      setColumnWidths((prev) => ({ ...prev, [columnKey]: newWidth }));
    };
    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.body.classList.remove("w3f-table-resizing");
      resizeRef.current = null;
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }, [columnWidths]);
  return { columnWidths, initWidths, handleResizeMouseDown, widthsInitializedRef };
};
const useColumnReorder = (columns) => {
  const [columnOrder, setColumnOrder] = useState(() => columns.map((c) => c.accessorKey));
  const dragRef = useRef(null);
  const ghostRef = useRef(null);
  const indicatorRef = useRef(null);
  useEffect(() => {
    setColumnOrder((prev) => {
      const currentKeys = columns.map((c) => c.accessorKey);
      const filtered = prev.filter((key) => currentKeys.includes(key));
      const newKeys = currentKeys.filter((key) => !filtered.includes(key));
      return [...filtered, ...newKeys];
    });
  }, [columns]);
  const orderedColumns = useMemo(() => {
    const columnMap = {};
    columns.forEach((c) => {
      columnMap[c.accessorKey] = c;
    });
    return columnOrder.map((key) => columnMap[key]).filter(Boolean);
  }, [columns, columnOrder]);
  const handleDragMouseDown = useCallback((e, columnKey, headerRowRef) => {
    if (e.target.closest(".w3f-table-resize-handle")) return;
    if (e.button !== 0) return;
    const startX = e.clientX;
    const startY = e.clientY;
    const th = e.currentTarget;
    let isDragging = false;
    const onMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      if (!isDragging && Math.sqrt(dx * dx + dy * dy) < DRAG_DEAD_ZONE) return;
      if (!isDragging) {
        isDragging = true;
        dragRef.current = { columnKey, sourceEl: th };
        document.body.classList.add("w3f-table-dragging-body");
        th.classList.add("w3f-table-th-dragging");
        const ghost = document.createElement("div");
        ghost.className = "w3f-table-drag-ghost";
        ghost.textContent = th.textContent;
        document.body.appendChild(ghost);
        ghostRef.current = ghost;
        const indicator = document.createElement("div");
        indicator.className = "w3f-table-drop-indicator";
        indicator.style.display = "none";
        document.body.appendChild(indicator);
        indicatorRef.current = indicator;
      }
      if (ghostRef.current) {
        ghostRef.current.style.left = `${moveEvent.clientX + 12}px`;
        ghostRef.current.style.top = `${moveEvent.clientY - 16}px`;
      }
      if (headerRowRef.current && indicatorRef.current) {
        const headerCells = Array.from(headerRowRef.current.querySelectorAll("th"));
        let closestEdge = null;
        let closestDist = Infinity;
        for (const cell of headerCells) {
          const cellKey = cell.getAttribute("data-column-key");
          if (cellKey === columnKey) continue;
          const rect = cell.getBoundingClientRect();
          const leftDist = Math.abs(moveEvent.clientX - rect.left);
          const rightDist = Math.abs(moveEvent.clientX - rect.right);
          if (leftDist < closestDist) {
            closestDist = leftDist;
            closestEdge = { x: rect.left, top: rect.top, height: rect.height, beforeKey: cellKey ?? void 0 };
          }
          if (rightDist < closestDist) {
            closestDist = rightDist;
            closestEdge = { x: rect.right, top: rect.top, height: rect.height, afterKey: cellKey ?? void 0 };
          }
        }
        if (closestEdge && closestDist < 40) {
          indicatorRef.current.style.display = "block";
          indicatorRef.current.style.left = `${closestEdge.x - 1}px`;
          indicatorRef.current.style.top = `${closestEdge.top}px`;
          indicatorRef.current.style.height = `${closestEdge.height}px`;
          dragRef.current.dropEdge = closestEdge;
        } else {
          indicatorRef.current.style.display = "none";
          if (dragRef.current) dragRef.current.dropEdge = null;
        }
      }
    };
    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      if (isDragging && dragRef.current) {
        const { columnKey: dragKey, dropEdge, sourceEl } = dragRef.current;
        sourceEl.classList.remove("w3f-table-th-dragging");
        document.body.classList.remove("w3f-table-dragging-body");
        if (ghostRef.current) {
          ghostRef.current.remove();
          ghostRef.current = null;
        }
        if (indicatorRef.current) {
          indicatorRef.current.remove();
          indicatorRef.current = null;
        }
        if (dropEdge) {
          setColumnOrder((prev) => {
            const newOrder = prev.filter((k) => k !== dragKey);
            const targetKey = dropEdge.beforeKey || dropEdge.afterKey;
            if (!targetKey) return prev;
            let insertIdx = newOrder.indexOf(targetKey);
            if (insertIdx === -1) return prev;
            if (dropEdge.afterKey) insertIdx += 1;
            newOrder.splice(insertIdx, 0, dragKey);
            return newOrder;
          });
        }
        dragRef.current = null;
      }
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }, []);
  return { columnOrder, orderedColumns, handleDragMouseDown };
};
export {
  useColumnReorder,
  useColumnResize,
  useTableFilter,
  useTablePagination,
  useTableSort
};
//# sourceMappingURL=Table.hooks.js.map
