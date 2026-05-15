/**
 * Hook que gestiona el estado expandido del Accordion.
 * Soporta modo único (un panel a la vez) y múltiple.
 */
export declare function useAccordionState(multiple: boolean): {
    expanded: string | string[] | null;
    togglePanel: (id: string) => void;
    closePanel: (id: string) => void;
    isExpanded: (id: string) => boolean;
};
//# sourceMappingURL=Accordion.hooks.d.ts.map