import type { TransferItem, SelectAllState } from './TransferList.types';

export function filterItems(items: TransferItem[], query: string): TransferItem[] {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
        (i) =>
            i.label.toLowerCase().includes(q) ||
            (i.description && i.description.toLowerCase().includes(q)),
    );
}

export function getSelectAllState(
    filtered: TransferItem[],
    selected: Set<string | number>,
): SelectAllState {
    const selectable = filtered.filter((i) => !i.disabled);
    if (selectable.length === 0) return { checked: false, indeterminate: false };
    const selectedCount = selectable.filter((i) => selected.has(i.id)).length;
    if (selectedCount === 0) return { checked: false, indeterminate: false };
    if (selectedCount === selectable.length) return { checked: true, indeterminate: false };
    return { checked: false, indeterminate: true };
}

export function buildItemClasses(isSelected: boolean, isDisabled: boolean): string {
    return [
        'w3f-transfer-item',
        isSelected && 'w3f-transfer-item-selected',
        isDisabled && 'w3f-transfer-item-disabled',
    ]
        .filter(Boolean)
        .join(' ');
}
