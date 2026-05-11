import { useState, useCallback } from 'react';
import type React from 'react';

/**
 * Hook que gestiona el estado de la página actual (controlado/no controlado).
 */
export function usePaginationPage(
    pageProp: number | undefined,
    defaultPage: number,
    count: number,
    disabled: boolean,
    onChange: ((e: React.MouseEvent<HTMLButtonElement>, page: number) => void) | undefined,
) {
    const [internalPage, setInternalPage] = useState(defaultPage);
    const isControlled = pageProp !== undefined;
    const currentPage = isControlled ? pageProp! : internalPage;

    const handlePageChange = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>, newPage: number) => {
            if (disabled || newPage < 1 || newPage > count || newPage === currentPage) return;
            if (!isControlled) setInternalPage(newPage);
            if (onChange) onChange(e, newPage);
        },
        [disabled, count, currentPage, isControlled, onChange],
    );

    return { currentPage, handlePageChange };
}
