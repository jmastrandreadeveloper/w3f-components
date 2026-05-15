import React from 'react';
import type { PaginationProps } from './Pagination.types';
/**
 * Pagination Component - W3F Framework
 *
 * Componente de paginación con soporte para variantes, formas, tamaños y colores.
 * Soporta modo controlado y no controlado.
 *
 * @example
 * <Pagination count={10} defaultPage={1} onChange={(e, page) => setPage(page)} />
 *
 * @example
 * // Controlado
 * <Pagination count={20} page={currentPage} onChange={(e, p) => setCurrentPage(p)} variant="outlined" />
 */
declare const Pagination: React.ForwardRefExoticComponent<PaginationProps & React.RefAttributes<HTMLElement>>;
export default Pagination;
export { Pagination };
//# sourceMappingURL=Pagination.d.ts.map