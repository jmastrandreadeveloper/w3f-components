import type { ChipData } from './Chip.types';
export declare function useChipManager(): {
    chips: ChipData[];
    inputValue: string;
    setInputValue: import("react").Dispatch<import("react").SetStateAction<string>>;
    addChip: (value: string) => boolean;
    removeChip: (idToRemove: number) => number;
};
export declare function useChipNavigation(chips: ChipData[], inputValue: string, inputRef: React.RefObject<HTMLInputElement | null>, chipRefs: React.MutableRefObject<(HTMLDivElement | null)[]>, onAddChip: () => void, onRemoveChip: (id: number) => void): {
    focusedChipIndex: number | null;
    setFocusedChipIndex: import("react").Dispatch<import("react").SetStateAction<number | null>>;
    handleContainerKeyDown: (event: React.KeyboardEvent) => void;
};
//# sourceMappingURL=Chip.hooks.d.ts.map