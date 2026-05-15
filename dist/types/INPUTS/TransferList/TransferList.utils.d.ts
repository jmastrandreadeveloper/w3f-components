import type { TransferItem, SelectAllState } from './TransferList.types';
export declare function filterItems(items: TransferItem[], query: string): TransferItem[];
export declare function getSelectAllState(filtered: TransferItem[], selected: Set<string | number>): SelectAllState;
export declare function buildItemClasses(isSelected: boolean, isDisabled: boolean): string;
//# sourceMappingURL=TransferList.utils.d.ts.map