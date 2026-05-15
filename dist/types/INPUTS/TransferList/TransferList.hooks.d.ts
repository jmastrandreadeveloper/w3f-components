import type { TransferItem } from './TransferList.types';
export declare const useTransferList: (initialSource: TransferItem[], initialTarget: TransferItem[], notify: (src: TransferItem[], tgt: TransferItem[]) => void, disabled: boolean) => {
    sourceList: TransferItem[];
    setSourceList: import("react").Dispatch<import("react").SetStateAction<TransferItem[]>>;
    targetList: TransferItem[];
    setTargetList: import("react").Dispatch<import("react").SetStateAction<TransferItem[]>>;
    sourceSelected: Set<string | number>;
    setSourceSelected: import("react").Dispatch<import("react").SetStateAction<Set<string | number>>>;
    targetSelected: Set<string | number>;
    setTargetSelected: import("react").Dispatch<import("react").SetStateAction<Set<string | number>>>;
    sourceFilter: string;
    setSourceFilter: import("react").Dispatch<import("react").SetStateAction<string>>;
    targetFilter: string;
    setTargetFilter: import("react").Dispatch<import("react").SetStateAction<string>>;
    filteredSource: TransferItem[];
    filteredTarget: TransferItem[];
    handleItemClick: (e: React.MouseEvent, id: string | number, side: "source" | "target") => void;
    handleCheckboxChange: (id: string | number, side: "source" | "target") => void;
    handleSelectAll: (side: "source" | "target") => void;
    moveSelectedToTarget: () => void;
    moveSelectedToSource: () => void;
    moveAllToTarget: () => void;
    moveAllToSource: () => void;
};
//# sourceMappingURL=TransferList.hooks.d.ts.map