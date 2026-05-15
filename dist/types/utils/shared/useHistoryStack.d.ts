export declare function useHistoryStack<T>(initial: T, options?: {
    maxEntries?: number;
    debounceMs?: number;
}): {
    state: T;
    push: (newState: T, immediate?: boolean) => void;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    historyIndex: number;
    historyLength: number;
};
//# sourceMappingURL=useHistoryStack.d.ts.map