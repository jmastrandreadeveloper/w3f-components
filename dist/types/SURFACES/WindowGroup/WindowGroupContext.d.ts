export interface WindowGroupContextValue {
    openPanels: Record<string, boolean>;
    openPanel: (panel: string) => void;
    closePanel: (panel: string) => void;
    /** Called by PanelWindow on mount/unmount to register its DOM element for connector lines. */
    registerPanelRef: (panel: string, el: HTMLElement | null) => void;
}
export declare const WindowGroupContext: import("react").Context<WindowGroupContextValue>;
export declare function useWindowGroupContext(): WindowGroupContextValue;
//# sourceMappingURL=WindowGroupContext.d.ts.map