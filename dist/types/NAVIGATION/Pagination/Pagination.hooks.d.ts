import type React from 'react';
/**
 * Hook que gestiona el estado de la página actual (controlado/no controlado).
 */
export declare function usePaginationPage(pageProp: number | undefined, defaultPage: number, count: number, disabled: boolean, onChange: ((e: React.MouseEvent<HTMLButtonElement>, page: number) => void) | undefined): {
    currentPage: number;
    handlePageChange: (e: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
};
//# sourceMappingURL=Pagination.hooks.d.ts.map