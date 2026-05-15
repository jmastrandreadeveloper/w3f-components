export interface TransferItem {
    id: string | number;
    label: string;
    description?: string;
    disabled?: boolean;
}
export interface TransferListProps {
    sourceItems?: TransferItem[];
    targetItems?: TransferItem[];
    onChange?: (source: TransferItem[], target: TransferItem[]) => void;
    sourceTitle?: string;
    targetTitle?: string;
    enableSearch?: boolean;
    height?: string | number;
    disabled?: boolean;
    className?: string;
    /** When true, strips visual styles — compose appearance via trait classes. */
    unstyled?: boolean;
    /** Bridge binding ID — connects this component to business logic via the Bridge. */
    bindId?: string;
}
export interface SelectAllState {
    checked: boolean;
    indeterminate: boolean;
}
//# sourceMappingURL=TransferList.types.d.ts.map