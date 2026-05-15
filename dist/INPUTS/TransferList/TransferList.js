"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { forwardRef, useRef, useCallback, useEffect } from "react";
import { Search, ChevronsRight, ChevronRight, ChevronLeft, ChevronsLeft } from "lucide-react";
import { TRANSFER_CLASSES, DRAG_DEAD_ZONE, TRANSFER_LIST_DEFAULTS } from "./TransferList.constants";
import { getSelectAllState, buildItemClasses } from "./TransferList.utils";
import { useTransferList } from "./TransferList.hooks";
import { useBridgeBind } from "@w3f/bridge";
const TransferList = forwardRef(({
  sourceItems = [],
  targetItems = [],
  onChange,
  sourceTitle = TRANSFER_LIST_DEFAULTS.sourceTitle,
  targetTitle = TRANSFER_LIST_DEFAULTS.targetTitle,
  enableSearch = TRANSFER_LIST_DEFAULTS.enableSearch,
  height = TRANSFER_LIST_DEFAULTS.height,
  disabled = TRANSFER_LIST_DEFAULTS.disabled,
  className = TRANSFER_LIST_DEFAULTS.className,
  unstyled = TRANSFER_LIST_DEFAULTS.unstyled,
  bindId
}, ref) => {
  const dragRef = useRef(null);
  const ghostRef = useRef(null);
  const dropIndicatorRef = useRef(null);
  const sourcePanelRef = useRef(null);
  const targetPanelRef = useRef(null);
  const { dispatch } = useBridgeBind({ bindId });
  const notify = useCallback(
    (src, tgt) => {
      dispatch("change", { value: tgt.map((i) => i.label) });
      if (onChange) onChange(src, tgt);
    },
    [onChange, dispatch]
  );
  const {
    sourceList,
    setSourceList,
    targetList,
    setTargetList,
    sourceSelected,
    setSourceSelected,
    targetSelected,
    setTargetSelected,
    sourceFilter,
    setSourceFilter,
    targetFilter,
    setTargetFilter,
    filteredSource,
    filteredTarget,
    handleItemClick,
    handleCheckboxChange,
    handleSelectAll,
    moveSelectedToTarget,
    moveSelectedToSource,
    moveAllToTarget,
    moveAllToSource
  } = useTransferList(sourceItems, targetItems, notify, disabled);
  useEffect(() => {
    setSourceList(sourceItems);
  }, [sourceItems]);
  useEffect(() => {
    setTargetList(targetItems);
  }, [targetItems]);
  const handleDragMouseDown = useCallback(
    (e, item, side) => {
      if (disabled || item.disabled) return;
      if (e.button !== 0) return;
      const startX = e.clientX;
      const startY = e.clientY;
      let isDragging = false;
      const selected = side === "source" ? sourceSelected : targetSelected;
      const dragIds = selected.has(item.id) ? new Set(selected) : /* @__PURE__ */ new Set([item.id]);
      const listFrom = side === "source" ? sourceList : targetList;
      const dragItems = listFrom.filter((i) => dragIds.has(i.id));
      const onMouseMove = (moveEvent) => {
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;
        if (!isDragging && Math.sqrt(dx * dx + dy * dy) < DRAG_DEAD_ZONE) return;
        if (!isDragging) {
          isDragging = true;
          dragRef.current = { item, side, dragItems, dragIds, dropTarget: null, dropIndex: -1 };
          document.body.classList.add(TRANSFER_CLASSES.draggingBody);
          dragIds.forEach((id) => {
            const el = document.querySelector(`[data-transfer-id="${id}"]`);
            if (el) el.classList.add(TRANSFER_CLASSES.itemDragging);
          });
          const ghost = document.createElement("div");
          ghost.className = TRANSFER_CLASSES.dragGhost;
          ghost.textContent = dragItems.length > 1 ? `${dragItems[0].label} (+${dragItems.length - 1})` : item.label;
          document.body.appendChild(ghost);
          ghostRef.current = ghost;
          const indicator = document.createElement("div");
          indicator.className = TRANSFER_CLASSES.dropIndicator;
          indicator.style.display = "none";
          document.body.appendChild(indicator);
          dropIndicatorRef.current = indicator;
        }
        if (ghostRef.current) {
          ghostRef.current.style.left = `${moveEvent.clientX + 14}px`;
          ghostRef.current.style.top = `${moveEvent.clientY - 12}px`;
        }
        const srcRect = sourcePanelRef.current?.getBoundingClientRect();
        const tgtRect = targetPanelRef.current?.getBoundingClientRect();
        let overPanel = null;
        if (srcRect && moveEvent.clientX >= srcRect.left && moveEvent.clientX <= srcRect.right && moveEvent.clientY >= srcRect.top && moveEvent.clientY <= srcRect.bottom) {
          overPanel = "source";
        } else if (tgtRect && moveEvent.clientX >= tgtRect.left && moveEvent.clientX <= tgtRect.right && moveEvent.clientY >= tgtRect.top && moveEvent.clientY <= tgtRect.bottom) {
          overPanel = "target";
        }
        sourcePanelRef.current?.classList.toggle(TRANSFER_CLASSES.panelDropTarget, overPanel === "source");
        targetPanelRef.current?.classList.toggle(TRANSFER_CLASSES.panelDropTarget, overPanel === "target");
        if (dragRef.current) {
          dragRef.current.dropTarget = overPanel;
          dragRef.current.dropIndex = -1;
        }
        if (overPanel && dropIndicatorRef.current) {
          const panelRef = overPanel === "source" ? sourcePanelRef : targetPanelRef;
          const listEl = panelRef.current?.querySelector(".w3f-transfer-list");
          if (listEl) {
            const items = Array.from(listEl.querySelectorAll(".w3f-transfer-item"));
            let closestEdge = null;
            let closestDist = Infinity;
            for (let idx = 0; idx <= items.length; idx++) {
              let edgeY;
              if (idx < items.length) {
                edgeY = items[idx].getBoundingClientRect().top;
              } else if (items.length > 0) {
                edgeY = items[items.length - 1].getBoundingClientRect().bottom;
              } else {
                edgeY = listEl.getBoundingClientRect().top + 4;
              }
              const dist = Math.abs(moveEvent.clientY - edgeY);
              if (dist < closestDist) {
                closestDist = dist;
                closestEdge = { y: edgeY, index: idx };
              }
            }
            if (closestEdge && closestDist < 50) {
              const listRect = listEl.getBoundingClientRect();
              dropIndicatorRef.current.style.display = "block";
              dropIndicatorRef.current.style.left = `${listRect.left + 8}px`;
              dropIndicatorRef.current.style.top = `${closestEdge.y - 1}px`;
              dropIndicatorRef.current.style.width = `${listRect.width - 16}px`;
              if (dragRef.current) dragRef.current.dropIndex = closestEdge.index;
            } else {
              dropIndicatorRef.current.style.display = "none";
            }
          }
        } else if (dropIndicatorRef.current) {
          dropIndicatorRef.current.style.display = "none";
        }
      };
      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        if (isDragging && dragRef.current) {
          const { side: fromSide, dragItems: movedItems, dragIds: movedIds, dropTarget, dropIndex } = dragRef.current;
          document.body.classList.remove(TRANSFER_CLASSES.draggingBody);
          movedIds.forEach((id) => {
            const el = document.querySelector(`[data-transfer-id="${id}"]`);
            if (el) el.classList.remove(TRANSFER_CLASSES.itemDragging);
          });
          sourcePanelRef.current?.classList.remove(TRANSFER_CLASSES.panelDropTarget);
          targetPanelRef.current?.classList.remove(TRANSFER_CLASSES.panelDropTarget);
          if (ghostRef.current) {
            ghostRef.current.remove();
            ghostRef.current = null;
          }
          if (dropIndicatorRef.current) {
            dropIndicatorRef.current.remove();
            dropIndicatorRef.current = null;
          }
          if (dropTarget && dropIndex >= 0) {
            if (fromSide === dropTarget) {
              const setList = fromSide === "source" ? setSourceList : setTargetList;
              setList((prev) => {
                const remaining = prev.filter((i) => !movedIds.has(i.id));
                const insertIdx = Math.min(dropIndex, remaining.length);
                remaining.splice(insertIdx, 0, ...movedItems);
                return [...remaining];
              });
            } else {
              const fromList = fromSide === "source" ? sourceList : targetList;
              const toList = dropTarget === "source" ? sourceList : targetList;
              const newFrom = fromList.filter((i) => !movedIds.has(i.id));
              const newTo = [...toList];
              const insertIdx = Math.min(dropIndex, newTo.length);
              newTo.splice(insertIdx, 0, ...movedItems);
              if (fromSide === "source") {
                setSourceList(newFrom);
                setTargetList(newTo);
                setSourceSelected((prev) => {
                  const next = new Set(prev);
                  movedIds.forEach((id) => next.delete(id));
                  return next;
                });
                notify(newFrom, newTo);
              } else {
                setTargetList(newFrom);
                setSourceList(newTo);
                setTargetSelected((prev) => {
                  const next = new Set(prev);
                  movedIds.forEach((id) => next.delete(id));
                  return next;
                });
                notify(newTo, newFrom);
              }
            }
          }
          dragRef.current = null;
        }
      };
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    },
    [disabled, sourceList, targetList, sourceSelected, targetSelected, notify]
  );
  const renderPanel = (side) => {
    const title = side === "source" ? sourceTitle : targetTitle;
    const list = side === "source" ? sourceList : targetList;
    const filtered = side === "source" ? filteredSource : filteredTarget;
    const selected = side === "source" ? sourceSelected : targetSelected;
    const filter = side === "source" ? sourceFilter : targetFilter;
    const setFilter = side === "source" ? setSourceFilter : setTargetFilter;
    const panelRef = side === "source" ? sourcePanelRef : targetPanelRef;
    const selectAllState = getSelectAllState(filtered, selected);
    const heightVal = typeof height === "number" ? `${height}px` : height;
    const heightStyle = heightVal !== "360px" ? { "--w3f-tl-height": heightVal } : void 0;
    return /* @__PURE__ */ jsxs("div", { className: TRANSFER_CLASSES.panel, ref: panelRef, style: heightStyle, children: [
      /* @__PURE__ */ jsxs("div", { className: TRANSFER_CLASSES.panelHeader, children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            checked: selectAllState.checked,
            ref: (el) => {
              if (el) el.indeterminate = selectAllState.indeterminate;
            },
            onChange: () => handleSelectAll(side)
          }
        ),
        /* @__PURE__ */ jsx("span", { className: TRANSFER_CLASSES.panelTitle, children: title }),
        /* @__PURE__ */ jsxs("span", { className: TRANSFER_CLASSES.panelCount, children: [
          selected.size > 0 ? `${selected.size}/` : "",
          list.length
        ] })
      ] }),
      enableSearch && /* @__PURE__ */ jsxs("div", { className: TRANSFER_CLASSES.search, children: [
        /* @__PURE__ */ jsx("span", { className: TRANSFER_CLASSES.searchIcon, children: /* @__PURE__ */ jsx(Search, { size: 14 }) }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            className: TRANSFER_CLASSES.searchInput,
            placeholder: "Buscar...",
            value: filter,
            onChange: (e) => setFilter(e.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: TRANSFER_CLASSES.list, children: filtered.length === 0 ? /* @__PURE__ */ jsx("div", { className: TRANSFER_CLASSES.empty, children: "Sin elementos" }) : filtered.map((item) => {
        const isSelected = selected.has(item.id);
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: buildItemClasses(isSelected, Boolean(item.disabled)),
            "data-transfer-id": item.id,
            onClick: (e) => !item.disabled && handleItemClick(e, item.id, side),
            onMouseDown: (e) => handleDragMouseDown(e, item, side),
            children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: isSelected,
                  onChange: (e) => {
                    e.stopPropagation();
                    handleCheckboxChange(item.id, side);
                  },
                  onClick: (e) => e.stopPropagation(),
                  disabled: item.disabled
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: TRANSFER_CLASSES.itemContent, children: [
                /* @__PURE__ */ jsx("div", { className: TRANSFER_CLASSES.itemLabel, children: item.label }),
                item.description && /* @__PURE__ */ jsx("div", { className: TRANSFER_CLASSES.itemDescription, children: item.description })
              ] })
            ]
          },
          item.id
        );
      }) })
    ] });
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: [TRANSFER_CLASSES.root, unstyled && "w3f-transfer-list--unstyled", !unstyled && disabled && TRANSFER_CLASSES.disabled, className].filter(Boolean).join(" "),
      children: [
        renderPanel("source"),
        /* @__PURE__ */ jsxs("div", { className: TRANSFER_CLASSES.actions, children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              className: TRANSFER_CLASSES.btn,
              onClick: moveAllToTarget,
              disabled: disabled || sourceList.filter((i) => !i.disabled).length === 0,
              title: "Mover todos a la derecha",
              children: /* @__PURE__ */ jsx(ChevronsRight, { size: 18 })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: TRANSFER_CLASSES.btn,
              onClick: moveSelectedToTarget,
              disabled: disabled || sourceSelected.size === 0,
              title: "Mover seleccionados a la derecha",
              children: /* @__PURE__ */ jsx(ChevronRight, { size: 18 })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: TRANSFER_CLASSES.btn,
              onClick: moveSelectedToSource,
              disabled: disabled || targetSelected.size === 0,
              title: "Mover seleccionados a la izquierda",
              children: /* @__PURE__ */ jsx(ChevronLeft, { size: 18 })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: TRANSFER_CLASSES.btn,
              onClick: moveAllToSource,
              disabled: disabled || targetList.filter((i) => !i.disabled).length === 0,
              title: "Mover todos a la izquierda",
              children: /* @__PURE__ */ jsx(ChevronsLeft, { size: 18 })
            }
          )
        ] }),
        renderPanel("target")
      ]
    }
  );
});
TransferList.displayName = "TransferList";
var TransferList_default = TransferList;
export {
  TransferList,
  TransferList_default as default
};
//# sourceMappingURL=TransferList.js.map
