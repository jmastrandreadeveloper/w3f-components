import React, { forwardRef, useMemo } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    MoreHorizontal,
} from 'lucide-react';
import type { PaginationProps } from './Pagination.types';
import { PAGINATION_DEFAULTS, PAGINATION_CLASSES, PAGINATION_ICON_SIZES } from './Pagination.constants';
import { buildPages, buildPaginationClasses, buildPageItemClasses } from './Pagination.utils';
import { usePaginationPage } from './Pagination.hooks';

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
const Pagination = forwardRef<HTMLElement, PaginationProps>(
    (
        {
            count = PAGINATION_DEFAULTS.count,
            page: pageProp,
            defaultPage = PAGINATION_DEFAULTS.defaultPage,
            onChange,
            variant = PAGINATION_DEFAULTS.variant,
            shape = PAGINATION_DEFAULTS.shape,
            size = PAGINATION_DEFAULTS.size,
            color = PAGINATION_DEFAULTS.color,
            disabled = PAGINATION_DEFAULTS.disabled,
            siblingCount = PAGINATION_DEFAULTS.siblingCount,
            boundaryCount = PAGINATION_DEFAULTS.boundaryCount,
            showFirstButton = PAGINATION_DEFAULTS.showFirstButton,
            showLastButton = PAGINATION_DEFAULTS.showLastButton,
            hideNextButton = PAGINATION_DEFAULTS.hideNextButton,
            hidePrevButton = PAGINATION_DEFAULTS.hidePrevButton,
            unstyled = PAGINATION_DEFAULTS.unstyled,
            className = PAGINATION_DEFAULTS.className,
            ...props
        },
        ref,
    ) => {
    const { currentPage, handlePageChange } = usePaginationPage(
        pageProp,
        defaultPage,
        count,
        disabled,
        onChange,
    );

    const pages = useMemo(
        () => buildPages(count, currentPage, siblingCount, boundaryCount),
        [count, currentPage, siblingCount, boundaryCount],
    );

    const containerCls = useMemo(
        () => buildPaginationClasses(variant, shape, size, color, disabled, className, unstyled),
        [variant, shape, size, color, disabled, className, unstyled],
    );

    const iconSize = PAGINATION_ICON_SIZES[size];

    return (
        <nav ref={ref} className={containerCls} aria-label="paginacion" {...props}>
            <ul className={PAGINATION_CLASSES.list}>
                {/* Primera página */}
                {showFirstButton && (
                    <li>
                        <button
                            className={`${PAGINATION_CLASSES.item} ${PAGINATION_CLASSES.nav_btn}`}
                            onClick={(e) => handlePageChange(e, 1)}
                            disabled={disabled || currentPage === 1}
                            aria-label="Primera pagina"
                        >
                            <ChevronsLeft size={iconSize} />
                        </button>
                    </li>
                )}

                {/* Anterior */}
                {!hidePrevButton && (
                    <li>
                        <button
                            className={`${PAGINATION_CLASSES.item} ${PAGINATION_CLASSES.nav_btn}`}
                            onClick={(e) => handlePageChange(e, currentPage - 1)}
                            disabled={disabled || currentPage === 1}
                            aria-label="Pagina anterior"
                        >
                            <ChevronLeft size={iconSize} />
                        </button>
                    </li>
                )}

                {/* Páginas */}
                {pages.map((item, idx) => {
                    if (typeof item === 'string') {
                        return (
                            <li key={item}>
                                <span
                                    className={`${PAGINATION_CLASSES.item} ${PAGINATION_CLASSES.ellipsis}`}
                                >
                                    <MoreHorizontal size={iconSize - 2} />
                                </span>
                            </li>
                        );
                    }

                    const isActive = item === currentPage;
                    return (
                        <li key={item}>
                            <button
                                className={buildPageItemClasses(isActive)}
                                onClick={(e) => handlePageChange(e, item)}
                                disabled={disabled}
                                aria-current={isActive ? 'page' : undefined}
                                aria-label={`Pagina ${item}`}
                            >
                                {item}
                            </button>
                        </li>
                    );
                })}

                {/* Siguiente */}
                {!hideNextButton && (
                    <li>
                        <button
                            className={`${PAGINATION_CLASSES.item} ${PAGINATION_CLASSES.nav_btn}`}
                            onClick={(e) => handlePageChange(e, currentPage + 1)}
                            disabled={disabled || currentPage === count}
                            aria-label="Pagina siguiente"
                        >
                            <ChevronRight size={iconSize} />
                        </button>
                    </li>
                )}

                {/* Última página */}
                {showLastButton && (
                    <li>
                        <button
                            className={`${PAGINATION_CLASSES.item} ${PAGINATION_CLASSES.nav_btn}`}
                            onClick={(e) => handlePageChange(e, count)}
                            disabled={disabled || currentPage === count}
                            aria-label="Ultima pagina"
                        >
                            <ChevronsRight size={iconSize} />
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
    },
);

Pagination.displayName = 'Pagination';

export default Pagination;
export { Pagination };
