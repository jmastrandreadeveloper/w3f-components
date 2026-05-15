import { useState, useCallback, useMemo } from "react";
import { filterItems } from "./TransferList.utils";
const useTransferList = (initialSource, initialTarget, notify, disabled) => {
  const [sourceList, setSourceList] = useState(initialSource);
  const [targetList, setTargetList] = useState(initialTarget);
  const [sourceSelected, setSourceSelected] = useState(/* @__PURE__ */ new Set());
  const [targetSelected, setTargetSelected] = useState(/* @__PURE__ */ new Set());
  const [sourceFilter, setSourceFilter] = useState("");
  const [targetFilter, setTargetFilter] = useState("");
  const filteredSource = useMemo(
    () => filterItems(sourceList, sourceFilter),
    [sourceList, sourceFilter]
  );
  const filteredTarget = useMemo(
    () => filterItems(targetList, targetFilter),
    [targetList, targetFilter]
  );
  const handleItemClick = useCallback(
    (e, id, side) => {
      if (disabled) return;
      const setSelected = side === "source" ? setSourceSelected : setTargetSelected;
      if (e.ctrlKey || e.metaKey) {
        setSelected((prev) => {
          const next = new Set(prev);
          next.has(id) ? next.delete(id) : next.add(id);
          return next;
        });
      } else {
        setSelected((prev) => {
          if (prev.has(id) && prev.size === 1) return /* @__PURE__ */ new Set();
          return /* @__PURE__ */ new Set([id]);
        });
      }
    },
    [disabled]
  );
  const handleCheckboxChange = useCallback(
    (id, side) => {
      if (disabled) return;
      const setSelected = side === "source" ? setSourceSelected : setTargetSelected;
      setSelected((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      });
    },
    [disabled]
  );
  const handleSelectAll = useCallback(
    (side) => {
      if (disabled) return;
      const filtered = side === "source" ? filteredSource : filteredTarget;
      const selected = side === "source" ? sourceSelected : targetSelected;
      const setSelected = side === "source" ? setSourceSelected : setTargetSelected;
      const selectableIds = filtered.filter((i) => !i.disabled).map((i) => i.id);
      const allSelected = selectableIds.length > 0 && selectableIds.every((id) => selected.has(id));
      if (allSelected) {
        setSelected((prev) => {
          const next = new Set(prev);
          selectableIds.forEach((id) => next.delete(id));
          return next;
        });
      } else {
        setSelected((prev) => {
          const next = new Set(prev);
          selectableIds.forEach((id) => next.add(id));
          return next;
        });
      }
    },
    [disabled, filteredSource, filteredTarget, sourceSelected, targetSelected]
  );
  const moveSelectedToTarget = useCallback(() => {
    if (sourceSelected.size === 0) return;
    const toMove = sourceList.filter((i) => sourceSelected.has(i.id) && !i.disabled);
    if (toMove.length === 0) return;
    const moveIds = new Set(toMove.map((i) => i.id));
    const newSource = sourceList.filter((i) => !moveIds.has(i.id));
    const newTarget = [...targetList, ...toMove];
    setSourceList(newSource);
    setTargetList(newTarget);
    setSourceSelected(/* @__PURE__ */ new Set());
    notify(newSource, newTarget);
  }, [sourceList, targetList, sourceSelected, notify]);
  const moveSelectedToSource = useCallback(() => {
    if (targetSelected.size === 0) return;
    const toMove = targetList.filter((i) => targetSelected.has(i.id) && !i.disabled);
    if (toMove.length === 0) return;
    const moveIds = new Set(toMove.map((i) => i.id));
    const newTarget = targetList.filter((i) => !moveIds.has(i.id));
    const newSource = [...sourceList, ...toMove];
    setSourceList(newSource);
    setTargetList(newTarget);
    setTargetSelected(/* @__PURE__ */ new Set());
    notify(newSource, newTarget);
  }, [sourceList, targetList, targetSelected, notify]);
  const moveAllToTarget = useCallback(() => {
    const movable = sourceList.filter((i) => !i.disabled);
    if (movable.length === 0) return;
    const locked = sourceList.filter((i) => i.disabled);
    const newTarget = [...targetList, ...movable];
    setSourceList(locked);
    setTargetList(newTarget);
    setSourceSelected(/* @__PURE__ */ new Set());
    notify(locked, newTarget);
  }, [sourceList, targetList, notify]);
  const moveAllToSource = useCallback(() => {
    const movable = targetList.filter((i) => !i.disabled);
    if (movable.length === 0) return;
    const locked = targetList.filter((i) => i.disabled);
    const newSource = [...sourceList, ...movable];
    setSourceList(newSource);
    setTargetList(locked);
    setTargetSelected(/* @__PURE__ */ new Set());
    notify(newSource, locked);
  }, [sourceList, targetList, notify]);
  return {
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
  };
};
export {
  useTransferList
};
//# sourceMappingURL=TransferList.hooks.js.map
