function filterItems(items, query) {
  if (!query.trim()) return items;
  const q = query.toLowerCase();
  return items.filter(
    (i) => i.label.toLowerCase().includes(q) || i.description && i.description.toLowerCase().includes(q)
  );
}
function getSelectAllState(filtered, selected) {
  const selectable = filtered.filter((i) => !i.disabled);
  if (selectable.length === 0) return { checked: false, indeterminate: false };
  const selectedCount = selectable.filter((i) => selected.has(i.id)).length;
  if (selectedCount === 0) return { checked: false, indeterminate: false };
  if (selectedCount === selectable.length) return { checked: true, indeterminate: false };
  return { checked: false, indeterminate: true };
}
function buildItemClasses(isSelected, isDisabled) {
  return [
    "w3f-transfer-item",
    isSelected && "w3f-transfer-item-selected",
    isDisabled && "w3f-transfer-item-disabled"
  ].filter(Boolean).join(" ");
}
export {
  buildItemClasses,
  filterItems,
  getSelectAllState
};
//# sourceMappingURL=TransferList.utils.js.map
