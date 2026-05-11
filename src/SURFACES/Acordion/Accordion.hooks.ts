import { useState, useCallback } from 'react';

/**
 * Hook que gestiona el estado expandido del Accordion.
 * Soporta modo único (un panel a la vez) y múltiple.
 */
export function useAccordionState(multiple: boolean) {
    const [expanded, setExpanded] = useState<string | string[] | null>(
        multiple ? [] : null,
    );

    const togglePanel = useCallback(
        (id: string) => {
            if (multiple) {
                setExpanded((prev) => {
                    const arr = prev as string[];
                    return arr.includes(id)
                        ? arr.filter((panelId) => panelId !== id)
                        : [...arr, id];
                });
            } else {
                setExpanded((prev) => (prev === id ? null : id));
            }
        },
        [multiple],
    );

    const closePanel = useCallback(
        (id: string) => {
            if (multiple) {
                setExpanded((prev) => (prev as string[]).filter((panelId) => panelId !== id));
            } else {
                setExpanded(null);
            }
        },
        [multiple],
    );

    const isExpanded = (id: string): boolean => {
        if (multiple) return (expanded as string[]).includes(id);
        return expanded === id;
    };

    return { expanded, togglePanel, closePanel, isExpanded };
}
